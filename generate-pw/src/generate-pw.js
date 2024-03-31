// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/generate-pw
// Documentation: https://github.com/adamlui/js-utils/tree/main/generate-pw#readme
// Latest minified release: https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js

// IMPORT secure crypto RNG
let randomInt;
try { // to use Node.js module
    randomInt = require('crypto').randomInt;
} catch (err) { // use browser API or JS method
    const webCrypto = window.crypto || window.msCrypto;
    randomInt = (min, max) => {
        const randomVal = webCrypto?.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF || Math.random();
        return Math.floor(randomVal * (max - min)) + min;
    };
}

// Init CHARACTER SETS
const charsets = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{}/\\|;:\'",.<>?'
};

// Define API functions

function generatePassword(options = {}) {

    const exampleCall = 'generatePassword({ verbose: false, numbers: true })';
    const defaultOptions = {
        verbose: true,   // enable logging
        length: 8,       // length of password
        qty: 1,          // number of passwords to generate
        charset: '',     // characters to include
        exclude: '',     // characters to exclude
        numbers: false,  // include numberChars
        symbols: false,  // include symbolChars
        lowercase: true, // include lowercase letters
        uppercase: true, // include uppercase letters
        strict: false    // require at least one char from each enabled set
    };

    // Validate options
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] === 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key]));
    const printValidOptions = () => {
        console.info(`generatePassword() » Valid options: [ ${ strValidOptions } ]`);
        console.info(`generatePassword() » If omitted, default settings are: ${ strDefaultOptions }`);
    };
    if (typeof options !== 'object') { // validate as obj
        console.error('generatePassword() » ERROR: [options] can only be an object of key/values.');
        console.info(`generatePassword() » Example valid call: ${ exampleCall }`);
        printValidOptions(); return;
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(`generatePassword() » ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); return;
        } else if (booleanOptions.includes(key) && typeof options[key] !== 'boolean') {
            return console.error(
                `generatePassword() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10);
            if (isNaN(options[key]) || options[key] < 1) return console.error(
                `generatePassword() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
        }
    }
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    if (options.qty > 1) { // generate/return array of [qty] password strings
        const { qty, ...nonQtyOptions } = options;
        return generatePasswords(qty, nonQtyOptions);

    } else { // generate/return single password
        const fromGeneratePasswords = generatePassword.caller?.name === 'generatePasswords'; // flag to avoid repetitive logs

        // Init password's char set
        if (options.verbose && !fromGeneratePasswords) console.info('generatePassword() » Initializing character set...');
        let pwCharset = options.charset || ( // use passed [charset], or construct from options
            (options.numbers ? charsets.numbers : '')
              + (options.symbols ? charsets.symbols : '')
              + (options.lowercase ? charsets.lower : '') 
              + (options.uppercase ? charsets.upper : '')
        );
        if (pwCharset === '') // all flags false + no charset passed
            pwCharset = charsets.lower + charsets.upper; // default to upper + lower

        // Exclude passed `exclude` chars
        if (options.exclude) {
            if (options.verbose && !fromGeneratePasswords) console.info('generatePassword() » Removing excluded characters...');
            pwCharset = pwCharset.replace(new RegExp(`[${ options.exclude }]`, 'g'), '');
        }

        // Generate unstrict password
        if (options.verbose && !fromGeneratePasswords) console.info('generatePassword() » Generating password...');
        let password = '';
        for (let i = 0; i < options.length; i++) {
            const randomIndex = randomInt(0, pwCharset.length);
            password += pwCharset.charAt(randomIndex);
        }

        // Enforce strict mode if enabled
        if (options.strict) {
            if (options.verbose && !fromGeneratePasswords) console.info('generatePassword() » Enforcing strict mode...');
            const charTypes = ['number', 'symbol', 'lower', 'upper'],
                  requiredCharTypes = charTypes.filter(charType => options[charType + 's'] || options[charType + 'case']);
            password = strictify(password, requiredCharTypes);
        }

        // Log/return final result
        if (options.verbose && !fromGeneratePasswords) {
            console.info(
                'generatePassword() » Password generated!');       
            if (typeof require !== 'undefined' && !require.main.filename.endsWith('cli.js')) console.info(
                'generatePassword() » Check returned string.');
        }
        return password;
    }
}

function generatePasswords(qty, options = {}) {

    const exampleCall = 'generatePasswords(3, { verbose: false, symbols: true })';
    const defaultOptions = {
        verbose: true,   // enable logging
        length: 8,       // length of password
        charset: '',     // characters to include
        exclude: '',     // characters to exclude
        numbers: false,  // include numberChars
        symbols: false,  // include symbolChars
        lowercase: true, // include lowercase letters
        uppercase: true, // include uppercase letters
        strict: false    // require at least one char from each enabled set
    };

    // Validate qty
    qty = parseInt(qty, 10);
    if (isNaN(qty) || qty < 1) return console.error(
        'generatePasswords() » ERROR: 1st arg <qty> can only be an integer > 0.');

    // Validate options
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] === 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key]));
    const printValidOptions = () => {
        console.info(`generatePasswords() » Valid options: [ ${ strValidOptions } ]`);
        console.info(`generatePasswords() » If omitted, default settings are: ${ strDefaultOptions }`);
    };
    if (typeof options !== 'object') { // validate as obj
        console.error('generatePasswords() » ERROR: 2nd arg [options] can only be an object of key/values.');
        console.info(`generatePasswords() » Example valid call: ${ exampleCall }`);
        printValidOptions(); return;
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(`generatePasswords() » ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); return;
        } else if (booleanOptions.includes(key) && typeof options[key] !== 'boolean') {
            return console.error(
                `generatePassword() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10);
            if (isNaN(options[key]) || options[key] < 1) return console.error(
                `generatePassword() » ERROR: [${ key }] option can only be an integer > 0.`);
        }
    }
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Generate passwords
    if (options.verbose) console.info(`generatePasswords() » Generating password${ qty > 1 ? 's' : '' }...`);
    const passwords = [];
    for (let i = 0; i < qty; i++) passwords.push(generatePassword(options));

    // Log/return final result
    if (options.verbose) console.info(
        `generatePasswords() » Password${ qty > 1 ? 's' : '' } generated!`);
    if (typeof require !== 'undefined' && !require.main.filename.endsWith('cli.js')) console.info(
        'generatePasswords() » Check returned array.');
    return passwords;
}

function strictify(password, requiredCharTypes = ['number', 'symbol', 'lower', 'upper'], options = {}) {

    const exampleCall = 'strictify(\'pa55word\', [\'symbol\', \'upper\'], { verbose: false })',
          defaultOptions = { verbose: true /* enable logging */ };

    // Validate password
    if (typeof password !== 'string') return console.error(
        'strictify() » ERROR: 1st arg <password> must be a string.');

    // Validate requiredCharTypes
    const validCharTypes = ['number', 'symbol', 'lower', 'upper'];
    if (!Array.isArray(requiredCharTypes)) // convert string to array
        requiredCharTypes = [requiredCharTypes];
    for (const charType of requiredCharTypes) {
        if (!validCharTypes.includes(charType)) { 
            console.error(`strictify() » ERROR: 2nd arg \`${ charType }\` is an invalid character type.`);
            console.info(`strictify() » Valid character types: [ ${ validCharTypes.map(type => `'${ type }'`).join(', ') } ]`);
            console.info('strictify() » Pass one as a string or more as an array, or all types will be required.');
            return;
    }}

    // Validate options
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', ');          
    const printValidOptions = () => {
        console.info(`strictify() » Valid options: [ ${ strValidOptions } ]`);
        console.info(`strictify() » If omitted, default settings are: ${ strDefaultOptions }`);
    };
    if (typeof options !== 'object') { // validate as obj
        console.error('strictify() » ERROR: 3rd arg [options] can only be an object of key/values.');
        console.info(`strictify() » Example valid call: ${ exampleCall }`);
        printValidOptions(); return;
    }
    for (const key in options) { // validate keys
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `strictify() » ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); return;
        } else if (typeof options[key] !== 'boolean')
            return console.error(
                `strictify() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
    }    
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Init mod flags
    const hasFlags = {};
    for (const charType of requiredCharTypes)
        hasFlags['has' + charType.charAt(0).toUpperCase() + charType.slice(1)] = false;
    for (let i = 0; i < password.length; i++)
        for (const charType of requiredCharTypes)
            if ((charsets[charType] || charsets[charType + 's']).includes(password.charAt(i)))
                hasFlags['has' + charType.charAt(0).toUpperCase() + charType.slice(1)] = true;

    // Modify password if unstrict
    if (options.verbose) console.info('strictify() » Strictifying password...');
    const maxReplacements = Math.min(password.length, requiredCharTypes.length),
          replacedPositions = [];
    let replacementCnt = 0, strictPW = password;
    for (const charType of requiredCharTypes) {
        if (replacementCnt < maxReplacements) {
            if (!hasFlags['has' + charType.charAt(0).toUpperCase() + charType.slice(1)]) {
                let replacementPos;
                do replacementPos = randomInt(0, password.length); // pick random pos
                while (replacedPositions.includes(replacementPos)); // check if pos already replaced
                replacedPositions.push(replacementPos); // track new replacement pos
                const replacementCharSet = charsets[charType] || charsets[charType + 's'];
                strictPW = strictPW.substring(0, replacementPos) // perform actual replacement
                         + replacementCharSet.charAt(randomInt(0, replacementCharSet.length))
                         + strictPW.substring(replacementPos + 1);
                replacementCnt++;
    }}}

    // Log/return final result
    if (options.verbose) {
        if (replacementCnt > 0) {
            console.info('strictify() » Password is now strict!');
            console.info('strictify() » Check returned string.');
        } else {
            console.info(`strictify() » Password already includes ${ requiredCharTypes.join(' + ') } characters!`);
            console.info('strictify() » No modifications made.');
        }
    }
    return strictPW;
}

function validateStrength(password, options = {}) {

    const exampleCall = 'validateStrength(\'pa55word\', { verbose: false })',
          strengthCriteria = { minLength: 8, minLower: 1, minUpper: 1, minNumber: 1, minSymbol: 1 },
          defaultOptions = { verbose: true /* enable logging */ };

    // Validate password
    if (typeof password !== 'string') return console.error(
        'validateStrength() » ERROR: 1st arg <password> must be a string.');

    // Validate options
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', ');          
    const printValidOptions = () => {
        console.info(`validateStrength() » Valid options: [ ${ strValidOptions } ]`);
        console.info(`validateStrength() » If omitted, default settings are: ${ strDefaultOptions }`);
    };
    if (typeof options !== 'object') { // validate as obj
        console.error('validateStrength() » ERROR: 2nd arg [options] can only be an object of key/values.');
        console.info(`validateStrength() » Example valid call: ${ exampleCall }`);
        printValidOptions(); return;
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `validateStrength() » ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); return;
        } else if (typeof options[key] !== 'boolean')
            return console.error(
                `validateStrength() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
    }
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    if (options.verbose) console.info('validateStrength() » Validating password strength...');

    // Count occurrences of each char type
    const charCnts = { 'lower': 0, 'upper': 0, 'number': 0, 'symbol': 0 };
    for (const char of password)
        for (const charType of Object.keys(charCnts))
            if ((charsets[charType] || charsets[charType + 's']).includes(char))
                charCnts[charType]++;

    // Check criteria + add recommendations
    const recommendations = [];
    if (password.length < strengthCriteria.minLength)
        recommendations.push(`Make it at least ${ strengthCriteria.minLength } characters long.`);
    for (const charType of Object.keys(charCnts))
        if (charCnts[charType] < strengthCriteria['min' + charType.charAt(0).toUpperCase() + charType.slice(1)])
            recommendations.push('Include at least one ' + charType
                + `${ ['upper', 'lower'].includes(charType) ? 'case letter' : '' }.`);

    // Calculate strength score based on counts and criteria
    let strengthScore = 0;
    strengthScore += ( // +20 for satisfying min length
        password.length >= strengthCriteria.minLength) ? 20 : 0;
    for (const charType of Object.keys(charCnts))
        strengthScore += ( // +20 per char type included
            charCnts[charType] >= strengthCriteria['min' + charType.charAt(0).toUpperCase() + charType.slice(1)]) ? 20 : 0;

    // Log/return final result
    if (options.verbose) {
        console.info('validateStrength() » Password strength validated!');
        console.info('validateStrength() » Check returned object for score/recommendations.');
    }
    return { strengthScore, recommendations, isGood: strengthScore >= 80 };
}

// EXPORT API functions
const apiFunctions = { generatePassword, generatePasswords, strictify, validateStrength };
try { module.exports = { ...apiFunctions }; } catch (err) {} // for Node.js
try { window.pw = { ...apiFunctions }; } catch (err) {} // for Greasemonkey
