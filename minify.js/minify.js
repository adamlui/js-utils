#!/usr/bin/env node

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      uglifyJS = require('uglify-js');

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
        /^--?(?:d?f|(?:include-?)?dot-?files?)$/.test(arg)),
    quietMode: process.argv.some(arg => /^--?q(?:uiet)?$/.test(arg))
};

// Show HELP screen if -h or --help passed
if (process.argv.some(arg => /^--?h(?:elp)?$/.test(arg))) {

    console.info(`\n${by}minify-js [inputPath] [outputPath] [options]${nc}`);
    console.info('\nPath arguments:');
    printWrapped(' [inputPath]                 '
        + 'Path to JS file or directory containing JS files to be minified,'
        + ' relative to the current working directory.');
    printWrapped(' [outputPath]                '
        + 'Path to file or directory where minified files will be stored,'
        + ' relative to original file location (if not provided, min/ is used).');
    console.info('\nConfig options:');
    printWrapped(' -n, --dry-run               Don\'t actually minify the file(s),'
        + ' just show if they will be processed.');
    printWrapped(' -d, --include-dotfolders    Include dotfolders in file search.');
    printWrapped(' -d, --include-dotfiles      Include dotfiles in file search.');
    printWrapped(' -q, --quiet                 Suppress all logging except errors.');
    console.info('\nInfo commands:');
    printWrapped(' -h, --help                  Display this help screen.');
    printWrapped(' -v, --version               Show version number.');

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
    const unminnedJSfiles = [];
    if (inputArg.endsWith('.js')) unminnedJSfiles.push(inputPath);
    else (function findUnminnedJSfiles(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.resolve(dir, file);
            if (fs.statSync(filePath).isDirectory() && file != 'node_modules' &&
                (config.includeDotFolders || !file.startsWith('.')))
                    findUnminnedJSfiles(filePath); // recursively find unminified JS in eligible dir
            else if (/\.js(?<!\.min\.js)$/.test(file) &&
                (config.includeDotFiles || !file.startsWith('.')))
                    unminnedJSfiles.push(filePath); // store eligible unminified JS file for minification
        });
    })(inputPath);

    if (unminnedJSfiles.length === 0) { // print nothing found
        printIfNotQuiet(`\n${by}No unminified JavaScript files found.${nc}`);

    } else if (config.dryRun) { // print files to be processed
        console.info(`\n${by}JS files to be minified:${nc}`);
        unminnedJSfiles.forEach(file => console.info(file));

    } else { // actually minify JavaScript files

        let minifiedCnt = 0;
        printIfNotQuiet(''); // line break before first log
        unminnedJSfiles.forEach(jsPath => {
            printIfNotQuiet(`Minifying ${ jsPath }...`);
            const outputDir = path.join(
                path.dirname(jsPath), // path of file to be minified
                /so?u?rce?$/.test(path.dirname(jsPath)) ? '../min' // + ../min/ if in *(src|source)/
                    : outputArg.endsWith('.js') ? path.dirname(outputArg) // or path from file output arg
                    : outputArg || 'min' // or path from folder output arg or min/ if no output arg passed
            );
            const outputFilename = (
                outputArg.endsWith('.js') && inputArg.endsWith('.js')
                    ? path.basename(outputArg).replace(/(\.min)?\.js$/, '')
                    : path.basename(jsPath, '.js')
            ) + '.min.js';
            const outputPath = path.join(outputDir, outputFilename),
                  minifiedCode = uglifyJS.minify(fs.readFileSync(jsPath, 'utf8')).code;
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
            fs.writeFileSync(outputPath, minifiedCode, 'utf8');
            minifiedCnt++;
        });

        // Print final summary
        if (minifiedCnt) {
            printIfNotQuiet(`\n${bg}Minification complete!${nc}`);
            printIfNotQuiet(`${ minifiedCnt } file${ minifiedCnt > 1 ? 's' : '' } minified.`);
        } else printIfNotQuiet(`${by}No unminified JavaScript files processed successfully.${nc}`);
    }
}

// Define LOGGING functions

function printWrapped(msg) { // + indent 2nd+ lines (for --help screen)
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
