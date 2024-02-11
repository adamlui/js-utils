#!/usr/bin/env node

// Import libs
const fs = require('fs'),
      path = require('path'),
      sass = require('sass');

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
        + '\nExample valid command: \n>> scss-to-css . output.min.css');
    process.exit(1);
}

// Recursively find all SCSS files or arg-passed file
const inputPath = path.resolve(process.cwd(), inputArg);
const scssFiles = inputArg.endsWith('.scss') ? [inputPath]
  : (() => {
        const fileList = [];
        (function findSCSSfiles(dir) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.resolve(dir, file);
                if (fs.statSync(filePath).isDirectory())
                    findSCSSfiles(filePath); // recursively find SCSS
                else if (/\.scss$/.test(file)) // SCSS file found
                    fileList.push(filePath); // store it for minification
            });
        })(inputPath); return fileList;
    })();

// Compile SCSS files to CSS
let generatedCnt = 0;
console.log(''); // line break before first log
scssFiles.forEach(scssPath => {
    try { // to compile it
        const outputDir = path.join(
            path.dirname(scssPath), // path of file to be minified
            outputArg.endsWith('.css') ? path.dirname(outputArg) : outputArg, // path from output arg
            outputArg ? '' : '../css' // ../css/ if no output arg used
        );
        const outputFilename = (
            outputArg.endsWith('.css') && inputArg.endsWith('.scss')
                ? path.basename(outputArg).replace(/(\.min)?\.css$/, '')
                : path.basename(scssPath, '.scss')
        ) + '.min.css';
        const outputPath = path.join(outputDir, outputFilename);
        console.info(`Compiling ${ scssPath }...`);
        const compileResult = sass.compile(scssPath, { style: 'compressed', sourceMap: true });
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(outputPath, compileResult.css, 'utf8');
        fs.writeFileSync(outputPath + '.map', JSON.stringify(compileResult.sourceMap), 'utf8');
        generatedCnt+= 2;
    } catch (err) {
        console.error(`${br}Error compiling ${ scssPath }: ${ err.message }${nc}`);
    }
});

// Print final summary
if (generatedCnt) console.info(`\n${bg}Compilation complete!${nc}\n${ generatedCnt } files generated.`);
else console.info(`\n${by}No SCSS files found.${nc}`);
