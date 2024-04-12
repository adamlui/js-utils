#!/usr/bin/env node

const pkgName = 'generate-ip',
      docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-ip#-command-line-usage';

// Import LIBS
const { ipv4 } = require(__dirname.match(/src/) ? './generate-ip' : './generate-ip.min'),
      fs = require('fs'), path = require('path'),
      { execSync } = require('child_process'); // for --version cmd + cross-platform copying

// Init UI colors
const nc = '\x1b[0m',    // no color
      br = '\x1b[1;91m', // bright red
      by = '\x1b[1;33m'; // bright yellow

// Load settings from ARGS
const config = {};
const argRegex = {
    paramOptions: { 'qty': /^--?qu?a?n?ti?t?y(?:=.*|$)/ },
    flags: { 'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/ },
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
else if (process.argv.some(arg => argRegex.infoCmds.version.test(arg))) {
    const globalVer = execSync(`npm view ${pkgName} version`).toString().trim() || 'none';
    let localVer, currentDir = process.cwd();
    while (currentDir !== '/') {
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

} else { // log/copy RESULT(S)
    if (config.qty && (isNaN(config.qty) || config.qty < 1)) {
        console.error(`\n${br}Error: [qty] argument can only be > 0.${nc}`);
        printHelpCmdAndDocURL(); process.exit(1);
    }
    const ipResult = ipv4.generate({ qty: config.qty || 1, verbose: !config.quietMode });
    if (!config.quietMode) {
        if (config.qty > 1) console.info(`[ ${ ipResult.join(', ') } ]`);
        console.info('\nCopying to clipboard...');
    }
    copyToClipboard(Array.isArray(ipResult) ? ipResult.join('\n') : ipResult);
}

// Define FUNCTIONS

function printHelpSections(includeSections = ['cmdFormat', 'paramOptions', 'flags', 'infoCmds']) {
    const helpSections = {
        'cmdFormat': [
            `\n${by}generate-ip [options|commands]${nc}`
        ],
        'paramOptions': [
            '\nParameter options:',
            ' --qty=n                     Generate n IP address(es).'
        ],
        'flags': [
            '\nBoolean options:',
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
    console.info(`\n${by}For more help, type 'generate-ip --help' or visit\n${docURL + nc}`); }

function copyToClipboard(data) {
    data = data.replace(/\s+$/, '').replace(/"/g, '""');
    if (process.platform === 'darwin') // macOS
        execSync(`printf "${ data }" | pbcopy`);
    else if (process.platform === 'linux')
        execSync(`printf "${ data }" | xclip -selection clipboard`);
    else if (process.platform === 'win32')
        execSync(`Set-Clipboard -Value "${ data }"`, { shell: 'powershell' });
}
