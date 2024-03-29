#!/usr/bin/env node

// Import LIBS
const { ipv4 } = require(__dirname.match(/src/) ? './generate-ip' : './generate-ip.min'),
      { execSync } = require('child_process'); // for cross-platform copying

// Init UI colors
const nc = '\x1b[0m',    // no color
      br = '\x1b[1;91m', // bright red
      by = '\x1b[1;33m', // bright yellow
      bw = '\x1b[1;97m'; // bright white

// Load settings from ARGS
const argRegex = {
    infoCmds: {
        'help': /^--?h(?:elp)?$/,
        'version': /^--?ve?r?s?i?o?n?$/
    }
};
let matchedArg = false, unrecognizedArg;
for (const argType of Object.keys(argRegex))
    for (const option of Object.keys(argRegex[argType]))
        if (!matchedArg) process.argv.forEach(arg => {
            if (!arg.startsWith('-')) return;
            if (argRegex[argType][option].test(arg)) {
                matchedArg = true; unrecognizedArg = undefined;
            } else unrecognizedArg = arg;
});
if (unrecognizedArg) {
    console.error(`\n${br}ERROR: Arg [${ unrecognizedArg }] not recognized.${nc}`);
    console.info(`\n${by}Valid arguments are below.${nc}`);
    printHelpSections(['infoCmds']);
    process.exit(1);
}

// Show HELP screen if -h or --help passed
if (process.argv.some(arg => argRegex.infoCmds.help.test(arg))) printHelpSections();

// Show VERSION number if -v or --version passed
else if (process.argv.some(arg => argRegex.infoCmds.version.test(arg)))
    console.info('v' + require('./package.json').version);

else { // log/copy RESULT
    const address = ipv4.generate({ verbose: false });
    copyToClipboard(address); console.log(bw + address + nc);
}

// Define functions

function printHelpSections(includeSections = ['cmdFormat', 'formatOptions', 'infoCmds']) {
    const helpSections = {
        'cmdFormat': [
            `\n${by}generate-ip [commands]${nc}`
        ],
        'infoCmds': [
            '\nInfo commands:',
            ' -h, --help                  Display help screen.',
            ' -v, --version               Show version number.'
        ]
    };
    includeSections.forEach(section => { // print valid arg elems
        helpSections[section]?.forEach(line => printHelpMsg(line)); });

    function printHelpMsg(msg) { // wrap msg + indent 2nd+ lines (for --help screen)
        const terminalWidth = process.stdout.columns || 80,
              indentation = 29, lines = [], words = msg.match(/\S+|\s+/g);

        // Split msg into lines of appropriate lengths
        let currentLine = '';
        words.forEach(word => {
            const lineLength = terminalWidth - ( lines.length === 0 ? 0 : indentation );
            if (currentLine.length + word.length > lineLength) { // cap/store it
                lines.push(lines.length === 0 ? currentLine : currentLine.trimStart());
                currentLine = '';
            }
            currentLine += word;
        });
        lines.push(lines.length === 0 ? currentLine : currentLine.trimStart());

        // Print formatted msg
        lines.forEach((line, index) => console.info(
            index === 0 ? line // print 1st line unindented
                : ' '.repeat(indentation) + line // print subsequent lines indented
        ));
    }
}

function copyToClipboard(data) {
    data = data.replace(/\s+$/, '').replace(/"/g, '""');
    if (process.platform === 'darwin') // macOS
        execSync(`printf "${ data }" | pbcopy`);
    else if (process.platform === 'linux')
        execSync(`printf "${ data }" | xclip -selection clipboard`);
    else if (process.platform === 'win32')
        execSync(`Set-Clipboard -Value "${ data }"`, { shell: 'powershell' });
}
