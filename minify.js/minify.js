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

// Clean leading slashes from args to avoid parsing system root
const inputArg = process.argv[2] ? process.argv[2].replace(/^\/*/, '') : '',
      outputArg = process.argv[3] ? process.argv[3].replace(/^\/*/, '') : '';

// Validate input arg (output arg can be anything)
if (process.argv[2] && !fs.existsSync(inputArg)) {
    console.error(`\n${br}Error: First arg must be an existing file or path.${nc}`
        + '\nExample valid command: \n>> minify-js . output.min.js');
    process.exit(1);
}

// Recursively find all JavaScript files or arg-passed file
const inputPath = path.resolve(process.cwd(), inputArg);
const jsFiles = inputArg.endsWith('.js') ? [inputPath]
  : (() => {
        const fileList = [];
        (function findJSfiles(dir) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                if (fs.statSync(filePath).isDirectory())
                    findJSfiles(filePath); // recursively find unminified JS
                else if (/\.js(?<!\.min\.js)$/.test(file)) // unminified JS file found
                    fileList.push(filePath); // store it for minification
            });
        })(inputPath); return fileList;
    })();

// Minify JavaScript files
let minifiedCnt = 0;
console.log(''); // line break before first log
jsFiles.forEach(jsPath => {
    const outputDir = path.join(
        path.dirname(jsPath), // path of file to be minified
        /so?u?rce?$/.test(path.dirname(jsPath)) ? '../min' // + ../min/ if in *(src|source)/
            : outputArg.endsWith('.js') ? path.dirname(outputArg) // or path from file output arg
            : outputArg || 'min' // or path from path output arg or min/ from no arg
    );
    const outputFilename = (
        outputArg.endsWith('.js') && inputArg.endsWith('.js')
            ? path.basename(outputArg).replace(/(\.min)?\.js$/, '')
            : path.basename(jsPath, '.js')
    ) + '.min.js';
    const outputPath = path.join(outputDir, outputFilename);
    console.info(`Minifying ${ jsPath }...`);
    const minifiedCode = uglifyJS.minify(fs.readFileSync(jsPath, 'utf8')).code;
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, minifiedCode, 'utf8');
    minifiedCnt++;
});

// Print final summary
if (minifiedCnt) console.info(`\n${bg}Minification complete!${nc}\n${ minifiedCnt } files minified.`);
else console.info(`${by}No unminified JavaScript files found.${nc}`);
