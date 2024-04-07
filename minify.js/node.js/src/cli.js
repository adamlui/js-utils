#!/usr/bin/env node

// Import LIBS
const minifyJS = require(__dirname.match(/src/) ? './minify' : './minify.min'),
      fs = require('fs'),
      path = require('path');

// Init UI colors
const nc = '\x1b[0m',    // no color
      br = '\x1b[1;91m', // bright red
      by = '\x1b[1;33m', // bright yellow
      bg = '\x1b[1;92m'; // bright green

// Load FLAG settings
const config = {};
const argRegex = {
    flags: {
        'dryRun': /^--?(?:n|dry-?run)$/,
        'includeDotFolders': /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
        'includeDotFiles': /^--?(?:df|D|(?:include-?)?dot-?files?=?(?:true|1)?)$/,
        'noRecursion': /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/,
        'noMangle': /^--?(?:M|(?:disable|no)-?mangle|mangle=(?:false|0))$/,
        'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/
    },
    paramOptions: { 'comment': /^--?comments?(?:=.*|$)/ },
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
            console.error(`\n${by}For more help, type 'minify-js --help'.${nc}`);
            process.exit(1);
        }
        const value = arg.split('=')[1];
        config[matchedParamOption] = parseInt(value) || value;
    } else if (!matchedInfoCmd) {
        console.error(`\n${br}ERROR: Arg [${ arg }] not recognized.${nc}`);
        console.info(`\n${by}Valid arguments are below.${nc}`);
        printHelpSections(['paramOptions', 'flags', 'infoCmds']);
        process.exit(1);
}});

// Show HELP screen if -h or --help passed
if (process.argv.some(arg => argRegex.infoCmds.help.test(arg))) printHelpSections();

// Show VERSION number if -v or --version passed
else if (process.argv.some(arg => argRegex.infoCmds.version.test(arg)))
    console.info('v' + require('./package.json').version);

else { // run MAIN routine

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
            + `\n${ inputPath } does not exist.${nc}`
            + `\n\n${bg}Example valid command: \n» minify-js . output.min.js${nc}`
            + `\n\n${by}For all command options: \n» minify-js --help${nc}`);
        process.exit(1);
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
                                                           comment: config.comment });
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
                `${ minifyData.length } file${ minifyData.length > 1 ? 's' : '' } minified.`);
        } else printIfNotQuiet(`${by}No unminified JavaScript files processed.${nc}`);
        if (failedPaths.length > 0) {
            printIfNotQuiet(`\n${br}`
                + `${ failedPaths.length } file${ failedPaths.length > 1 ? 's' : '' }`
                + ` failed to minify:${nc}`);
            failedPaths.forEach(path => printIfNotQuiet(path));
        }
    }
}

// Define LOGGING functions

function printHelpSections(
    includeSections = ['cmdFormat', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
    const helpSections = {
        'cmdFormat': [
            `\n${by}minify-js [inputPath] [outputPath] [options]${nc}`
        ],
        'pathArgs': [
            '\nPath arguments:',
            ' [inputPath]                 '
                + 'Path to JS file or directory containing JS files to be minified,'
                + ' relative to the current working directory.',
            ' [outputPath]                '
                + 'Path to file or directory where minified files will be stored,'
                + ' relative to original file location (if not provided, min/ is used).'
        ],
        'flags': [
            '\nBoolean options:',
            ' -n, --dry-run               Don\'t actually minify the file(s),'
                                       + ' just show if they will be processed.',
            ' -d, --include-dotfolders    Include dotfolders in file search.',
            ' -D, --include-dotfiles      Include dotfiles in file search.',
            ' -R, --no-recursion          Disable recursive file searching.',
            ' -M, --no-mangle             Disable mangling names.',
            ' -q, --quiet                 Suppress all logging except errors.'
        ],
        'paramOptions': [
            '\nParameter options:',
            ' --comment=comment           Prepend comment to minified code.'
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

function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }
