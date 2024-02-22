// Import libs
const fs = require('fs'),
      { execSync } = require('child_process'),
      path = require('path');

// Init UI colors
const nc = '\x1b[0m', // no color
      br = '\x1b[1;91m', // bright red
      bg = '\x1b[1;92m'; // bright green

// Init I/O args
const inputArg = 'test/input',
      outputArg = 'output/min';

// Run minify-js command
const testCmd = `node ../minify.js ${ inputArg } ${ outputArg }`;
console.info(`\n> Running '${ testCmd }'...`);
try { execSync(testCmd); }
catch (err) {
    console.error(`\n${br}Error executing command: ${ testCmd }${nc}`);
    process.exit(1);
}

// Compare generated files to expected output
console.info('> Comparing generated files to expected output...');
const inputDir = path.resolve(__dirname, 'input'),
      expectedOutputDir = path.resolve(__dirname, 'expected_output'),
      file1Expected = fs.readFileSync(path.resolve(expectedOutputDir, outputArg, 'file1.min.js'), 'utf8'),
      file2Expected = fs.readFileSync(path.resolve(expectedOutputDir, 'nested/dir', outputArg, 'file2.min.js'), 'utf8'),
      file1Actual = fs.readFileSync(path.resolve(inputDir, outputArg, 'file1.min.js'), 'utf8'),
      file2Actual = fs.readFileSync(path.resolve(inputDir, 'nested/dir/', outputArg, 'file2.min.js'), 'utf8');

// Cleanup generated files/folders
console.info('> Cleaning up generated files/folders...');
fs.rmSync(path.resolve(inputDir, outputArg.split('/')[0]), { recursive: true });
fs.rmSync(path.resolve(inputDir, 'nested/dir', outputArg.split('/')[0]), { recursive: true });

// Print test results
if (file1Actual === file1Expected && file2Actual === file2Expected)
    console.info(`\n${bg}Test passed: Minification/recursion succeeded!${nc}`);
else {
    console.error(`\n${br}Test failed: Generated files do not match expected output.${nc}`);
    process.exit(1);
}
