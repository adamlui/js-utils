#!/usr/bin/env node

// Import libs
const { execSync } = require('child_process'),
      fs = require('fs'),
      path = require('path');

// Init UI colors
const nc = '\x1b[0m', // no color
      br = '\x1b[1;91m', // bright red
      bg = '\x1b[1;92m'; // bright green

// Check for Sass
try { execSync('sass --version'); }
catch (err) {
    console.error(`\n${br}Error: Sass not installed. `
        + `\n${nc}Please run 'npm i @adamlui/scss-to-css -D' to ensure all dependencies are present.`);
    process.exit(1);
}

// Locate first parent dir w/ package.json to indicate project root
const userProjectDir = (() => {
    let currentDir = process.cwd();
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            console.error(`\n${br}Error: Could not find package.json in any parent directory.`
                + `\n${nc}Please add a manifest to your project to indicate a root.`);
            process.exit(1);
        }
        currentDir = parentDir;
    }
    return currentDir;
})();

// Recursively find all SCSS files in project directory
const scssFiles = (() => {
    const fileList = [];
    const findSCSSfiles = dir => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) findSCSSfiles(filePath);
            else if (file.endsWith('.scss')) fileList.push(filePath);
        });
    };
    findSCSSfiles(userProjectDir); return fileList;
})();

// Compile SCSS files to CSS
if (scssFiles.length === 0) console.info('\nNo SCSS files found.');
else {
    scssFiles.forEach(scssPath => {
        const inputDir = path.dirname(scssPath);
        const outputPath = path.join(inputDir,
            inputDir.includes('scss') ? '..' : '', 'css', // build to ../css/ if from scss/
            path.basename(scssPath, '.scss') + '.min.css'
        );
        console.info(`\nCompiling ${ scssPath } to ${ outputPath }...`);
        execSync(`sass --style compressed "${ scssPath }" "${ outputPath }"`);
        console.info(`${bg}Compilation complete!${nc}`);
    });
}
