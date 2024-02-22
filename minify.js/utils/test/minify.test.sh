#!/bin/bash

# Init UI colors
nc='\033[0m' # no color
br='\033[1;91m' # bright red
bg='\033[1;92m' # bright green

# Init minify.js path
searchPath="$(realpath "$0")" # start in test script path
while [[ ! -f "$searchPath/minify.js" ]] # minify.js not found
    do searchPath="$(dirname "$searchPath")" # nav up one
done ; minifyJSpath="$searchPath/minify.js"

# Init I/O args
inputArg="utils/test/input"
outputArg="output/min"

# Run minify command
testCmd="node $minifyJSpath $inputArg $outputArg"
echo -e "\n> Running '$testCmd'..."
if ! $testCmd ; then
    echo -e "\n${br}Error executing command: $testCmd${nc}"
    exit 1
fi

# Compare generated files to expected output
echo "> Comparing generated files to expected output..."
inputDir="$(dirname "$0")/input"
expectedOutputDir="$(dirname "$0")/expected_output"
file1Expected=$(< "$expectedOutputDir/$outputArg/file1.min.js")
file2Expected=$(< "$expectedOutputDir/nested/dir/$outputArg/file2.min.js")
file1Actual=$(< "$inputDir/$outputArg/file1.min.js")
file2Actual=$(< "$inputDir/nested/dir/$outputArg/file2.min.js")

# Cleanup generated files/folders
echo "> Cleaning up generated files/folders..."
rm -rf "$inputDir/${outputArg%%/*}" "$inputDir/nested/dir/${outputArg%%/*}"

# Print test results
if [ "$file1Actual" = "$file1Expected" ] && [ "$file2Actual" = "$file2Expected" ]; then
    echo -e "\n${bg}Test passed: Minification/recursion succeeded!${nc}"
else
    echo -e "\n${br}Test failed: Generated files do not match expected output.${nc}"
    exit 1
fi
