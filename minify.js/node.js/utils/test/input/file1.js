#!/usr/bin/env node

// Import libs
const fs = require('fs'),
      path = require('path'),
      uglifyJS = require('uglify-js');

// Init UI colors
const nc = '\x1b[0m', // no color
      br = '\x1b[1;91m', // bright red
      by = '\x1b[1;33m', // bright yellow
      bg = '\x1b[1;92m'; // bright green

// Init I/O args
const [inputArg = '', outputArg = ''] = ( // default to empty strings for error-less handling
    process.argv.slice(2) // exclude executable and script path
        .filter(arg => !arg.startsWith('-')) // exclude flags
        .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root
);

// Validate input arg (output arg can be anything)
const inputPath = path.resolve(__dirname, inputArg);
if (inputArg && !fs.existsSync(inputPath)) {
    console.error(`\n${br}Error: First arg must be an existing file or directory.`
        + `\n${ inputPath } does not exist.${nc}`
        + '\n\nExample valid command: \n>> minify-js . output.min.js');
    process.exit(1);
}

// Store flag settings
const config = { 
    includeDotFolders: process.argv.some(arg => /--?include-dot-?folders?/.test(arg)),
    includeDotFiles: process.argv.some(arg => /--?include-dot-?files?/.test(arg))
};

// Recursively find all eligible JavaScript files or arg-passed file
const jsFiles = [];
if (inputArg.endsWith('.js')) jsFiles.push(inputPath);
else (function findJSfiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.resolve(dir, file);
        if (fs.statSync(filePath).isDirectory() && file != 'node_modules' &&
            (config.includeDotFolders || !file.startsWith('.')))
                findJSfiles(filePath); // recursively find unminified JS in eligible dir
        else if (/\.js(?<!\.min\.js)$/.test(file) &&
            (config.includeDotFiles || !file.startsWith('.')))
                jsFiles.push(filePath); // store eligible unminified JS file for compilation
    });
})(inputPath);

// Minify JavaScript files
let minifiedCnt = 0;
console.log(''); // line break before first log
jsFiles.forEach(jsPath => {
    console.info(`Minifying ${ jsPath }...`);
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
    console.info(`\n${bg}Minification complete!${nc}`);
    console.info(`${ minifiedCnt } file${ minifiedCnt > 1 ? 's' : '' } minified.`);
} else console.info(`${by}No unminified JavaScript files found.${nc}`);
