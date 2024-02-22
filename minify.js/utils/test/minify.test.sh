#!/bin/bash

# Init UI colors
nc='\033[0m' # no color
br='\033[1;91m' # bright red
bg='\033[1;92m' # bright green

# Init minify.js path
search_path="$(realpath "$0")" # start in test script path
while [[ ! -f "$search_path/minify.js" ]] # minify.js not found
    do search_path="$(dirname "$search_path")" # nav up one
done ; minifyjs_path="$search_path/minify.js"

# Init I/O args
input_arg="utils/test/input"
output_arg="output/min"

# Run minify command
test_cmd="node $minifyjs_path $input_arg $output_arg"
echo -e "\n> Running '$test_cmd'..."
if ! $test_cmd ; then
    echo -e "\n${br}Error executing command: $test_cmd${nc}"
    exit 1
fi

# Compare generated files to expected output
echo -e "\n> Comparing generated files to expected output..."
input_dir="$(dirname "$0")/input"
expected_output_dir="$(dirname "$0")/expected_output"
file1_expected=$(< "$expected_output_dir/$output_arg/file1.min.js")
file2_expected=$(< "$expected_output_dir/nested/dir/$output_arg/file2.min.js")
file1_actual=$(< "$input_dir/$output_arg/file1.min.js")
file2_actual=$(< "$input_dir/nested/dir/$output_arg/file2.min.js")

# Cleanup generated files/folders
echo "> Cleaning up generated files/folders..."
rm -rf "$input_dir/${output_arg%%/*}" "$input_dir/nested/dir/${output_arg%%/*}"

# Print test results
if [ "$file1_actual" = "$file1_expected" ] && [ "$file2_actual" = "$file2_expected" ]; then
    echo -e "\n${bg}Test passed: Minification/recursion succeeded!${nc}"
else
    echo -e "\n${br}Test failed: Generated files do not match expected output.${nc}"
    exit 1
fi
