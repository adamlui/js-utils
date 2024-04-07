#!/usr/bin/env node

const docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-pw#-command-line-usage';

// Import LIBS
const { generatePassword } = require(__dirname.match(/src/) ? './generate-pw' : './generate-pw.min'),
      { execSync } = require('child_process'); // for cross-platform copying

// Init UI colors
const nc = '\x1b[0m',    // no color
      br = '\x1b[1;91m', // bright red
      by = '\x1b[1;33m'; // bright yellow

// Load settings from ARGS
const config = {};
const argRegex = {
    paramOptions: {
        'length': /^--?length(?:=.*|$)/,
        'qty': /^--?qu?a?n?ti?t?y(?:=.*|$)/,
        'charset': /^--?chars(?:=.*|$)/,
        'excludeChars': /^--?exclude(?:=.*|$)/
    },
    flags: {
        'includeNums': /^--?(?:n|(?:include-?)?num(?:ber)?s?=?(?:true|1)?)$/,
        'includeSymbols': /^--?(?:s|(?:include-?)?symbols?=?(?:true|1)?)$/,
        'excludeLowerChars': /^--?(?:L|(?:exclude|disable|no)-?lower-?(?:case)?|lower-?(?:case)?=(?:false|0))$/,
        'excludeUpperChars': /^--?(?:U|(?:exclude|disable|no)-?upper-?(?:case)?|upper-?(?:case)?=(?:false|0))$/,
        'strictMode': /^--?s(?:trict)?(?:-?mode)?$/,
        'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/
    },
    infoCmds: {
        'help': /^--?h(?:elp)?$/,
        'version': /^--?ve?r?s?i?o?n?$/
    }
};
process.argv.forEach(arg => {
    if (!arg.startsWith('-')) return;
    const matchedParamOption = Object.keys(argRegex.paramOptions).find(option => argRegex.paramOptions[option].test(arg)),
          matchedFlag = Object.keys(argRegex.flags).find(flag => argRegex.flags[flag].test(arg)),
          matchedInfoCmd = Object.keys(argRegex.infoCmds).find(cmd => argRegex.infoCmds[cmd].test(arg));
    if (matchedFlag) config[matchedFlag] = true;
    else if (matchedParamOption) {
        if (!arg.includes('=')) {
            console.error(`\n${br}ERROR: Arg [--${arg.replace(/-/g, '')}] requires '=' followed by a value.${nc}`);
            printHelpCmdAndDocURL(); process.exit(1);
        }
        const value = arg.split('=')[1];
        config[matchedParamOption] = parseInt(value) || value;
    } else if (!matchedInfoCmd) {
        console.error(`\n${br}ERROR: Arg [${ arg }] not recognized.${nc}`);
        console.info(`\n${by}Valid arguments are below.${nc}`);
        printHelpSections(['paramOptions', 'flags', 'infoCmds']);
        printHelpCmdAndDocURL(); process.exit(1);
}});

// Show HELP screen if -h or --help passed
if (process.argv.some(arg => argRegex.infoCmds.help.test(arg))) printHelpSections();

// Show VERSION number if -v or --version passed
else if (process.argv.some(arg => argRegex.infoCmds.version.test(arg)))
    console.info('v' + require('./package.json').version);

else { // run MAIN routine
    for (const numArgType of ['length', 'qty'])
        if (config[numArgType] && (isNaN(config[numArgType]) || config[numArgType] < 1)) {
            console.error(`\n${br}Error: [${ numArgType }] argument can only be > 0.${nc}`);
            printHelpCmdAndDocURL(); process.exit(1);
        }
    const funcOptions = {
        length: config.length || 8, qty: config.qty || 1,
        charset: config.charset, exclude: config.excludeChars,
        numbers: !!config.includeNums, symbols: !!config.includeSymbols,
        lowercase: !config.excludeLowerChars, uppercase: !config.excludeUpperChars,
        strict: !!config.strictMode, verbose: !config.quietMode
    };
    const pwResult = generatePassword(funcOptions);
    if (!config.quietMode) console.info('\nCopying to clipboard...');
    copyToClipboard(Array.isArray(pwResult) ? pwResult.join('\n') : pwResult);
}

function printHelpSections(includeSections = ['cmdFormat', 'paramOptions', 'flags', 'infoCmds']) {
    const helpSections = {
        'cmdFormat': [
            `\n${by}generate-pw [options|commands]${nc}`
        ],
        'paramOptions': [
            '\nParameter options:',
            ' --length=n                  Generate password(s) of n length.',
            ' --qty=n                     Generate n password(s).',
            ' --charset=chars             Only include chars in password(s).',
            ' --exclude=chars             Exclude chars from password(s).'
        ],
        'flags': [
            '\nBoolean options:',
            ' -n, --include-numbers       Allow numbers in password(s).',
            ' -s, --include-symbols       Allow symbols in password(s).',
            ' -L, --no-lowercase          Disallow lowercase letters in password(s).',
            ' -U, --no-uppercase          Disallow uppercase letters in password(s).',
            ' -s, --strict                Require at least one character from each'
                                       + ' allowed character set in password(s).',
            ' -q, --quiet                 Suppress all logging except errors.'
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

function printHelpCmdAndDocURL() {
    console.info(`\n${by}For more help, type 'generate-pw --help' or visit\n${docURL + nc}`); }

function copyToClipboard(data) {
    data = data.replace(/\s+$/m, '').replace(/"/g, '""');
    if (process.platform === 'darwin') // macOS
        execSync(`printf "${ data }" | pbcopy`);
    else if (process.platform === 'linux')
        execSync(`printf "${ data }" | xclip -selection clipboard`);
    else if (process.platform === 'win32')
        execSync(`Set-Clipboard -Value "${ data }"`, { shell: 'powershell' });
}
