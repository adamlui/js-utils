#!/usr/bin/env node

// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://github.js-utils.com/tree/main/scss-to-css/src
// Documentation: https://github.js-utils.com/tree/main/scss-to-css/docs

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      sass = require('sass');

// Define API functions

function findSCSS(searchDir, options = {}) {

    const docURL = 'https://github.com/adamlui/js-utils/tree/main/scss-to-css#findscsssearchdir-options',
          exampleCall = 'findSCSS(\'assets/scss\', { verbose: false, dotFolders: true })';

    const defaultOptions = {
        recursive: true,  // recursively search for nested files in searchDir passed
        verbose: true,    // enable logging
        dotFolders: false // include dotfolders in file search
    };

    // Validate searchDir
    if (typeof searchDir != 'string') {
            console.error('findSCSS() » ERROR: 1st arg <searchDir> must be a string.');     
            console.info('findSCSS() » For more help, please visit ' + docURL);
            return;
    } else { // verify searchDir path existence
        const searchPath = path.resolve(process.cwd(), searchDir);
        if (!fs.existsSync(searchPath)) {
            console.error('findSCSS() » ERROR: 1st arg <searchDir> must be an existing directory.');
            console.error(`findSCSS() » ${ searchPath } does not exist.`);     
            console.info('findSCSS() » For more help, please visit ' + docURL);
            return;
    }}

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Search for SCSS
    const dirFiles = fs.readdirSync(searchDir), scssFiles = [];
    if (options.verbose && !options.isRecursing)
        console.info('findSCSS() » Searching for SCSS files...');
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file);
        if (fs.statSync(filePath).isDirectory() && file != 'node_modules'
            && (options.dotFolders || !file.startsWith('.')) && options.recursive)
                scssFiles.push( // recursively find SCSS in eligible dir
                    ...findSCSS(filePath, { ...options, isRecursing: true }));
        else if (file.endsWith('.scss')) // SCSS file found
            scssFiles.push(filePath); // store it for returning
    });

    // Log/return final result
    if (!options.isRecursing && options.verbose) {
            console.info('findSCSS() » Search complete! '
              + ( scssFiles.length == 0 ? 'No' : scssFiles.length )
              + ` file${ scssFiles.length == 0 || scssFiles.length > 1 ? 's' : '' } found.`);
        if (findSCSS.caller.name != 'compile' && !/cli(?:\.min)?\.js$/.test(require.main.filename))
            console.info('findSCSS() » Check returned array.');
    }
    return options.isRecursing || scssFiles.length > 0 ? scssFiles : [];
}

function compile(inputPath, options = {}) {

    const docURL = 'https://github.com/adamlui/js-utils/tree/main/scss-to-css#compileinputpath-options',
          exampleCall = 'compile(\'assets/scss\', { recursive: false, minify: false })';

    const defaultOptions = {
        recursive: true,   // recursively search for nested files if dir path passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        minify: true,      // minify output CSS
        sourceMaps: true   // generate CSS source maps
    };

    // Validate inputPath
    if (typeof inputPath != 'string') {
            console.error('compile() » ERROR: 1st arg <inputPath> must be a string.');
            console.info('compile() » For more help, please visit ' + docURL);
            return;
    }
    else { // verify inputPath path existence
        inputPath = path.resolve(process.cwd(), inputPath);
        if (!fs.existsSync(inputPath)) {
            console.error('compile() » ERROR: 1st arg <inputPath> must be an existing directory or file.');
            console.error(`compile() » ${ inputPath } does not exist.`);
            console.info('compile() » For more help, please visit ' + docURL);
            return;
    }}

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Compile SCSS based on inputPath
    const compileOptions = { style: options.minify ? 'compressed' : 'expanded', sourceMap: options.sourceMaps };
    if (fs.existsSync(inputPath)) { // compile based on path arg
        if (inputPath.endsWith('.scss')) { // file path passed
            if (options.verbose) console.info(`compile() » Compiling ${ inputPath }...`);
            try { // to compile file passed
                const compileResult = sass.compile(inputPath, compileOptions);
                if (options.verbose && !/cli(?:\.min)?\.js$/.test(require.main.filename))
                    console.info('compile() » Compilation complete. Check returned object.');
                return { code: compileResult.css, srcMap: compileResult.sourceMap,
                         srcPath: path.resolve(process.cwd(), inputPath) };
            } catch (err) { console.error(`\ncompile() » ERROR: ${ err.message }\n`); return { error: err }; }
        } else { // dir path passed
            const compileResult = findSCSS(inputPath, { recursive: options.recursive, verbose: options.verbose,
                                                        dotFolders: options.dotFolders
                })?.map(scssPath => { // compile found SCSS files
                    if (options.verbose) console.info(`compile() » Compiling ${ scssPath }...`); 
                    try { // to compile found file
                        const compileResult = sass.compile(scssPath, compileOptions);
                        return { code: compileResult.css, srcMap: compileResult.sourceMap, srcPath: scssPath };
                    } catch (err) { console.error(`\ncompile() » ERROR: ${ err.message }\n`); return { error: err }; }
                }).filter(data => !data.error ); // filter out failed compilations
            if (options.verbose) { 
                if (compileResult.length > 0) console.info(
                    'compile() » Compilation complete. Check returned object.');
                else console.info(
                    'compile() » No SCSS files processed.');
            }
            return compileResult;            
        }
    }
}

// Define INTERNAL validation function

function validateOptions(options, defaultOptions, docURL, exampleCall) {

    // Init option strings/types
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key]));

    // Init log vars
    let logPrefix = 'validateOptions() » ';
    try { logPrefix = validateOptions.caller?.name + '() » '; } catch (err) {}
    let optionsPos = exampleCall.split(',').findIndex(arg => arg.trim().startsWith('{')) + 1;
    optionsPos += ['st','nd','rd'][optionsPos - 1] || 'th'; // append ordinal suffix

    // Define print functions
    const printValidOptions = () => {
        console.info(`${ logPrefix }Valid options: [ ${ strValidOptions } ]`);
        console.info(`${ logPrefix }If omitted, default settings are: ${ strDefaultOptions }`);
    };
    const printDocURL = () => {
        console.info(`${ logPrefix }For more help, please visit ${docURL}`); };

    // Validate options
    if (typeof options != 'object') { // validate as obj
        console.error(`${ logPrefix }ERROR: ${
            optionsPos == '0th' ? '[O' : optionsPos + ' arg [o'}ptions] can only be an object of key/values.`);
        console.info(`${ logPrefix }Example valid call: ${ exampleCall }`);
        printValidOptions(); printDocURL(); return false;
    }
    for (const key in options) { // validate each key
        if (key != 'isRecursing' && !Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `${ logPrefix }ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); printDocURL(); return false;
        } else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            console.error(
                `${ logPrefix }ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
            printDocURL(); return false;
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10);
            if (isNaN(options[key]) || options[key] < 1) {
                console.error(`${ logPrefix }ERROR: [${ key }] option can only be an integer > 0.`);
                printDocURL(); return false;
            }
        }
    }
    return true;
}

// EXPORT API functions
module.exports = { compile, find: findSCSS, findSCSS };
