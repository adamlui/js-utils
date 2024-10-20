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

# Validate version arg
VER_TYPES=("major" "minor" "patch")
if [[ ! "${VER_TYPES[@]}" =~ "$1" ]] ; then
    echo "${BR}Invalid version argument. Please specify 'major', 'minor', or 'patch'.${NC}"
    exit 1 ; fi

# Determine new version to bump to
old_ver=$(node -pe "require('./package.json').version")
IFS='.' read -ra subvers <<< "$old_ver" # split old_ver into subvers array
case $1 in # edit subvers based on version type
    "patch") subvers[2]=$((subvers[2] + 1)) ;;
    "minor") subvers[1]=$((subvers[1] + 1)) ; subvers[2]=0 ;;
    "major") subvers[0]=$((subvers[0] + 1)) ; subvers[1]=0 ; subvers[2]=0 ;;
esac
new_ver=$(printf "%s.%s.%s" "${subvers[@]}")

# Bump version in package.json + package-lock.json
echo -e "${BY}Bumping versions in package manifests...${BW}"
npm version --no-git-tag-version "$new_ver"

# Bump versions in READMEs
echo -e "${BY}\nBumping versions in READMEs...${BW}"
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
echo -e "${BY}\nCommitting bumps to Git...\n${NC}"
find . -name "README.md" -exec git add {} +
git add package*.json
git commit -n -m "Bumped $pkg_name versions to $new_ver"

# Build minified JS to dist/
echo -e "${BY}\nBuilding minified JS...\n${NC}"
bash utils/build.sh

# Update jsDelivr URLs for GitHub assets w/ commit hash
echo -e "${BY}\nUpdating jsDelivr URLs for GitHub assets w/ commit hash...${NC}"
BUMP_HASH=$(git rev-parse HEAD)
old_file=$(<dist/cli.min.js)
sed -i -E "s|(cdn\.jsdelivr\.net\/gh\/[^/]+\/[^@/\"']+)[^/\"']*|\1@$BUMP_HASH|g" dist/cli.min.js
new_file=$(<dist/cli.min.js)
if [[ "$old_file" != "$new_file" ]]
    then echo -e "${BW}$BUMP_HASH${NC}"
    else echo "No jsDelivr URLs for GH assets found in built files"
fi

# Commit build to Git
echo -e "${BY}\nCommitting build to Git...\n${NC}"
git add ./dist/*.js
git commit -n -m "Built $pkg_name v$new_ver"

# Push all changes to GiHub
echo -e "${BY}\nPushing to GitHub...\n${NC}"
git push

# Publish to NPM
if [[ "$*" == *"--publish"* ]] ; then
    echo -e "${BY}\nPublishing to npm...\n${NC}"
    npm publish ; fi

# Print final summary
echo -e "\n${BG}Successfully bumped to v$new_ver$(
    [[ "$*" == *"--publish"* ]] && echo ' and published to npm' || echo ''
)!${NC}"
