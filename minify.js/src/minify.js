#!/usr/bin/env node

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      uglifyJS = require('uglify-js');

// Define API functions

function findJS(searchDir, options = {}) {

    const exampleCall = 'findJS(\'assets/js\', { verbose: false, dotFolders: true })';
    const defaultOptions = {
        recursive: true,   // recursively search for nested files in searchDir passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        dotFiles: false    // include dotfiles in file search
    };

    // Validate searchDir
    if (typeof searchDir !== 'string')
        return console.error('findJS() » ERROR: 1st arg <searchDir> must be a string.');
    else { // verify searchDir path existence
        const searchPath = path.resolve(process.cwd(), searchDir);
        if (!fs.existsSync(searchPath)) {
           console.error('findJS() » ERROR: 1st arg <searchDir> must be an existing directory.');
           console.error(`findJS() » ${ searchPath } does not exist.`);
           return;
    }}

    // Validate options
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', ');
    const printValidOptions = () => {
        console.info(`findJS() » Valid options: [ ${ strValidOptions } ]`);
        console.info(`findJS() » If omitted, default settings are: ${ strDefaultOptions }`);
    };
    if (typeof options !== 'object') { // validate as obj
        console.error('findJS() » ERROR: 2nd arg [options] can only be an object of key/values.');
        console.info(`findJS() » Example valid call: ${ exampleCall }`);
        printValidOptions(); return;
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key) && (key !== 'isRecursing')) {
            console.error(
                `findJS() » ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); return;
        } else if (typeof options[key] !== 'boolean')
            return console.error(
                `findJS() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
    }
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Search for unminified JS
    const dirFiles = fs.readdirSync(searchDir), jsFiles = [];
    if (options.verbose && !options.isRecursing) {
        console.info('findJS() » Searching for unminified JS files...'); }
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file);
        if (fs.statSync(filePath).isDirectory() && file != 'node_modules'
            && (options.dotFolders || !file.startsWith('.')) && options.recursive)
                jsFiles.push( // recursively find unminified JS in eligible dir
                    ...findJS(filePath, { ...options, isRecursing: true }));
        else if (/\.js(?<!\.min\.js)$/.test(file)
            && (options.dotFiles || !file.startsWith('.')))
                jsFiles.push(filePath); // store eligible unminified JS file for returning
    });

    // Log/return final result
    if (!options.isRecursing && options.verbose) {
            console.info('findJS() » Search complete! '
              + ( jsFiles.length === 0 ? 'No' : jsFiles.length )
              + ` file${ jsFiles.length > 1 ? 's' : '' } found.`);
        if (findJS.caller.name !== 'minify' && !require.main.filename.endsWith('cli.js'))
            console.info('findJS() » Check returned array.');
    }
    return options.isRecursing || jsFiles.length > 0 ? jsFiles : [];
}

function minify(input, options = {}) {

    const exampleCall = 'minify(\'assets/js\', { recursive: false, mangle: false })';
    const defaultOptions = {
        recursive: true,   // recursively search for nested files if dir path passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        dotFiles: false,   // include dotfiles in file search
        mangle: true       // shorten var names (typically to one character)
    };

    // Validate input
    if (typeof input !== 'string') return console.error(
        'minify() » ERROR: 1st arg <input> must be a string.');

    // Validate options
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', ');
    const printValidOptions = () => {
        console.info(`minify() » Valid options: [ ${ strValidOptions } ]`);
        console.info(`minify() » If omitted, default settings are: ${ strDefaultOptions }`);
    };
    if (typeof options !== 'object') { // validate as obj
        console.error('minify() » ERROR: 2nd arg [options] can only be an object of key/values.');
        console.info(`minify() » Example valid call: ${ exampleCall }`);
        printValidOptions(); return;
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `minify() » ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); return;
        } else if (typeof options[key] !== 'boolean')
            return console.error(
                `minify() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
    }
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Minify JS based on input
    const minifyOptions = { mangle: options.mangle ? { toplevel: true } : false };
    if (fs.existsSync(input)) { // minify based on path arg
        if (input.endsWith('.js')) { // file path passed
            if (options.verbose) console.info(`minify() » Minifying ${ input }...`);
            const minifyResult = uglifyJS.minify(fs.readFileSync(input, 'utf8'), minifyOptions);
            if (minifyResult.error) console.error(`minify() » ERROR: ${ minifyResult.error.message }`);
            return { code: minifyResult.code, srcPath: path.resolve(process.cwd(), input),
                     error: minifyResult.error };
        } else { // dir path passed
            return findJS(input, { recursive: options.recursive, verbose: options.verbose,
                                   dotFolders: options.dotFolders, dotFiles: options.dotFiles 
                })?.map(jsPath => { // minify found JS files
                    if (options.verbose) console.info(`minify() » Minifying ${ jsPath }...`);
                    const srcCode = fs.readFileSync(jsPath, 'utf8'),
                          minifyResult = uglifyJS.minify(srcCode, minifyOptions);
                    if (minifyResult.error) console.error(`minify() » ERROR: ${ minifyResult.error.message }`);
                    return { code: minifyResult.code, srcPath: jsPath, error: minifyResult.error };
                }).filter(data => !data.error); // filter out failed minifications
        }
    } else { // minify based on src code arg
        if (options.verbose) console.info('minify() » Minifying passed source code...');
        const minifyResult = uglifyJS.minify(input, minifyOptions);
        if (minifyResult.error) console.error(`minify() » ERROR: ${ minifyResult.error.message }`);
        return { code: minifyResult.code, srcPath: undefined, error: minifyResult.error };
    }
}

// EXPORT API functions
module.exports = { minify, findJS };
