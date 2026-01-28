#!/bin/bash

# This script automates:
# >>> bump versions in manifests + READMEs >>> commit bumps to Git
# >>> build minified JS to dist/ >>> update jsDelivr URLs for GH assets in cli.min.js
# >>> commit build to Git >>> push all changes to GitHub >>> publish to npm (optional)

# Init UI colors
NC="\033[0m"    # no color
BR="\033[1;91m" # bright red
BY="\033[1;33m" # bright yellow
BG="\033[1;92m" # bright green
BW="\033[1;97m" # bright white

# Determine new version to bump to
BUMP_TYPES=("major" "minor" "patch")
old_ver=$(node -pe "require('./package.json').version")
IFS='.' read -ra subvers <<< "$old_ver" # split old_ver into subvers array
case $1 in
    "patch") subvers[2]=$((subvers[2] +1)) ;;
    "minor") subvers[1]=$((subvers[1] +1)) ; subvers[2]=0 ;;
    "major") subvers[0]=$((subvers[0] +1)) ; subvers[1]=0 ; subvers[2]=0 ;;
    *) echo -e "\n${colors.br}Invalid bump type arg provided: $1${colors.nc}" ;
       echo -e "\n${colors.by}Valid args are: ${BUMP_TYPES[*]/#/--}${colors.nc}" ;
       exit 1 ;;
esac
new_ver=$(printf "%s.%s.%s" "${subvers[@]}")

# PULL latest changes
echo -e "${colors.by}Pulling latest changes from remote to sync local repository...${colors.nc}\n"
git pull || (echo -e "${colors.br}Merge failed, please resolve conflicts!${colors.nc}" && exit 1)
echo ''

# Bump version in package.json + package-lock.json
echo -e "${colors.by}Bumping versions in package manifests...${colors.bw}"
npm version --no-git-tag-version "$new_ver"

# Bump versions in READMEs
echo -e "${colors.by}\nBumping versions in READMEs...${colors.bw}"
pkg_name=$(node -pe "require('./package.json').name" | sed -e 's/^@[a-zA-Z0-9-]*\///' -e 's/^@//')
sed_actions=(
    # Latest Build shield link
    -exec sed -i -E "s|(tag/[^0-9]+)[0-9]+\.[0-9]+\.[0-9]+|\1$new_ver|g" {} +   
    # Latest Build shield src
    -exec sed -i -E "s|[0-9.]+(-.*logo=icinga)|$new_ver\1|" {} + 
    # Minified Size shield link/src
    -exec sed -i -E "s|-[0-9]+\.[0-9]+\.[0-9]+([^.]\|$)|-$new_ver\1|g" {} +
    # jsDelivr ver tags in import section
    -exec sed -i -E "s|@([0-9]+\.[0-9]+\.[0-9]+)|@$new_ver|g" {} +
)
find . -name 'README.md' "${sed_actions[@]}"
echo "v$new_ver"

# Commit bumps to Git
echo -e "${colors.by}\nCommitting bumps to Git...\n${colors.nc}"
find . -name "README.md" -exec git add {} +
git add package*.json
git commit -n -m "Bumped $pkg_name versions to $new_ver"

# Build minified JS to dist/
echo -e "${colors.by}\nBuilding minified JS...\n${colors.nc}"
bash utils/build.sh

# Update jsDelivr URLs for GitHub assets w/ commit hash
echo -e "${colors.by}\nUpdating jsDelivr URLs for GitHub assets w/ commit hash...${colors.nc}"
bump_hash=$(git rev-parse HEAD)
old_file=$(<dist/cli/index.min.js)
sed -i -E "s|(cdn\.jsdelivr\.net\/gh\/[^/]+\/[^@/\"']+)[^/\"']*|\1@$bump_hash|g" dist/cli/index.min.js
new_file=$(<dist/cli/index.min.js)
if [[ "$old_file" != "$new_file" ]]
    then echo -e "${colors.bw}$bump_hash${colors.nc}"
    else echo "No jsDelivr URLs for GH assets found in built files."
fi

# Commit build to Git
echo -e "${colors.by}\nCommitting build to Git...\n${colors.nc}"
git add ./dist
git commit -n -m "Built $pkg_name v$new_ver"

# Push all changes to GiHub
echo -e "${colors.by}\nPushing to GitHub...\n${colors.nc}"
git push

# Print final summary
echo -e "\n${colors.bg}Successfully bumped to v$new_ver$([[ "$*" == *"--publish"* ]] && echo ' and published to npm')!${colors.nc}"
