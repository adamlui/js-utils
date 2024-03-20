#!/usr/bin/env node

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      sass = require('sass');

// Define MAIN functions

function findSCSS(searchDir, options = {}) {

    // Init options
    const defaultOptions = { recursive: true, verbose: true, dotFolders: false };
    options = { ...defaultOptions, ...options };

    // Search for SCSS
    const dirFiles = fs.readdirSync(searchDir), scssFiles = [];
    if (options.verbose && !options.isRecursing) console.info('\nSearching for SCSS files...');
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file);
        if (fs.statSync(filePath).isDirectory() && file != 'node_modules'
            && (options.dotFolders || !file.startsWith('.')) && options.recursive)
                scssFiles.push( // recursively find SCSS in eligible dir
                    ...findSCSS(filePath, { ...options, isRecursing: true }));
        else if (file.endsWith('.scss')) // SCSS file found
            scssFiles.push(filePath); // store it for compilation
    });

    // Log/return final result
    if (!options.isRecursing && options.verbose) {
        console.info('Search complete. '
            + ( scssFiles.length === 0 ? 'No' : scssFiles.length )
            + ` file${ scssFiles.length > 1 ? 's' : '' } found.`);
    }
    return options.isRecursing || scssFiles.length > 0 ? scssFiles : [];
}

function compile(inputPath, options = {}) {

    // Init options
    const defaultOptions = { minify: true, sourceMaps: true, recursive: true, verbose: true, dotFolders: false };
    options = { ...defaultOptions, ...options };

    // Validate inputPath
    if (typeof inputPath !== 'string')
        return console.error('ERROR:'
            + ' First argument must be a string representing a file/folder path.');

    // Compile SCSS based on inputPath
    const compileOptions = { style: options.minify ? 'compressed' : 'expanded', sourceMap: options.sourceMaps };
    if (fs.existsSync(inputPath)) { // compile based on path arg
        if (inputPath.endsWith('.scss')) { // file path passed
            if (options.verbose) console.info(`Compiling ${ inputPath }...`);
            try { // to compile file passed
                const compileResult = sass.compile(inputPath, compileOptions);
                return { code: compileResult.css, srcMap: compileResult.sourceMap, srcPath: inputPath };
            } catch (err) { console.error(`\nERROR: ${ err.message }\n`); return { error: err }; }
        } else { // dir path passed
            return findSCSS(inputPath, { recursive: options.recursive, verbosity: options.verbose,
                                         dotFolders: options.dotFolders
                })?.map(scssPath => { // compile found SCSS files
                    if (options.verbose) console.info(`Compiling ${ scssPath }...`); 
                    try { // to compile found file
                        const compileResult = sass.compile(scssPath, compileOptions);
                        return { code: compileResult.css, srcMap: compileResult.sourceMap, srcPath: scssPath };
                    } catch (err) { console.error(`\nERROR: ${ err.message }\n`); return { error: err }; }
                }).filter(data => !data.error ); // filter out failed compilations
        }
    } else return console.error('First argument must be an existing file or directory.'
        + `\n'${ inputPath }' does not exist.`);
}

// EXPORT functions if script was required
if (require.main !== module) module.exports = { compile, findSCSS };

else { // run as CLI tool

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
        'noSourceMaps': /^--?(?:S|(?:exclude|disable|no)-?so?u?rce?-?maps?|so?u?rce?-?maps?=(?:false|0))$/,
        'noRecursion': /^--?(?:R|(?:disable|no)-?recursion|recursion=(?:false|0))$/,
        'noMinify': /^--?(?:M|(?:disable|no)-?minif(?:y|ication)|minif(?:y|ication)=(?:false|0))$/,
        'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/,
        'help': /^--?h(?:elp)?$/
    };
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return;
        const matchedFlag = Object.keys(argRegex).find(flag => argRegex[flag].test(arg));
        if (matchedFlag) config[matchedFlag] = true;
        else {
            console.error(`\n${br}ERROR: Arg '${ arg }' not recognized.${nc}`);
            console.info(`\n${by}Valid arguments are below.${nc}`)
            printHelpScreen(['configOptions', 'infoCmds']);
            process.exit(1);
    }});

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => argRegex.help.test(arg))) printHelpScreen();

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => /^--?ve?r?s?i?o?n?$/.test(arg)))
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
                + `\n\n${bg}Example valid command: \n>> scss-to-css . output.min.css${nc}`
                + `\n\n${by}For all command options: \n>> scss-to-css --help${nc}`);
            process.exit(1);
        }

        // Find all eligible JavaScript files or arg-passed file
        const scssFiles = inputArg.endsWith('.scss') ? [inputPath]
            : findSCSS(inputPath, { recursive: !config.noRecursion, verbose: !config.quietMode });

        if (config.dryRun) { // -n or --dry-run passed
            if (scssFiles.length > 0) { // print files to be processed
                console.info(`\n${by}SCSS files to be compiled:${nc}`);
                scssFiles.forEach(file => console.info(file));
            } else console.info(`${by}\nNo SCSS files will be compiled.${nc}`);

        } else { // actually compile SCSS files

            // Build array of compilation data
            const failedPaths = [];
            const compileData = scssFiles.map(scssPath => {
                const compileResult = compile(scssPath, {
                    minify: !config.noMinify, sourceMaps: !config.noSourceMaps, verbose: !config.quietMode });
                if (compileResult.error) failedPaths.push(scssPath);
                return compileResult;
            }).filter(data => !data.error ); // filter out failed compilations

            // Write array data to files
            compileData?.forEach(({ code, srcMap, srcPath }) => {                
                const outputDir = path.join(
                    path.dirname(srcPath), // path of file to be minified
                    /(?:src|s[ac]ss)$/.test(path.dirname(srcPath)) ? '../css' // + ../css/ if in *(src|sass|scss)/
                        : outputArg.endsWith('.css') ? path.dirname(outputArg) // or path from file output arg
                        : outputArg || 'css' // or path from folder output arg or css/ if no output arg passed
                );
                const outputFilename = (
                    outputArg.endsWith('.css') && inputArg.endsWith('.scss')
                        ? path.basename(outputArg).replace(/(\.min)?\.css$/, '')
                        : path.basename(srcPath, '.scss')
                ) + '.min.css';
                const outputPath = path.join(outputDir, outputFilename);
                if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
                fs.writeFileSync(outputPath, code, 'utf8');
                if (!config.noSourceMaps) fs.writeFileSync(outputPath + '.map', JSON.stringify(srcMap), 'utf8');
            });

            // Print final summary
            if (compileData?.length > 0) {
                const cssCntSuffix = compileData.length > 1 ? 's' : '';
                printIfNotQuiet(`\n${bg}Compilation complete!${nc}`);
                printIfNotQuiet(`${ compileData.length } CSS file${ cssCntSuffix }`
                    + ( !config.noSourceMaps ? ` + ${ compileData.length } source map${ cssCntSuffix }` : '' )
                    + ' generated.');
            } else printIfNotQuiet(`${by}No SCSS files processed.${nc}`);
            if (failedPaths.length > 0) {
                printIfNotQuiet(`\n${br}`
                    + `${ failedPaths.length } file${ failedPaths.length > 1 ? 's' : '' }`
                    + ` failed to compile:${nc}`);
                failedPaths.forEach(path => printIfNotQuiet(path));
            }
        }
    }

    // Define LOGGING functions

    function printHelpMsg(msg) { // wrap msg + indent 2nd+ lines (for --help screen)
        const terminalWidth = process.stdout.columns || 80,
              indentation = 30, lines = [], words = msg.match(/\S+|\s+/g);

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

    function printHelpScreen(includeSections = ['sampleCmd', 'pathArgs', 'configOptions', 'infoCmds']) {
        const sections = {
            'sampleCmd': [
                `\n${by}scss-to-css [inputPath] [outputPath] [options]${nc}`
            ],
            'pathArgs': [
                '\nPath arguments:',
                ' [inputPath]                 '
                    + 'Path to SCSS file or directory containing SCSS files to be compiled,'
                    + ' relative to the current working directory.',
                ' [outputPath]                '
                    + 'Path to file or directory where CSS + sourcemap files will be stored,'
                    + ' relative to original file location (if not provided, css/ is used).'
            ],
            'configOptions': [
                '\nConfig options:',
                ' -n, --dry-run                Don\'t actually compile the file(s),'
                                            + ' just show if they will be processed.',
                ' -d, --include-dotfolders     Include dotfolders in file search.',
                ' -S, --no-source-maps         Prevent source maps from being generated.',
                ' -M, --no-minify              Disable minification of output CSS.',
                ' -R, --no-recursion           Disable recursive file searching.',
                ' -q, --quiet                  Suppress all logging except errors.'
            ],
            'infoCmds': [
                '\nInfo commands:',
                ' -h, --help                   Display help screen.',
                ' -v, --version                Show version number.'
            ]
        };
        includeSections.forEach(section => { // print valid arg elems
            if (sections[section]) sections[section].forEach(line => printHelpMsg(line)); });
    }

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }
}
