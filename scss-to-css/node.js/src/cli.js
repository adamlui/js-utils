#!/usr/bin/env node

// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/scss-to-css/tree/main/node.js/src

const pkgName = '@adamlui/scss-to-css',
      docURL = 'https://github.com/adamlui/scss-to-css/#-command-line-usage';

// Import LIBS
const scssToCSS = require(__dirname.match(/src/) ? './scss-to-css' : './scss-to-css.min'),
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
const argRegex = {
    'dryRun': /^--?(?:n|dry-?run)$/,
    'includeDotFolders': /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
    'noSourceMaps': /^--?(?:S|(?:exclude|disable|no)-?so?u?rce?-?maps?|so?u?rce?-?maps?=(?:false|0))$/,
    'noRecursion': /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/,
    'noMinify': /^--?(?:M|(?:disable|no)-?minif(?:y|ication)|minif(?:y|ication)=(?:false|0))$/,
    'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/,
    'help': /^--?h(?:elp)?$/,
    'version': /^--?ve?r?s?i?o?n?$/
};
process.argv.forEach(arg => {
    if (!arg.startsWith('-')) return;
    const matchedFlag = Object.keys(argRegex).find(flag => argRegex[flag].test(arg));
    if (matchedFlag) config[matchedFlag] = true;
    else {
        console.error(`\n${br}ERROR: Arg [${arg}] not recognized.${nc}`);
        console.info(`\n${by}Valid arguments are below.${nc}`);
        printHelpSections(['configOptions', 'infoCmds']);
        printHelpCmdAndDocURL(); process.exit(1);
}});

// Show HELP screen if -h or --help passed
if (process.argv.some(arg => argRegex.help.test(arg))) printHelpSections();

// Show VERSION number if -v or --version passed
else if (process.argv.some(arg => argRegex.version.test(arg))) {
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
            + `\n'${inputPath}' does not exist.${nc}`
            + `\n\n${bg}Example valid command: \n» scss-to-css . output.min.css${nc}`);
        printHelpCmdAndDocURL(); process.exit(1);
    }

    // Find all eligible JavaScript files or arg-passed file
    const scssFiles = inputArg.endsWith('.scss') ? [inputPath]
        : scssToCSS.findSCSS(inputPath, { recursive: !config.noRecursion, verbose: !config.quietMode });

    if (config.dryRun) { // -n or --dry-run passed
        if (scssFiles.length > 0) { // print files to be processed
            console.info(`\n${by}SCSS files to be compiled:${nc}`);
            scssFiles.forEach(file => console.info(file));
        } else console.info(`${by}\nNo SCSS files will be compiled.${nc}`);

    } else { // actually compile SCSS files

        // Build array of compilation data
        const failedPaths = [];
        const compileData = scssFiles.map(scssPath => {
            const compileResult = scssToCSS.compile(scssPath, {
                minify: !config.noMinify, sourceMaps: !config.noSourceMaps, verbose: !config.quietMode });
            if (compileResult.error) failedPaths.push(scssPath);
            return compileResult;
        }).filter(data => !data.error ); // filter out failed compilations

        // Write array data to files
        compileData?.forEach(({ code, srcMap, srcPath }) => {
            const outputDir = path.join(
                path.dirname(srcPath), // path of file to be minified
                /(?:src|s[ac]ss)$/.test(path.dirname(srcPath)) ? (
                    '../' + ( outputArg || 'css' ) // + ../outputArg|css/ if in *(src|sass|scss)/
                ) : outputArg.endsWith('.css') ? path.dirname(outputArg) // or path from file output arg
                                               : outputArg || 'css' // or path from folder outputArg or css/ if no outputArg passed
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
            printIfNotQuiet(`${compileData.length} CSS file${ cssCntSuffix }`
                + ( !config.noSourceMaps ? ` + ${compileData.length} source map${ cssCntSuffix }` : '' )
                + ' generated.');
        } else printIfNotQuiet(`${by}No SCSS files processed.${nc}`);
        if (failedPaths.length > 0) {
            printIfNotQuiet(`\n${br}`
                + `${failedPaths.length} file${ failedPaths.length > 1 ? 's' : '' }`
                + ` failed to compile:${nc}`);
            failedPaths.forEach(path => printIfNotQuiet(path));
        }
    }
}

// Define LOGGING functions

function printHelpSections(includeSections = ['usage', 'pathArgs', 'configOptions', 'infoCmds']) {
    const helpSections = {
        'usage': [
            '\nscss-to-css [inputPath] [outputPath] [options]'
        ],
        'pathArgs': [
            `\n${bw}Path arguments:${nc}`,
            ' [inputPath]                 '
                + 'Path to SCSS file or directory containing SCSS files to be compiled,'
                + ' relative to the current working directory.',
            ' [outputPath]                '
                + 'Path to file or directory where CSS + sourcemap files will be stored,'
                + ' relative to original file location (if not provided, css/ is used).'
        ],
        'configOptions': [
            `\n${bw}Config options:${nc}`,
            ' -n, --dry-run                Don\'t actually compile the file(s),'
                                        + ' just show if they will be processed.',
            ' -d, --include-dotfolders     Include dotfolders in file search.',
            ' -S, --no-source-maps         Prevent source maps from being generated.',
            ' -M, --no-minify              Disable minification of output CSS.',
            ' -R, --no-recursion           Disable recursive file searching.',
            ' -q, --quiet                  Suppress all logging except errors.'
        ],
        'infoCmds': [
            `\n${bw}Info commands:${nc}`,
            ' -h, --help                   Display help screen.',
            ' -v, --version                Show version number.'
        ]
    };
    includeSections.forEach(section => { // print valid arg elems
        helpSections[section]?.forEach(line => printHelpMsg(line)); });

    function printHelpMsg(msg) { // wrap msg + indent 2nd+ lines (for --help screen)
        const terminalWidth = process.stdout.columns || 80,
              indentation = 30, lines = [], words = msg.match(/\S+|\s+/g);

        // Split msg into lines of appropriate lengths
        let currentLine = '';
        words.forEach(word => {
            const lineLength = terminalWidth - ( lines.length == 0 ? 0 : indentation );
            if (currentLine.length + word.length > lineLength) { // cap/store it
                lines.push(lines.length == 0 ? currentLine : currentLine.trimStart());
                currentLine = '';
            }
            currentLine += word;
        });
        lines.push(lines.length == 0 ? currentLine : currentLine.trimStart());

        // Print formatted msg
        lines.forEach((line, index) => console.info(
            index == 0 ? line // print 1st line unindented
                : ' '.repeat(indentation) + line // print subsequent lines indented
        ));
    }
}

function printHelpCmdAndDocURL() {
    console.info(`\n${by}For more help, type 'scss-to-css --help' or visit\n${ docURL + nc }`); }

function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }
