#!/usr/bin/env node

const pkgName = '@adamlui/minify.js',
      copyright = '© 2024 Adam Lui & contributors under the MIT license.',
      cmdFormat = 'minify-js [inputPath] [outputPath] [options]',
      srcURL = 'https://code.minify-js.org/node.js',
      docURL = 'https://docs.minify-js.org/node.js/#-command-line-usage';

// Import LIBS
const minifyJS = require(__dirname.match(/src/) ? './minify' : './minify.min'),
      fs = require('fs'), path = require('path'),
      { execSync } = require('child_process'); // for --version cmd

// Init UI colors
const nc = '\x1b[0m',    // no color
      br = '\x1b[1;91m', // bright red
      by = '\x1b[1;33m', // bright yellow
      bg = '\x1b[1;92m', // bright green
      bw = '\x1b[1;97m'; // bright white

// Load FLAG settings
const config = {};
const reArgs = {
    flags: {
        'dryRun': /^--?(?:n|dry-?run)$/,
        'includeDotFolders': /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
        'includeDotFiles': /^--?(?:df|D|(?:include-?)?dot-?files?=?(?:true|1)?)$/,
        'noRecursion': /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/,
        'noMangle': /^--?(?:M|(?:disable|no)-?mangle|mangle=(?:false|0))$/,
        'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/
    },
    paramOptions: { 'comment': /^--?comments?(?:=.*|$)/ },
    infoCmds: { 'help': /^--?h(?:elp)?$/,'version': /^--?ve?r?s?i?o?n?$/ }
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
        printHelpSections(['flags', 'paramOptions', 'infoCmds']);
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

    // Init I/O args
    const [inputArg = '', outputArg = ''] = ( // default to empty strings for error-less handling
        process.argv.slice(2) // exclude executable and script paths
            .filter(arg => !arg.startsWith('-')) // exclude flags
            .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root
    );

    // Validate input arg (output arg can be anything)
    const inputPath = path.resolve(process.cwd(), inputArg);
    if (inputArg && !fs.existsSync(inputPath)) {
        console.error(`\n${br}Error: First argument can only be an existing file or directory.`
            + `\n${inputPath} does not exist.${nc}`
            + `\n\n${bg}Example valid command: \n» minify-js . output.min.js${nc}`);
        printHelpCmdAndDocURL(); process.exit(1);
    }

    // Find all eligible JavaScript files or arg-passed file
    const unminnedJSfiles = inputArg.endsWith('.js') ? [inputPath]
        : minifyJS.findJS(inputPath, { recursive: !config.noRecursion, verbose: !config.quietMode });

    if (config.dryRun) { // -n or --dry-run passed
        if (unminnedJSfiles.length > 0) { // print files to be processed
            console.info(`\n${by}JS files to be minified:${nc}`);
            unminnedJSfiles.forEach(file => console.info(file));
        } else console.info(`${by}\nNo JS files will be minified.${nc}`);

    } else { // actually minify JavaScript files

        // Build array of minification data
        const failedPaths = [];
        const minifyData = unminnedJSfiles.map(jsPath => {
            const minifyResult = minifyJS.minify(jsPath, { verbose: !config.quietMode, mangle: !config.noMangle,
                                                           comment: config.comment?.replace(/\\n/g, '\n') });
            if (minifyResult.error) failedPaths.push(jsPath);
            return minifyResult;
        }).filter(minifyResult => !minifyResult.error); // filter out failed minifications

        // Write array data to files
        minifyData?.forEach(({ code, srcPath }) => {
            const outputDir = path.join(
                path.dirname(srcPath), // path of file to be minified
                ( /so?u?rce?$/.test(path.dirname(srcPath)) ? '../' : '' ) // + '../' if in if in *(src|source)/
              + ( outputArg.endsWith('.js') ? path.dirname(outputArg) // + path from file outputArg
                                            : outputArg || 'min' ) // or path from folder outputArg or min/ if no outputArg passed
            );
            const outputFilename = (
                outputArg.endsWith('.js') && inputArg.endsWith('.js')
                    ? path.basename(outputArg).replace(/(\.min)?\.js$/, '')
                    : path.basename(srcPath, '.js')
            ) + '.min.js';
            const outputPath = path.join(outputDir, outputFilename);
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
            fs.writeFileSync(outputPath, code, 'utf8');
        });

        // Print final summary
        if (minifyData?.length > 0) {
            printIfNotQuiet(`\n${bg}Minification complete!${nc}`);
            printIfNotQuiet(
                `${bw + minifyData.length} file${ minifyData.length > 1 ? 's' : '' } minified.${nc}`);
        } else printIfNotQuiet(`${by}No unminified JavaScript files processed.${nc}`);
        if (failedPaths.length > 0) {
            printIfNotQuiet(`\n${br}`
                + `${failedPaths.length} file${ failedPaths.length > 1 ? 's' : '' }`
                + ` failed to minify:${nc}`);
            failedPaths.forEach(path => printIfNotQuiet(path));
        }
    }
}

// Define LOGGING functions

function printHelpSections(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
    const appPrefix = `\x1b[106m\x1b[30m ${pkgName.replace(/^@[^/]+\//, '')} ${nc} `; // bright teal bg + black fg
    const helpSections = {
        'header': [`\n├ ${ appPrefix + copyright}`, `${ appPrefix }Source: ${srcURL}`],
        'usage': [`\n${bw}o Usage:${nc}`, ` ${bw}» ${bg + cmdFormat + nc}`],
        'pathArgs': [
            `\n${bw}o Path arguments:${nc}`,
            ' [inputPath]                 '
                + 'Path to JS file or directory containing JS files to be minified,'
                + ' relative to the current working directory.',
            ' [outputPath]                '
                + 'Path to file or directory where minified files will be stored,'
                + ' relative to original file location (if not provided, min/ is used).'
        ],
        'flags': [
            `\n${bw}o Boolean options:${nc}`,
            ' -n, --dry-run               Don\'t actually minify the file(s),'
                                        + ' just show if they will be processed.',
            ' -d, --include-dotfolders    Include dotfolders in file search.',
            ' -D, --include-dotfiles      Include dotfiles in file search.',
            ' -R, --no-recursion          Disable recursive file searching.',
            ' -M, --no-mangle             Disable mangling names.',
            ' -q, --quiet                 Suppress all logging except errors.'
        ],
        'paramOptions': [
            `\n${bw}o Parameter options:${nc}`,
            '--comment="comment"          Prepend comment to minified code.'
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
    console.info(`\nFor more help, type 'minify.js --help' or visit\n${ bw + docURL + nc }`); }

function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }
