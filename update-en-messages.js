const fs = require('fs');
const path = require('path');
const https = require('https');

// Get the root directory of the project
const rootDir = path.resolve(__dirname, '../..');

// Determine the _locales directory path based on the current script location
const localesDir = findLocalesDirectory(rootDir);

if (localesDir) {
  const enMessagesPath = path.join(localesDir, 'en', 'messages.json');
  const enMessages = require(enMessagesPath);

  const files = fs.readdirSync(localesDir);

  files.forEach(file => {
    const filePath = path.join(localesDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const folder = file;
      const languageCode = getLanguageCode(folder);
      if (languageCode) {
        const messagesPath = path.join(localesDir, folder, 'messages.json');
        const messages = require(messagesPath);

        const enKeys = Object.keys(enMessages);

        const translatedMessages = {};

        enKeys.forEach(async key => {
          if (!messages[key]) {
            const originalMessage = enMessages[key].message;
            let translatedMessage = originalMessage;

            try {
              translatedMessage = await translateMessage(originalMessage, languageCode);
            } catch (error) {
              console.error(`Translation failed for key "${key}" in ${languageCode}: ${error}`);
            }

            translatedMessages[key] = { message: translatedMessage };
          } else {
            translatedMessages[key] = messages[key];
          }
        });

        const formattedMessagesString = formatMessages(translatedMessages);

        fs.writeFileSync(messagesPath, formattedMessagesString);
        console.log(`Updated messages.json in folder: ${folder}`);
      }
    }
  });

  console.log('All messages.json files updated successfully.');
} else {
  console.error('Unable to locate the _locales directory.');
}

function findLocalesDirectory(currentDir) {
  const dirs = fs.readdirSync(currentDir);
  for (const dir of dirs) {
    const dirPath = path.join(currentDir, dir);
    const stats = fs.statSync(dirPath);
    if (stats.isDirectory() && dir === '_locales') {
      return dirPath;
    }
  }

  for (const dir of dirs) {
    const dirPath = path.join(currentDir, dir);
    const stats = fs.statSync(dirPath);
    if (stats.isDirectory()) {
      const result = findLocalesDirectory(dirPath);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

function getLanguageCode(folder) {
  const languageCode = folder.split('_').join('-');
  return languageCode === 'en' ? null : languageCode;
}

async function translateMessage(text, targetLanguage) {
  const data = JSON.stringify({
    q: text,
    source: "en",
    target: targetLanguage,
    format: "text"
  });

  const options = {
    hostname: 'libretranslate.com',
    port: 443,
    path: '/translate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        const translatedText = JSON.parse(responseData)?.translatedText || text;
        resolve(translatedText);
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

function formatMessages(messages) {
  let formattedMessagesString = '{\n';

  Object.keys(messages).forEach((key, index) => {
    const message = messages[key];
    let messageString = JSON.stringify(message);
    
    messageString = messageString.replace(/({|:)/g, '$1 ');
    messageString = messageString.replace(/(})/g, ' $1');

    const formattedLine = `  "${key}": ${messageString}`;

    formattedMessagesString += formattedLine;

    if (index < Object.keys(messages).length - 1) {
      formattedMessagesString += ',';
    }

    formattedMessagesString += '\n';
  });

  formattedMessagesString += '}';

  return formattedMessagesString;
}
