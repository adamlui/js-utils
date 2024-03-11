#!/usr/bin/env node

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      uglifyJS = require('uglify-js');

// Define MAIN functions

function findJS(searchDir, options = {}) {
    const defaultOptions = { recursive: true, verbose: false, dotFolders: false, dotFiles: false };
    options = { ...defaultOptions, ...options };
    const dirFiles = fs.readdirSync(searchDir), jsFiles = [];
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file);
        if (fs.statSync(filePath).isDirectory() && file != 'node_modules' &&
            (options.dotFolders || !file.startsWith('.')) && options.recursive) {
                if (options.verbose) console.info(`Searching for unminified JS files in: ${filePath}...`);
                jsFiles.push( // recursively find unminified JS in eligible dir
                    ...findJS(filePath));
        } else if (/\.js(?<!\.min\.js)$/.test(file) &&
            (options.dotFiles || !file.startsWith('.')))
                jsFiles.push(filePath); // store eligible unminified JS file for minification
    });
    return jsFiles;
}

function minify(input, options = {}) {
    const defaultOptions = { recursive: true, verbose: true, dotFolders: false, dotFiles: false };
    options = { ...defaultOptions, ...options };
    if (typeof input !== 'string')
        return console.error('ERROR:'
            + ' First argument must be a string of source code or file/folder path.');
    if (fs.existsSync(input)) { // minify based on path arg
        if (input.endsWith('.js')) { // file path passed
            if (options.verbose) console.info(`Minifying ${ input }...`);
            const minifyResult = uglifyJS.minify(fs.readFileSync(input, 'utf8'));
            if (minifyResult.error) console.error(`ERROR: ${ minifyResult.error.message }`);
            return { code: minifyResult.code, srcPath: input, error: minifyResult.error };
        } else { // dir path passed
            return findJS(input, { recursive: options.recursive,
                                        dotFolders: options.dotFolders, dotFiles: options.dotFiles })
                .map(jsPath => { // minify found JS files
                    if (options.verbose) console.info(`Minifying ${ jsPath }...`);
                    const srcCode = fs.readFileSync(jsPath, 'utf8'),
                          minifyResult = uglifyJS.minify(srcCode);
                    if (minifyResult.error) console.error(`ERROR: ${ minifyResult.error.message }`);
                    return { code: minifyResult.code, srcPath: jsPath, error: minifyResult.error };
                }).filter(data => !data.error); // filter out failed minifications
        }
    } else { // minify based on src code arg
        if (options.verbose) console.info('Minifying passed source code...');
        const minifyResult = uglifyJS.minify(input);
        if (minifyResult.error) console.error(`ERROR: ${ minifyResult.error.message }`);
        return { code: minifyResult.code, srcPath: input, error: minifyResult.error };
    }
}

// EXPORT functions if script was required
if (require.main !== module) module.exports = { minify, findJS };

else { // run as CLI tool

    // Init UI colors
    const nc = '\x1b[0m', // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m', // bright yellow
          bg = '\x1b[1;92m'; // bright green

    // Load FLAG settings
    const config = {
        dryRun: process.argv.some(arg => /^--?(?:n|dry-?run)$/.test(arg)),
        includeDotFolders: process.argv.some(arg =>
            /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?)$/.test(arg)),
        includeDotFiles: process.argv.some(arg =>
            /^--?(?:df|D|(?:include-?)?dot-?files?)$/.test(arg)),
        noRecursion: process.argv.some(arg =>
            /^--?(?:R|(?:disable|no)-?recursion)$/.test(arg)),
        quietMode: process.argv.some(arg => /^--?q(?:uiet)?$/.test(arg))
    };

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => /^--?h(?:elp)?$/.test(arg))) {
        printHelp(`\n${by}minify-js [inputPath] [outputPath] [options]${nc}`);
        printHelp('\nPath arguments:');
        printHelp(' [inputPath]                 '
            + 'Path to JS file or directory containing JS files to be minified,'
            + ' relative to the current working directory.');
        printHelp(' [outputPath]                '
            + 'Path to file or directory where minified files will be stored,'
            + ' relative to original file location (if not provided, min/ is used).');
        printHelp('\nConfig options:');
        printHelp(' -n, --dry-run               Don\'t actually minify the file(s),'
            + ' just show if they will be processed.');
        printHelp(' -d, --include-dotfolders    Include dotfolders in file search.');
        printHelp(' -D, --include-dotfiles      Include dotfiles in file search.');
        printHelp(' -R, --no-recursion          Disable recursive file searching.');
        printHelp(' -q, --quiet                 Suppress all logging except errors.');
        printHelp('\nInfo commands:');
        printHelp(' -h, --help                  Display this help screen.');
        printHelp(' -v, --version               Show version number.');

    // Show VERSION number if -v or --version passed
    } else if (process.argv.some(arg => /^--?ve?r?s?i?o?n?$/.test(arg))) {
        console.info('v' + require('./package.json').version);

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
            console.error(`\n${br}Error: First argument must be an existing file or directory.`
                + `'\n${ inputPath }' does not exist.${nc}`
                + `\n\n${bg}Example valid command: \n>> minify-js . output.min.js${nc}`
                + `\n\n${by}For all command options: \n>> minify-js --help${nc}`);
            process.exit(1);
        }

        // Find all eligible JavaScript files or arg-passed file
        const unminnedJSfiles = inputArg.endsWith('.js') ? [inputPath]
            : findJS(inputPath, { recursive: !config.noRecursion });

        if (unminnedJSfiles.length === 0) { // print nothing found
            printIfNotQuiet(`\n${by}No unminified JavaScript files found.${nc}`);

        } else if (config.dryRun) { // print files to be processed
            console.info(`\n${by}JS files to be minified:${nc}`);
            unminnedJSfiles.forEach(file => console.info(file));

        } else { // actually minify JavaScript files
            printIfNotQuiet(''); // line break before first log

            // Build array of minification data
            const failedJSpaths = [];
            const minifyData = unminnedJSfiles.map(jsPath => {
                const minifyResult = minify(jsPath, { verbose: !config.quietMode });
                if (minifyResult.error) failedJSpaths.push(jsPath);
                return minifyResult;
            }).filter(minifyResult => !minifyResult.error); // filter out failed minifications

            // Write array data to files
            minifyData.forEach(({ code, srcPath }) => {
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
            if (minifyData.length > 0) {
                printIfNotQuiet(`\n${bg}Minification complete!${nc}`);
                printIfNotQuiet(
                    `${ minifyData.length } file${ minifyData.length > 1 ? 's' : '' } minified.`);
            } else printIfNotQuiet(`${by}No unminified JavaScript files processed successfully.${nc}`);
            if (failedJSpaths.length > 0) {
                printIfNotQuiet(`\n${br}`
                    + `${ failedJSpaths.length } file${ failedJSpaths.length > 1 ? 's' : '' }`
                    + ` failed to minify:${nc}`);
                printIfNotQuiet(failedJSpaths.join(', '));
            }
        }
    }

    // Define LOGGING functions

    function printHelp(msg) { // wrap msg + indent 2nd+ lines (for --help screen)
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

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }
}
