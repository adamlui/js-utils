#!/usr/bin/env node

// © 2023–2024 Adam Lui & contributors under the MIT license.
// Source: https://code.minify-js.org/node.js
// Documentation: https://docs.minify-js.org/node.js

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      uglifyJS = require('uglify-js');

// Define API functions

function findJS(searchDir, options = {}) {

    const docURL = 'https://docs.minify-js.org/node.js/#findjssearchdir-options',
          exampleCall = `findJS('assets/js', { verbose: false, dotFoldes: true })`;

    const defaultOptions = {
        recursive: true,   // recursively search for nested files in searchDir passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        dotFiles: false,   // include dotfiles in file search
        ignoreFiles: []    // files (by name) to exclude from search results
    };

    // Validate searchDir
    if (typeof searchDir != 'string') {
            console.error('findJS() » ERROR: 1st arg <searchDir> must be a string.');
            console.info('findJS() » For more help, please visit ' + docURL);
            return;
    } else { // verify searchDir path existence
        const searchPath = path.resolve(process.cwd(), searchDir);
        if (!fs.existsSync(searchPath)) {
            console.error('findJS() » ERROR: 1st arg <searchDir> must be an existing directory.');
            console.error(`findJS() » ${searchPath} does not exist.`);           
            console.info('findJS() » For more help, please visit ' + docURL);
            return;
    }}

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Search for unminified JS
    const dirFiles = fs.readdirSync(searchDir), jsFiles = [];
    if (options.verbose && !options.isRecursing) {
        console.info('findJS() » Searching for unminified JS files...'); }
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file);
        if (fs.statSync(filePath).isDirectory() && file != 'node_modules' // folder found
            && options.recursive // only proceed if recursion enabled
            && (options.dotFolders || !file.startsWith('.'))) // exclude dotfolders if prohibited
                jsFiles.push( // recursively find unminified JS in eligible dir
                    ...findJS(filePath, { ...options, isRecursing: true }));
        else if (/\.js(?<!\.min\.js)$/.test(file) // minified JS file found
            && (options.dotFiles || !file.startsWith('.')) // exclude dotfiles if prohibited
            && !options.ignoreFiles.includes(file)) // exclude ignored files
                jsFiles.push(filePath); // store eligible unminified JS file for returning
        else if (options.verbose && options.ignoreFiles.includes(file))
            console.info(`findJS() » ** ${file} ignored due to [options.ignoreFiles]`);
    });

    // Log/return final result
    if (!options.isRecursing && options.verbose) {
        console.info('findJS() » Search complete! '
            + ( jsFiles.length == 0 ? 'No' : jsFiles.length )
            + ` file${ jsFiles.length == 1 ? '' : 's' } found.`);
        if (findJS.caller.name != 'minify' && !process.argv.some(arg => arg.includes('gulp')) &&
            !/cli(?:\.min)?\.js$/.test(require.main.filename))
                console.info('findJS() » Check returned array.');
    }
    return options.isRecursing || jsFiles.length > 0 ? jsFiles : [];
}

function minify(input, options = {}) {

    const docURL = 'https://docs.minify-js.org/node.js/#minifyinput-options',
          exampleCall = `minify('assets/js', { recursive: false, mangle: false })`;

    const defaultOptions = {
        recursive: true,   // recursively search for nested files if dir path passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        dotFiles: false,   // include dotfiles in file search
        mangle: true,      // shorten var names (typically to one character)
        ignoreFiles: [],   // files (by name) to exclude from minification
        comment: ''        // prepend comment to minified code
    };

    // Validate input
    if (typeof input != 'string') {
        console.error('minify() » ERROR: 1st arg <input> must be a string.');
        console.info('minify() » For more help, please visit ' + docURL);
        return;
    }

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    // Minify JS based on input
    const minifyOptions = { mangle: options.mangle };
    if (fs.existsSync(input)) { // minify based on path arg
        if (input.endsWith('.js')) { // file path passed
            if (options.verbose) console.info(`minify() » ** Minifying ${input}...`);
            const minifyResult = uglifyJS.minify(fs.readFileSync(input, 'utf8'), minifyOptions);
            if (options.comment) minifyResult.code = prependComment(minifyResult.code, options.comment);
            if (minifyResult.error) console.error(`minify() » ERROR: ${minifyResult.error.message}`);
            else if (options.verbose && !process.argv.some(arg => arg.includes('gulp')) &&
                !/cli(?:\.min)?\.js$/.test(require.main.filename))
                    console.info('minify() » Minification complete! Check returned object.');
            return { code: minifyResult.code, srcPath: path.resolve(process.cwd(), input),
                     error: minifyResult.error };
        } else { // dir path passed
            const minifyResult = findJS(input, { recursive: options.recursive, verbose: options.verbose,
                                                 dotFolders: options.dotFolders, dotFiles: options.dotFiles,
                                                 ignoreFiles: options.ignoreFiles 
                })?.map(jsPath => { // minify found JS files
                    if (options.verbose) console.info(`minify() » ** Minifying ${jsPath}...`);
                    const srcCode = fs.readFileSync(jsPath, 'utf8');
                    const minifyResult = uglifyJS.minify(srcCode, minifyOptions);
                    if (options.comment) minifyResult.code = prependComment(minifyResult.code, options.comment);
                    if (minifyResult.error) console.error(`minify() » ERROR: ${ minifyResult.error.message }`);
                    return { code: minifyResult.code, srcPath: jsPath, error: minifyResult.error };
                }).filter(data => !data.error); // filter out failed minifications
            if (options.verbose) { 
                if (minifyResult.length > 0) console.info(
                    'minify() » Minification complete! Check returned object.');
                else console.info(
                    'minify() » No unminified JavaScript files processed.');
            }
            return minifyResult;
        }
    } else { // minify based on src code arg
        if (options.verbose && !process.argv.some(arg => arg.includes('gulp')))
            console.info('minify() » ** Minifying passed source code...');
        const minifyResult = uglifyJS.minify(input, minifyOptions);
        if (options.comment) minifyResult.code = prependComment(minifyResult.code, options.comment);
        if (minifyResult.error) console.error(`minify() » ERROR: ${minifyResult.error.message}`);
        else if (options.verbose && !process.argv.some(arg => arg.includes('gulp')))
            console.info('minify() » Minification complete! Check returned object.');
        return { code: minifyResult.code, srcPath: undefined, error: minifyResult.error };
    }

    function prependComment(code, comment) {
        const commentBlock = comment.split('\n').map(line => ` * ${line}`).join('\n'),
              shebangIdx = code.indexOf('#!');
        if (shebangIdx >= 0) {
            const postShebangIdx = code.indexOf('\n', shebangIdx) + 1; // idx of 1st newline after shebang
            return code.slice(0, postShebangIdx) + `/**\n${ commentBlock }\n */\n` + code.slice(postShebangIdx);
        } else return `/**\n${ commentBlock }\n */\n${ code }`;
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
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key])),
          arrayOptions = Object.keys(defaultOptions).filter(key => Array.isArray(defaultOptions[key]));

    // Init log vars
    let logPrefix = 'validateOptions() » ';
    try { logPrefix = validateOptions.caller?.name + '() » '; } catch (err) {}
    let optionsPos = exampleCall.split(',').findIndex(arg => arg.trim().startsWith('{')) + 1;
    optionsPos += ['st','nd','rd'][optionsPos - 1] || 'th'; // append ordinal suffix

    // Define print functions
    const printValidOptions = () => {
        console.info(`${ logPrefix }Valid options: [ ${strValidOptions} ]`);
        console.info(`${ logPrefix }If omitted, default settings are: ${strDefaultOptions}`);
    };
    const printDocURL = () => {
        console.info(`${ logPrefix }For more help, please visit ${docURL}`); };

    // Validate options
    if (typeof options != 'object') { // validate as obj
        console.error(`${ logPrefix }ERROR: ${
            optionsPos == '0th' ? '[O' : optionsPos + ' arg [o'}ptions] can only be an object of key/values.`);
        console.info(`${ logPrefix }Example valid call: ${exampleCall}`);
        printValidOptions(); printDocURL(); return false;
    }
    for (const key in options) { // validate each key
        if (key != 'isRecursing' && !Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(`${ logPrefix }ERROR: \`${key}\` is an invalid option.`);
            printValidOptions(); printDocURL(); return false;
        } else if (booleanOptions.includes(key)) {
            if (key == 'mangle') {
                const printMangleErr = () => console.error(
                        `${ logPrefix }ERROR: [mangle] option can only be \`true\`, \`false\`,`
                            + ' or an object w/ key [toplevel] set to `true` or `false`.');
                if (typeof options.mangle == 'object')
                    for (const mangleKey in options.mangle) {
                        if (!['toplevel'].includes(mangleKey) || typeof options.mangle[mangleKey] != 'boolean') {
                            printMangleErr(); printDocURL(); return false; }
                    }
                else if (typeof options.mangle != 'boolean') {
                            printMangleErr(); printDocURL(); return false; }
            } else if (typeof options[key] != 'boolean') {
                console.error(`${ logPrefix }ERROR: [${key}] option can only be \`true\` or \`false\`.`);
                printDocURL(); return false;
            }
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10);
            if (isNaN(options[key]) || options[key] < 1) {
                console.error(`${ logPrefix }ERROR: [${key}] option can only be an integer > 0.`);
                printDocURL(); return false;
            }
        } else if (arrayOptions.includes(key)) {
            if (typeof options[key] == 'string' && !options[key].includes(','))
                options[key] = [options[key]]; // convert comma-less string to array
            else if (!Array.isArray(options[key])) {
                console.error(`${logPrefix}ERROR: [${key}] option can only be an array.`);
                printDocURL(); return false;
            }
        }
    }
    return true;
}

// EXPORT API functions
const funcAliases = {
    minify: ['build', 'Build', 'compile', 'Compile', 'compress', 'Compress', 'Minify'],
    findJS: ['find', 'Find', 'findjs', 'findJs', 'Findjs', 'FindJs', 'FindJS', 'search', 'Search']
};
module.exports = { minify, findJS };
for (const func in funcAliases) // init/export aliases
    funcAliases[func].forEach(alias => module.exports[alias] = module.exports[func]);
