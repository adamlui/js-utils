#!/bin/bash

# Init UI colors
nc='\033[0m'    # no color
br='\033[1;91m' # bright red
bg='\033[1;92m' # bright green

# Init minify.js root
dir="$PWD"
while [ "$dir" != "/" ] ; do
    if [ -f "$dir/package.json" ] ; then
        minifyjs_root="$dir" ; break ; fi
    dir=$(dirname "$dir") # go up one
done

# Init I/O args
relative_path="$(realpath --relative-to="$minifyjs_root" "$PWD")"
if [ "$relative_path" = "utils/test" ] ; then input_arg="input"
elif [ "$relative_path" = "." ] ; then input_arg="utils/test/input"
else
    levels_up=$(echo "$relative_path" | tr '/' '\n' | wc -l)
    parent_dirs=$(printf "../%.0s" $(seq 1 $((levels_up - 1))))
    input_arg="$parent_dirs/utils/test/input"
fi
output_arg="output/min"

# Run minify.js CLI
node "$minifyjs_root/src/cli.js" "$input_arg" "$output_arg"

# Compare generated files to expected output
echo -e "\n> Comparing generated files to expected output..."
expected_output_dir="$(dirname "$0")/expected_output"
file1_expected=$(< "$expected_output_dir/min/file1.min.js")
file2_expected=$(< "$expected_output_dir/min/nested/dir/file2.min.js")
file1_actual=$(< "$minifyjs_root/$output_arg/file1.min.js")
file2_actual=$(< "$minifyjs_root/$output_arg/nested/dir/file2.min.js")

# Cleanup generated files/folders
echo "> Cleaning up generated files/folders..."
rm -rf "${minifyjs_root:?}/${output_arg%%/*}"

# Print test results
if [ "$file1_actual" = "$file1_expected" ] && [ "$file2_actual" = "$file2_expected" ] ; then
    echo -e "\n${bg}Test passed: Minification/recursion succeeded!${nc}"
else
    echo -e "\n${br}Test failed: Generated files do not match expected output.${nc}"
    exit 1
fi
