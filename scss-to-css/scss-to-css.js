#!/usr/bin/env node

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      sass = require('sass');

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
    disableSourceMaps: process.argv.some(arg =>
        /^--?(?:S|(?:exclude|disable|no)-?so?u?rce?-?maps?)$/.test(arg)),
    noRecursion: process.argv.some(arg =>
        /^--?(?:R|(?:disable|no)-?recursion)$/.test(arg)),
    noMinify: process.argv.some(arg =>
        /^--?(?:M|(?:disable|no)-?minif(?:y|ication))$/.test(arg)),
    quietMode: process.argv.some(arg => /^--?q(?:uiet)?$/.test(arg))
};

// Show HELP screen if -h or --help passed
if (process.argv.some(arg => /^--?h(?:elp)?$/.test(arg))) {

    printHelp(`\n${by}scss-to-css [inputPath] [outputPath] [options]${nc}`);
    printHelp('\nPath arguments:');
    printHelp(' [inputPath]                  '
        + 'Path to SCSS file or directory containing SCSS files to be compiled,'
        + ' relative to the current working directory.');
    printHelp(' [outputPath]                 '
        + 'Path to file or directory where CSS + sourcemap files will be stored,'
        + ' relative to original file location (if not provided, css/ is used).');
    printHelp('\nConfig options:');
    printHelp(' -n, --dry-run                Don\'t actually compile the file(s),'
        + ' just show if they will be processed.');
    printHelp(' -d, --include-dotfolders     Include dotfolders in file search.');
    printHelp(' -S, --disable-source-maps    Prevent source maps from being generated.');
    printHelp(' -M, --no-minify              Disable minification of output CSS.');
    printHelp(' -R, --no-recursion           Disable recursive file searching.');
    printHelp(' -q, --quiet                  Suppress all logging except errors.');
    printHelp('\nInfo commands:');
    printHelp(' -h, --help                   Display this help screen.');
    printHelp(' -v, --version                Show version number.');

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
            + `\n\n${bg}Example valid command: \n>> scss-to-css . output.min.css${nc}`
            + `\n\n${by}For all command options: \n>> scss-to-css --help${nc}`);
        process.exit(1);
    }

    // Find all eligible SCSS files or arg-passed file
    const scssFiles = [];
    if (inputArg.endsWith('.scss')) scssFiles.push(inputPath);
    else (function findSCSSfiles(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.resolve(dir, file);
            if (fs.statSync(filePath).isDirectory() &&
                (config.includeDotFolders || !file.startsWith('.')) && !config.noRecursion)
                    findSCSSfiles(filePath); // recursively find SCSS in eligible dir
            else if (file.endsWith('.scss')) // SCSS file found
                scssFiles.push(filePath); // store it for compilation
        });
    })(inputPath);

    if (scssFiles.length === 0) { // print nothing found
        printIfNotQuiet(`\n${by}No SCSS files found.${nc}`);

    } else if (config.dryRun) { // print files to be processed
        console.info(`\n${by}SCSS files to be compiled:${nc}`);
        scssFiles.forEach(file => console.info(file));

    } else { // actually compile SCSS files

        let cssGenCnt = 0, srcMapGenCnt = 0;
        printIfNotQuiet(''); // line break before first log
        scssFiles.forEach(scssPath => {
            printIfNotQuiet(`Compiling ${ scssPath }...`);
            try { // to compile SCSS file
                const outputDir = path.join(
                    path.dirname(scssPath), // path of file to be minified
                    /(?:src|s[ac]ss)$/.test(path.dirname(scssPath)) ? '../css' // + ../css/ if in *(src|sass|scss)/
                        : outputArg.endsWith('.css') ? path.dirname(outputArg) // or path from file output arg
                        : outputArg || 'css' // or path from folder output arg or css/ if no output arg passed
                );
                const outputFilename = (
                    outputArg.endsWith('.css') && inputArg.endsWith('.scss')
                        ? path.basename(outputArg).replace(/(\.min)?\.css$/, '')
                        : path.basename(scssPath, '.scss')
                ) + '.min.css';
                const outputPath = path.join(outputDir, outputFilename),
                      compileResult = sass.compile(scssPath, {
                          style: config.noMinify ? 'expanded' : 'compressed',
                          sourceMap: !config.disableSourceMaps });
                if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
                fs.writeFileSync(outputPath, compileResult.css, 'utf8'); cssGenCnt++;
                if (!config.disableSourceMaps) {
                    fs.writeFileSync(outputPath + '.map', JSON.stringify(compileResult.sourceMap), 'utf8');
                    srcMapGenCnt++;
                }
            } catch (err) { console.error(`${br}Error compiling ${ scssPath }: ${ err.message }${nc}`); }
        });

        // Print final summary
        if (cssGenCnt) {
            printIfNotQuiet(`\n${bg}Compilation complete!${nc}`);
            printIfNotQuiet(`${ cssGenCnt } CSS file${ cssGenCnt > 1 ? 's' : '' }`
                + ( srcMapGenCnt ? ` + ${ srcMapGenCnt } source map${ srcMapGenCnt > 1 ? 's' : '' }` : '' )
                + ' generated.');
        } else printIfNotQuiet(`${by}No SCSS files processed successfully.${nc}`);
    }
}

// Define LOGGING functions

function printHelp(msg) { // wrap msg + indent 2nd+ lines (for --help screen)
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

function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }
