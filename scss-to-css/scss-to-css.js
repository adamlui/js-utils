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

// Init I/O args
const [inputArg = '', outputArg = ''] = ( // default to empty strings for error-less handling
    process.argv.slice(2) // exclude executable and script path
        .filter(arg => !arg.startsWith('-')) // exclude flags
        .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root
);

// Validate input arg (output arg can be anything)
if (inputArg && !fs.existsSync(inputArg)) {
    console.error(`\n${br}Error: First arg must be an existing file or directory.${nc}`
        + '\nExample valid command: \n>> scss-to-css . output.min.css');
    process.exit(1);
}

// Store flag settings
const config = { 
    includeDotFolders: process.argv.some(arg => /--?include-dot-?folders?/.test(arg)),
    disableSourceMaps: process.argv.some(arg => /--?(exclude|disable)-source-?maps?/.test(arg))
};

// Recursively find all eligible SCSS files or arg-passed file
const inputPath = path.resolve(process.cwd(), inputArg),
      scssFiles = [];
if (inputArg.endsWith('.scss')) scssFiles.push(inputPath);
else (function findSCSSfiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.resolve(dir, file);
        if (fs.statSync(filePath).isDirectory() &&
            (config.includeDotFolders || !file.startsWith('.')))
                findSCSSfiles(filePath); // recursively find SCSS in eligible dir
        else if (file.endsWith('.scss')) // SCSS file found
            scssFiles.push(filePath); // store it for compilation
    });
})(inputPath);

// Compile SCSS files to CSS
let cssGenCnt = 0, srcMapGenCnt = 0;
console.log(''); // line break before first log
scssFiles.forEach(scssPath => {
    console.info(`Compiling ${ scssPath }...`);
    try { // to compile it
        const outputDir = path.join(
            path.dirname(scssPath), // path of file to be minified
            /(src|s[ac]ss)$/.test(path.dirname(scssPath)) ? '../css' // + ../css/ if in *(src|sass|scss)/
                : outputArg.endsWith('.css') ? path.dirname(outputArg) // or path from file output arg
                : outputArg || 'css' // or path from folder output arg or css/ if no output arg passed
        );
        const outputFilename = (
            outputArg.endsWith('.css') && inputArg.endsWith('.scss')
                ? path.basename(outputArg).replace(/(\.min)?\.css$/, '')
                : path.basename(scssPath, '.scss')
        ) + '.min.css';
        const outputPath = path.join(outputDir, outputFilename),
              compileResult = sass.compile(scssPath, { style: 'compressed', sourceMap: !config.disableSourceMaps });
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(outputPath, compileResult.css, 'utf8'); cssGenCnt++;
        if (!config.disableSourceMaps) {
            fs.writeFileSync(outputPath + '.map', JSON.stringify(compileResult.sourceMap), 'utf8');
            srcMapGenCnt++;
        }
    } catch (err) {
        console.error(`${br}Error compiling ${ scssPath }: ${ err.message }${nc}`);
    }
});

// Print final summary
if (cssGenCnt) {
    console.info(`\n${bg}Compilation complete!${nc}`);
    console.info(`${ cssGenCnt } CSS file${ cssGenCnt > 1 ? 's' : '' }`
        + ( srcMapGenCnt ? ` + ${ srcMapGenCnt } source map${ srcMapGenCnt > 1 ? 's' : '' }` : '' )
        + ' generated.');
} else console.info(`${by}No SCSS files found.${nc}`);
