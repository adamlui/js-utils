#!/usr/bin/env node

// Import crypto.randomInt() for secure RNG
const { randomInt } = require('crypto');

// Define MAIN functions

function generateIPv4() {
    console.info('Generating IPv4 address...');
    const segments = [];
    for (let i = 0; i < 4; i++) segments.push(randomInt(0, 256));
    return segments.join('.');
}

function isValidIPv4(address) {
    console.info(`Validating IPv4 address ${ address }...`);
    const segments = address.split('.');
    if (segments.length !== 4) return false;
    for (const segment of segments) {
        const num = parseInt(segment);
        if (isNaN(num) || num < 0 || num > 255) return false;
    }
    return true;
}

// EXPORT functions if script was required
if (require.main !== module) module.exports = { generateIPv4, isValidIPv4 };

else { // run as CLI utility

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
    let matchedArg = false, unrecognizedArg = undefined;
    for (const argType of Object.keys(argRegex))
        for (const option of Object.keys(argRegex[argType]))
            if (!matchedArg) process.argv.forEach(arg => {
                if (!arg.startsWith('-')) return;
                if (argRegex[argType][option].test(arg)) {
                    matchedArg = true; unrecognizedArg = undefined; return;
                } else unrecognizedArg = arg;
    });
    if (unrecognizedArg) {
        console.error(`\n${br}ERROR: Arg [${unrecognizedArg}] not recognized.${nc}`);
        console.info(`\n${by}Valid arguments are below.${nc}`);
        printHelpScreen(['infoCmds']);
        process.exit(1);
    }

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => /^--?h(?:elp)?$/.test(arg))) printHelpScreen();

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => /^--?ve?r?s?i?o?n?$/.test(arg)))
        console.info('v' + require('./package.json').version);

    else // log RESULT
        console.log(bw + generateIPv4() + nc);

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

    function printHelpScreen(includeSections = ['cmdFormat', 'formatOptions', 'infoCmds']) {
        const sections = {
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
            sections[section]?.forEach(line => printHelpMsg(line)); });
    }
}
