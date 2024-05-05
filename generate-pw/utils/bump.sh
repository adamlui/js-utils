#!/bin/bash

# This script automates:
# >>> bump versions in manifests + READMEs >>> commit bumps to Git
# >>> build minified JS to dist/ >>> update jsDelivr URLs in cli.min.js >>> commit build to Git
# >>> push changes to GitHub >>> publish to npm (optional)

# Init UI colors
nc="\033[0m"    # no color
br="\033[1;91m" # bright red
by="\033[1;33m" # bright yellow
bg="\033[1;92m" # bright green
bw="\033[1;97m" # bright white

# Validate version arg
VERSION_TYPES=("major" "minor" "patch")
if [[ ! "${VERSION_TYPES[@]}" =~ "$1" ]] ; then
    echo "${br}Invalid version argument. Please specify 'major', 'minor', or 'patch'.${nc}"
    exit 1 ; fi

# Determine new version to bump to
OLD_VERSION=$(node -pe "require('./package.json').version")
IFS='.' read -ra SUBVERS <<< "$OLD_VERSION" # split OLD_VERSION into SUBVERS array
case $1 in # edit SUBVERS based on version type
    "patch") SUBVERS[2]=$((SUBVERS[2] + 1)) ;;
    "minor") SUBVERS[1]=$((SUBVERS[1] + 1)) ; SUBVERS[2]=0 ;;
    "major") SUBVERS[0]=$((SUBVERS[0] + 1)) ; SUBVERS[1]=0 ; SUBVERS[2]=0 ;;
esac
NEW_VERSION=$(printf "%s.%s.%s" "${SUBVERS[@]}")

# Bump version in package.json + package-lock.json
echo -e "${by}Bumping versions in package manifests...${bw}"
npm version --no-git-tag-version "$NEW_VERSION"

# Bump versions in READMEs
echo -e "${by}\nBumping versions in READMEs...${bw}"
PACKAGE_NAME=$(node -pe "require('./package.json').name" | sed -e 's/^@[a-zA-Z0-9-]*\///' -e 's/^@//')
sed_actions=(
    # Latest Build shield link
    -exec sed -i -E "s|(tag/[^0-9]+)[0-9]+\.[0-9]+\.[0-9]+|\1$NEW_VERSION|g" {} +   
    # Latest Build shield src
    -exec sed -i -E "s|[0-9.]+(-.*logo=icinga)|$NEW_VERSION\1|" {} + 
    # Minified Size shield link/src
    -exec sed -i -E "s|-[0-9]+\.[0-9]+\.[0-9]+([^.]\|$)|-$NEW_VERSION\1|g" {} +
    # jsDelivr ver tags in import section
    -exec sed -i -E "s|@([0-9]+\.[0-9]+\.[0-9]+)|@$NEW_VERSION|g" {} +
)
find . -name 'README.md' "${sed_actions[@]}"
echo "v$NEW_VERSION"

# Commit bumps to Git
echo -e "${by}\nCommitting bumps to Git...\n${nc}"
find . -name "README.md" -exec git add {} +
git add package*.json
git commit -n -m "Bumped $PACKAGE_NAME versions to $NEW_VERSION"

# Build minified JS to dist/
echo -e "${by}\nBuilding minified JS...\n${nc}"
bash utils/build.sh

# Update jsDelivr URL for global messages w/ commit hash
echo -e "${by}\nUpdating jsDelivr URL for global messages w/ commit hash...${nc}"
BUMP_HASH=$(git rev-parse HEAD)
if sed -i -E "s|(cdn\.jsdelivr\.net\/gh\/[^/]+\/[^@/]+)[^/]*|\1@$BUMP_HASH|" dist/cli.min.js
    then echo -e "${bw}$BUMP_HASH${nc}"
    else echo "No jsDelivr URLs found in built files"
fi

# Commit build to Git
echo -e "${by}\nCommitting build to Git...\n${nc}"
git add ./dist/*.js
git commit -n -m "Built $PACKAGE_NAME v$NEW_VERSION"

# Push changes to GiHub
echo -e "${by}\nPushing to GitHub...\n${nc}"
git push

# Publish to NPM
if [[ "$*" == *"--publish"* ]] ; then
    echo -e "${by}\nPublishing to npm...\n${nc}"
    npm publish ; fi

# Print final summary
echo -e "\n${bg}Successfully bumped to v$NEW_VERSION$(
    [[ "$*" == *"--publish"* ]] && echo ' and published to npm' || echo ''
)!${nc}"
