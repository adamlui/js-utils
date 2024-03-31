// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/scss-to-css
// Documentation: https://github.com/adamlui/js-utils/tree/main/scss-to-css#readme

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      sass = require('sass');

// Define MAIN functions

function findSCSS(searchDir, options = {}) {

    // Init options
    const defaultOptions = {
        recursive: true,  // recursively search for nested files in searchDir passed
        verbose: true,    // enable logging
        dotFolders: false // include dotfolders in file search
    };
    options = { ...defaultOptions, ...options };

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

    // Validate options
    for (const key in options) {
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key) && (key !== 'isRecursing')) {
            console.error(`findSCSS() » ERROR: \`${ key }\` is an invalid option.`);
            console.info(`findSCSS() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
            return;
        } else if (typeof options[key] !== 'boolean')
            return console.error(
                `findSCSS() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
    }

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
              + ` file${ scssFiles.length > 1 ? 's' : '' } found.`);
        if (findSCSS.caller.name !== 'compile' && !require.main.filename.endsWith('cli.js'))
            console.info('findSCSS() » Check returned array.');
    }
    return options.isRecursing || scssFiles.length > 0 ? scssFiles : [];
}

function compile(inputPath, options = {}) {

    // Init options
    const defaultOptions = {
        recursive: true,   // recursively search for nested files if dir path passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        minify: true,      // minify output CSS
        sourceMaps: true   // generate CSS source maps
    };
    options = { ...defaultOptions, ...options };

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

    // Validate options
    for (const key in options) {
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key) && (key !== 'isRecursing')) {
            console.error(`compile() » ERROR: \`${ key }\` is an invalid option.`);
            console.info(`compile() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
            return;
        } else if (typeof options[key] !== 'boolean')
            return console.error(
                `compile() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
    }

    // Compile SCSS based on inputPath
    const compileOptions = { style: options.minify ? 'compressed' : 'expanded', sourceMap: options.sourceMaps };
    if (fs.existsSync(inputPath)) { // compile based on path arg
        if (inputPath.endsWith('.scss')) { // file path passed
            if (options.verbose) console.info(`compile() » Compiling ${ inputPath }...`);
            try { // to compile file passed
                const compileResult = sass.compile(inputPath, compileOptions);
                return { code: compileResult.css, srcMap: compileResult.sourceMap,
                         srcPath: path.resolve(process.cwd(), inputPath) };
            } catch (err) { console.error(`\ncompile() » ERROR: ${ err.message }\n`); return { error: err }; }
        } else { // dir path passed
            return findSCSS(inputPath, { recursive: options.recursive, verbose: options.verbose,
                                         dotFolders: options.dotFolders
                })?.map(scssPath => { // compile found SCSS files
                    if (options.verbose) console.info(`compile() » Compiling ${ scssPath }...`); 
                    try { // to compile found file
                        const compileResult = sass.compile(scssPath, compileOptions);
                        return { code: compileResult.css, srcMap: compileResult.sourceMap, srcPath: scssPath };
                    } catch (err) { console.error(`\ncompile() » ERROR: ${ err.message }\n`); return { error: err }; }
                }).filter(data => !data.error ); // filter out failed compilations
        }
    }
}

// EXPORT main functions
module.exports = { compile, findSCSS };
