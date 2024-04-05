#!/usr/bin/env node

// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/scss-to-css
// Documentation: https://github.com/adamlui/js-utils/tree/main/scss-to-css#readme

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      sass = require('sass');

// Define MAIN functions

function findSCSS(searchDir, options = {}) {

    const exampleCall = 'findSCSS(\'assets/scss\', { verbose: false, dotFolders: true })';
    const defaultOptions = {
        recursive: true,  // recursively search for nested files in searchDir passed
        verbose: true,    // enable logging
        dotFolders: false // include dotfolders in file search
    };

    // Validate searchDir
    if (typeof searchDir !== 'string')
        return console.error('findSCSS() » ERROR: 1st arg <searchDir> must be a string.');
    else { // verify searchDir path existence
        const searchPath = path.resolve(process.cwd(), searchDir);
        if (!fs.existsSync(searchPath)) {
           console.error('findSCSS() » ERROR: 1st arg <searchDir> must be an existing directory.');
           console.error(`findSCSS() » ${ searchPath } does not exist.`);
           return;
    }}

    // Validate/init options
    if (!validateOptions(options, defaultOptions, exampleCall)) return;
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
              + ( scssFiles.length === 0 ? 'No' : scssFiles.length )
              + ` file${ scssFiles.length == 0 || scssFiles.length > 1 ? 's' : '' } found.`);
        if (findSCSS.caller.name !== 'compile' && !require.main.filename.endsWith('cli.js'))
            console.info('findSCSS() » Check returned array.');
    }
    return options.isRecursing || scssFiles.length > 0 ? scssFiles : [];
}

function compile(inputPath, options = {}) {

    const exampleCall = 'compile(\'assets/scss\', { recursive: false, minify: false })';
    const defaultOptions = {
        recursive: true,   // recursively search for nested files if dir path passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        minify: true,      // minify output CSS
        sourceMaps: true   // generate CSS source maps
    };

    // Validate inputPath
    if (typeof inputPath !== 'string')
        return console.error('compile() » ERROR: 1st arg <inputPath> must be a string.');
    else { // verify inputPath path existence
        inputPath = path.resolve(process.cwd(), inputPath);
        if (!fs.existsSync(inputPath)) {
            console.error('compile() » ERROR: 1st arg <inputPath> must be an existing directory or file.');
            console.error(`compile() » ${ inputPath } does not exist.`);
            return;
    }}

    // Validate/init options
    if (!validateOptions(options, defaultOptions, exampleCall)) return;
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Compile SCSS based on inputPath
    const compileOptions = { style: options.minify ? 'compressed' : 'expanded', sourceMap: options.sourceMaps };
    if (fs.existsSync(inputPath)) { // compile based on path arg
        if (inputPath.endsWith('.scss')) { // file path passed
            if (options.verbose) console.info(`compile() » Compiling ${ inputPath }...`);
            try { // to compile file passed
                const compileResult = sass.compile(inputPath, compileOptions);
                if (options.verbose && !require.main.filename.endsWith('cli.js'))
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

function validateOptions(options, defaultOptions, exampleCall) {
    const logPrefix = ( validateOptions.caller?.name || 'validateOptions' ) + '() » ';
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] === 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key]));
    const printValidOptions = () => {
        console.info(`${ logPrefix }Valid options: [ ${ strValidOptions } ]`);
        console.info(`${ logPrefix }If omitted, default settings are: ${ strDefaultOptions }`);
    };
    if (typeof options != 'object') { // validate as obj
        console.error(`${ logPrefix }ERROR: [options] can only be an object of key/values.`);
        console.info(`${ logPrefix }Example valid call: ${ exampleCall }`);
        printValidOptions(); return false;
    }
    for (const key in options) { // validate each key
        if (key != 'isRecursing' && !Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `${ logPrefix }ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); return false;
        } else if (booleanOptions.includes(key) && typeof options[key] !== 'boolean') {
            console.error(
                `${ logPrefix }ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
            return false;
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10);
            if (isNaN(options[key]) || options[key] < 1) {
                console.error(`${ logPrefix }ERROR: [${ key }] option can only be an integer > 0.`);
                return false;
            }
        }
    }
    return true;
}

// EXPORT main functions
module.exports = { compile, findSCSS };
