#!/usr/bin/env node

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      uglifyJS = require('uglify-js');

// Load FLAGS
const config = require.main !== module ? {} : {
    dryRun: process.argv.some(arg => /^--?(?:n|dry-?run)$/.test(arg)),
    includeDotFolders: process.argv.some(arg =>
        /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?)$/.test(arg)),
    includeDotFiles: process.argv.some(arg =>
        /^--?(?:df|D|(?:include-?)?dot-?files?)$/.test(arg)),
    quietMode: process.argv.some(arg => /^--?q(?:uiet)?$/.test(arg))
};

// Define MAIN functions

function findUnminnedJSfiles(dir, options = { recursive: true, verbose: false }) {
    const dirFiles = fs.readdirSync(dir), unminnedJSfiles = [];
    dirFiles.forEach(file => {
        const filePath = path.resolve(dir, file);
        if (fs.statSync(filePath).isDirectory() && file != 'node_modules' &&
            (config.includeDotFolders || !file.startsWith('.')) && options.recursive) {
                if (options.verbose)
                    console.info(`Searching for unminified JS files in: ${filePath}...`);
                unminnedJSfiles.push( // recursively find unminified JS in eligible dir
                    ...findUnminnedJSfiles(filePath));
            }
        else if (/\.js(?<!\.min\.js)$/.test(file) &&
            (config.includeDotFiles || !file.startsWith('.')))
                unminnedJSfiles.push(filePath); // store eligible unminified JS file for minification
    });
    return unminnedJSfiles;
}

function minify(input, options = { recursive: true, verbose: true }) {
    if (typeof input !== 'string')
        return console.error('minify.js >> ERROR:'
            + ' First argument must be a string of source code or filepath');
    if (fs.existsSync(input)) { // minify based on path arg
        if (input.endsWith('.js')) { // file path passed
            try { return { code: uglifyJS.minify(fs.readFileSync(input, 'utf8')).code, srcPath: input }; }
            catch (err) { console.error(err); return null; }
        } else { // dir path passed
            const unminnedJSfiles = findUnminnedJSfiles(input, { recursive: options.recursive });
            const minifiedJSfiles = unminnedJSfiles.map(jsPath => {
                if (options.verbose) console.info(`Minifying ${ jsPath }...`);
                try {
                    const srcCode = fs.readFileSync(jsPath, 'utf8'),
                          minifiedCode = uglifyJS.minify(srcCode).code,
                          fileName = path.basename(jsPath, '.js') + '.min.js';
                    return { code: minifiedCode, filename: fileName, srcPath: jsPath };
                } catch (err) {
                    console.error(`${br}Error minifying ${ jsPath }: ${ err.message }${nc}`);
                    return null;
                }
            }).filter(file => file !== null); // filter out failed minifications
            return minifiedJSfiles;
        }
    } else { // minify based on src code arg
        try { return { code: uglifyJS.minify(input).code, srcPath: input }; }
        catch (err) { console.error(err); return null; }
    }
}

// EXPORT functions if script was required
if (require.main !== module) module.exports = { minify, findUnminnedJSfiles };

else { // run as CLI tool

    // Init UI colors
    const nc = '\x1b[0m', // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m', // bright yellow
          bg = '\x1b[1;92m'; // bright green

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
            console.error(`\n${br}Error: First arg must be an existing file or directory.`
                + `\n${ inputPath } does not exist.${nc}`
                + `\n\n${bg}Example valid command: \n>> minify-js . output.min.js${nc}`
                + `\n\n${by}For all command options: \n>> minify-js --help${nc}`);
            process.exit(1);
        }

        // Recursively find all eligible JavaScript files or arg-passed file
        const unminnedJSfiles = inputArg.endsWith('.js') ? [inputPath] : findUnminnedJSfiles(inputPath);

        if (unminnedJSfiles.length === 0) { // print nothing found
            printIfNotQuiet(`\n${by}No unminified JavaScript files found.${nc}`);

        } else if (config.dryRun) { // print files to be processed
            console.info(`\n${by}JS files to be minified:${nc}`);
            unminnedJSfiles.forEach(file => console.info(file));

        } else { // actually minify JavaScript files
            printIfNotQuiet(''); // line break before first log

            // Build array of minified code
            const failedJSpaths = [];
            const minifiedJSdata = unminnedJSfiles.map(jsPath => {
                const minifiedResult = minify(jsPath);
                if (minifiedResult.code === undefined) failedJSpaths.push(jsPath);
                printIfNotQuiet(`Minifying ${ jsPath }...`
                    + ( minifiedResult.code === undefined ? `${br} FAILED${nc}` : '' ));
                return minifiedResult;
            }).filter(file => file.code !== undefined); // filter out failed minifications

            // Write array data to files
            minifiedJSdata.forEach(({ code, srcPath }) => {
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
            if (minifiedJSdata.length > 0) {
                printIfNotQuiet(`\n${bg}Minification complete!${nc}`);
                printIfNotQuiet(
                    `${ minifiedJSdata.length } file${ minifiedJSdata.length > 1 ? 's' : '' } minified.`);
            } else printIfNotQuiet(`${by}No unminified JavaScript files processed successfully.${nc}`);
            const failedCnt = unminnedJSfiles.length - minifiedJSdata.length;
            if (failedCnt > 0) {
                printIfNotQuiet(`\n${br + failedCnt} file${ failedCnt > 1 ? 's' : '' } failed to minify:${nc}`);
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
