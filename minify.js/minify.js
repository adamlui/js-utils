#!/usr/bin/env node

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      uglifyJS = require('uglify-js');

// Define MAIN functions

function findJS(searchDir, options = {}) {

    // Init options
    const defaultOptions = { recursive: true, verbose: true, dotFolders: false, dotFiles: false };
    options = { ...defaultOptions, ...options };

    // Validate searchDir
    if (!searchDir) return console.error(
        'findJS() error: Please supply a `searchDir` arg.');
    else if (typeof searchDir !== 'string') return console.error(
        'findJS() error: Arg `searchDir` must be a string.');
    else { // verify searchDir path existence
        const searchPath = path.resolve(process.cwd(), searchDir);
        if (!fs.existsSync(searchPath)) return console.error(
            'findJS() error: Arg `searchDir` must be an existing directory.'
                + `\n'${ searchPath }' does not exist.`);
    }

    // Validate options
    for (const key of Object.keys(options)) {
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key))
            if (key !== 'isRecursing') return console.error(
                `findJS() error: \`${ key }\` is an invalid option.`
                    + `\nValid options: [ ${Object.keys(defaultOptions).join(', ')} ]`);
        else if (typeof options[key] !== 'boolean') return console.error(
            `findJS() error: \`${ key }\` option must be set to \`true\` or \`false\`.`);
    }

    // Search for unminified JS
    const dirFiles = fs.readdirSync(searchDir), jsFiles = [];
    if (options.verbose && !options.isRecursing) console.info('\nSearching for unminified JS files...');
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file);
        if (fs.statSync(filePath).isDirectory() && file != 'node_modules'
            && (options.dotFolders || !file.startsWith('.')) && options.recursive)
                jsFiles.push( // recursively find unminified JS in eligible dir
                    ...findJS(filePath, { ...options, isRecursing: true }));
        else if (/\.js(?<!\.min\.js)$/.test(file)
            && (options.dotFiles || !file.startsWith('.')))
                jsFiles.push(filePath); // store eligible unminified JS file for minification
    });

    // Log/return final result
    if (!options.isRecursing && options.verbose) {
        console.info('Search complete. '
            + ( jsFiles.length === 0 ? 'No' : jsFiles.length )
            + ` file${ jsFiles.length > 1 ? 's' : '' } found.`);
    }
    return options.isRecursing || jsFiles.length > 0 ? jsFiles : [];
}

function minify(input, options = {}) {

    // Init options
    const defaultOptions = {
        recursive: true, verbose: true, dotFolders: false, dotFiles: false, mangle: true };
    options = { ...defaultOptions, ...options };

    // Validate input
    if (typeof input !== 'string') return console.error(
        'minify() error: Arg `inputPath` must be a string.');

    // Minify JS based on input
    const minifyOptions = { mangle: options.mangle ? { toplevel: true } : false };
    if (fs.existsSync(input)) { // minify based on path arg
        if (input.endsWith('.js')) { // file path passed
            if (options.verbose) console.info(`Minifying ${ input }...`);
            const minifyResult = uglifyJS.minify(fs.readFileSync(input, 'utf8'), minifyOptions);
            if (minifyResult.error) console.error(`ERROR: ${ minifyResult.error.message }`);
            return { code: minifyResult.code, srcPath: path.resolve(process.cwd(), input),
                     error: minifyResult.error };
        } else { // dir path passed
            return findJS(input, { recursive: options.recursive, verbose: options.verbose,
                                   dotFolders: options.dotFolders, dotFiles: options.dotFiles 
                })?.map(jsPath => { // minify found JS files
                    if (options.verbose) console.info(`Minifying ${ jsPath }...`);
                    const srcCode = fs.readFileSync(jsPath, 'utf8'),
                          minifyResult = uglifyJS.minify(srcCode, minifyOptions);
                    if (minifyResult.error) console.error(`ERROR: ${ minifyResult.error.message }`);
                    return { code: minifyResult.code, srcPath: jsPath, error: minifyResult.error };
                }).filter(data => !data.error); // filter out failed minifications
        }
    } else { // minify based on src code arg
        if (options.verbose) console.info('Minifying passed source code...');
        const minifyResult = uglifyJS.minify(input, minifyOptions);
        if (minifyResult.error) console.error(`ERROR: ${ minifyResult.error.message }`);
        return { code: minifyResult.code, srcPath: undefined, error: minifyResult.error };
    }
}

// EXPORT main functions if script was required
if (require.main !== module) module.exports = { minify, findJS };

else { // run as CLI utility

    // Init UI colors
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m', // bright yellow
          bg = '\x1b[1;92m'; // bright green

    // Load FLAG settings
    const config = {};
    const argRegex = {
        'dryRun': /^--?(?:n|dry-?run)$/,
        'includeDotFolders': /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
        'includeDotFiles': /^--?(?:df|D|(?:include-?)?dot-?files?=?(?:true|1)?)$/,
        'noRecursion': /^--?(?:R|(?:disable|no)-?recursion|recursion=(?:false|0))$/,
        'noMangle': /^--?(?:M|(?:disable|no)-?mangle|mangle=(?:false|0))$/,
        'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/,
        'help': /^--?h(?:elp)?$/,
        'version': /^--?ve?r?s?i?o?n?$/
    };
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return;
        const matchedFlag = Object.keys(argRegex).find(flag => argRegex[flag].test(arg));
        if (matchedFlag) config[matchedFlag] = true;
        else {
            console.error(`\n${br}ERROR: Arg [${ arg }] not recognized.${nc}`);
            console.info(`\n${by}Valid arguments are below.${nc}`);
            printHelpSections(['configOptions', 'infoCmds']);
            process.exit(1);
    }});

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => argRegex.help.test(arg))) printHelpSections();

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => argRegex.version.test(arg)))
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
            console.error(`\n${br}Error: First argument must be an existing file or directory.`
                + `\n'${ inputPath }' does not exist.${nc}`
                + `\n\n${bg}Example valid command: \n>> minify-js . output.min.js${nc}`
                + `\n\n${by}For all command options: \n>> minify-js --help${nc}`);
            process.exit(1);
        }

        // Find all eligible JavaScript files or arg-passed file
        const unminnedJSfiles = inputArg.endsWith('.js') ? [inputPath]
            : findJS(inputPath, { recursive: !config.noRecursion, verbose: !config.quietMode });

        if (config.dryRun) { // -n or --dry-run passed
            if (unminnedJSfiles.length > 0) { // print files to be processed
                console.info(`\n${by}JS files to be minified:${nc}`);
                unminnedJSfiles.forEach(file => console.info(file));
            } else console.info(`${by}\nNo JS files will be minified.${nc}`);

        } else { // actually minify JavaScript files

            // Build array of minification data
            const failedPaths = [];
            const minifyData = unminnedJSfiles.map(jsPath => {
                const minifyResult = minify(jsPath, { verbose: !config.quietMode, mangle: !config.noMangle });
                if (minifyResult.error) failedPaths.push(jsPath);
                return minifyResult;
            }).filter(minifyResult => !minifyResult.error); // filter out failed minifications

            // Write array data to files
            minifyData?.forEach(({ code, srcPath }) => {
                const outputDir = path.join(
                    path.dirname(srcPath), // path of file to be minified
                    /so?u?rce?$/.test(path.dirname(srcPath)) ? '../min' // + ../min/ if in *(src|source)/
                        : outputArg.endsWith('.js') ? path.dirname(outputArg) // or path from file output arg
                        : outputArg || 'min' // or path from folder output arg or min/ if no output arg passed
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

    function printHelpSections(includeSections = ['cmdFormat', 'pathArgs', 'configOptions', 'infoCmds']) {
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
            'configOptions': [
                '\nConfig options:',
                ' -n, --dry-run               Don\'t actually minify the file(s),'
                                           + ' just show if they will be processed.',
                ' -d, --include-dotfolders    Include dotfolders in file search.',
                ' -D, --include-dotfiles      Include dotfiles in file search.',
                ' -R, --no-recursion          Disable recursive file searching.',
                ' -M, --no-mangle             Disable mangling names.',
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

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }
}
