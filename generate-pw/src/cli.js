#!/usr/bin/env node

const pkgName = 'generate-pw',
      copyright = '© 2024 Adam Lui & contributors under the MIT license.',
      cmdFormat = 'generate-pw [options|commands]',
      srcURL = 'https://code.js-utils.com/generate-pw',
      docURL = 'https://docs.js-utils.com/generate-pw/#-command-line-usage';

// Import LIBS
const { generatePassword } = require(__dirname.match(/src/) ? './generate-pw' : './generate-pw.min'),
      fs = require('fs'), path = require('path'),
      { execSync } = require('child_process'); // for --version cmd + cross-platform copying

// Init UI colors
const nc = '\x1b[0m',    // no color
      br = '\x1b[1;91m', // bright red
      by = '\x1b[1;33m', // bright yellow
      bg = '\x1b[1;92m', // bright green
      bw = '\x1b[1;97m'; // bright white

// Load settings from ARGS
const config = {};
const reArgs = {
    paramOptions: {
        'length': /^--?length(?:=.*|$)/,
        'qty': /^--?qu?a?n?ti?t?y(?:=.*|$)/,
        'charset': /^--?charse?t?(?:=.*|$)/,
        'excludeChars': /^--?exclude(?:=.*|$)/
    },
    flags: {
        'includeNums': /^--?(?:n|(?:include-?)?num(?:ber)?s?=?(?:true|1)?)$/,
        'includeSymbols': /^--?(?:y|(?:include-?)?symbols?=?(?:true|1)?)$/,
        'excludeLowerChars': /^--?(?:L|(?:exclude|disable|no)-?lower-?(?:case)?|lower-?(?:case)?=(?:false|0))$/,
        'excludeUpperChars': /^--?(?:U|(?:exclude|disable|no)-?upper-?(?:case)?|upper-?(?:case)?=(?:false|0))$/,
        'excludeSimilarChars':
            /^--?(?:S|(?:exclude|disable|no)-?similar-?(?:char(?:acter)?s?)?|similar-?(?:char(?:acter)?s?)?=(?:false|0))$/,
        'strictMode': /^--?s(?:trict)?(?:-?mode)?$/,
        'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/
    },
    infoCmds: { 'help': /^--?h(?:elp)?$/, 'version': /^--?ve?r?s?i?o?n?$/}
};
process.argv.forEach(arg => {
    if (!arg.startsWith('-')) return;
    const matchedParamOption = Object.keys(reArgs.paramOptions).find(option => reArgs.paramOptions[option].test(arg)),
          matchedFlag = Object.keys(reArgs.flags).find(flag => reArgs.flags[flag].test(arg)),
          matchedInfoCmd = Object.keys(reArgs.infoCmds).find(cmd => reArgs.infoCmds[cmd].test(arg));
    if (matchedFlag) config[matchedFlag] = true;
    else if (matchedParamOption) {
        if (!arg.includes('=')) {
            console.error(`\n${br}ERROR: Arg [--${arg.replace(/-/g, '')}] requires '=' followed by a value.${nc}`);
            printHelpCmdAndDocURL(); process.exit(1);
        }
        const value = arg.split('=')[1];
        config[matchedParamOption] = parseInt(value) || value;
    } else if (!matchedInfoCmd) {
        console.error(`\n${br}ERROR: Arg [${arg}] not recognized.${nc}`);
        console.info(`\n${by}Valid arguments are below.${nc}`);
        printHelpSections(['paramOptions', 'flags', 'infoCmds']);
        process.exit(1);
}});

// Show HELP screen if -h or --help passed
if (process.argv.some(arg => reArgs.infoCmds.help.test(arg))) printHelpSections();

// Show VERSION number if -v or --version passed
else if (process.argv.some(arg => reArgs.infoCmds.version.test(arg))) {
    const globalVer = execSync(`npm view ${pkgName} version`).toString().trim() || 'none';
    let localVer, currentDir = process.cwd();
    while (currentDir != '/') {
        const localManifestPath = path.join(currentDir, 'package.json');
        if (fs.existsSync(localManifestPath)) {
            const localManifest = require(localManifestPath);
            localVer = ( localManifest.dependencies?.[pkgName]
                      || localManifest.devDependencies?.[pkgName]
            )?.match(/(\d+\.\d+\.\d+)/)[0] || 'none';
            break;
        }
        currentDir = path.dirname(currentDir);
    }
    console.info(`\nGlobal version: ${globalVer}`);
    console.info(`Local version: ${localVer}`);

} else { // run MAIN routine
    for (const numArgType of ['length', 'qty'])
        if (config[numArgType] && (isNaN(config[numArgType]) || config[numArgType] < 1)) {
            console.error(`\n${br}Error: [${numArgType}] argument can only be > 0.${nc}`);
            printHelpCmdAndDocURL(); process.exit(1);
        }
    const funcOptions = {
        length: config.length || 8, qty: config.qty || 1,
        charset: config.charset, exclude: config.excludeChars,
        numbers: !!config.includeNums, symbols: !!config.includeSymbols,
        lowercase: !config.excludeLowerChars, uppercase: !config.excludeUpperChars,
        excludeSimilarChars: !!config.excludeSimilarChars,
        strict: !!config.strictMode, verbose: !config.quietMode
    };
    const pwResult = generatePassword(funcOptions);
    printIfNotQuiet('\nCopying to clipboard...');
    copyToClipboard(Array.isArray(pwResult) ? pwResult.join('\n') : pwResult);
}

function printHelpSections(includeSections = ['header', 'usage', 'paramOptions', 'flags', 'infoCmds']) {
    const appPrefix = `\x1b[106m\x1b[30m ${pkgName} ${nc} `; // bright teal bg + black fg
    const helpSections = {
        'header': [`\n├ ${ appPrefix + copyright}`, `${ appPrefix }Source: ${srcURL}`],
        'usage': [`\n${bw}o Usage:${nc}`, ` ${bw}» ${bg + cmdFormat + nc}`],
        'paramOptions': [
            `\n${bw}o Parameter options:${nc}`,
            ' --length=n                  Generate password(s) of n length.',
            ' --qty=n                     Generate n password(s).',
            ' --charset=chars             Only include chars in password(s).',
            ' --exclude=chars             Exclude chars from password(s).'
        ],
        'flags': [
            `\n${bw}o Boolean options:${nc}`,
            ' -n, --include-numbers       Allow numbers in password(s).',
            ' -y, --include-symbols       Allow symbols in password(s).',
            ' -L, --no-lowercase          Disallow lowercase letters in password(s).',
            ' -U, --no-uppercase          Disallow uppercase letters in password(s).',
            ' -S, --no-similar            Exclude similar characters in password(s).',
            ' -s, --strict                Require at least one character from each'
                                        + ' allowed character set in password(s).',
            ' -q, --quiet                 Suppress all logging except errors.'
        ],
        'infoCmds': [
            `\n${bw}o Info commands:${nc}`,
            ' -h, --help                  Display help screen.',
            ' -v, --version               Show version number.'
        ]
    };
    includeSections.forEach(section => { // print valid arg elems
        helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)); });
    console.info('\nFor more help, please visit: ' + bw + docURL + nc);

    function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
        const terminalWidth = process.stdout.columns || 80,
              lines = [], words = msg.match(/\S+|\s+/g),
              prefix = '| ';

        // Split msg into lines of appropriate lengths
        let currentLine = '';
        words.forEach(word => {
            const lineLength = terminalWidth - ( lines.length == 0 ? 0 : indent );
            if (currentLine.length + prefix.length + word.length > lineLength) { // cap/store it
                lines.push(lines.length == 0 ? currentLine : currentLine.trimStart());
                currentLine = '';
            }
            currentLine += word;
        });
        lines.push(lines.length == 0 ? currentLine : currentLine.trimStart());

        // Print formatted msg
        lines.forEach((line, index) => console.info(prefix + (
            index == 0 ? line // print 1st line unindented
                : ' '.repeat(indent) + line // print subsequent lines indented
        )));
    }
}

function printHelpCmdAndDocURL() {
    console.info(`\nFor more help, type 'generate-pw --help' or visit\n${ bw + docURL + nc }`); }

function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }

function copyToClipboard(data) {
    data = data.replace(/\s+$/m, '').replace(/"/g, '""');
    if (process.platform == 'darwin') // macOS
        execSync(`printf "${data}" | pbcopy`);
    else if (process.platform == 'linux')
        execSync(`printf "${data}" | xclip -selection clipboard`);
    else if (process.platform == 'win32')
        execSync(`Set-Clipboard -Value "${data}"`, { shell: 'powershell' });
}
