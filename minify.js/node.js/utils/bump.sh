#!/bin/bash

# This script automates: bump versions in manifests + READMEs
# >>> commit changes to Git >>> push changes to GitHub >>> publish to npm (optional)

# Init UI colors
nc="\033[0m"    # no color
bg="\033[1;92m" # bright green
br="\033[1;91m" # bright red

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
echo -e "Bumping versions in package manifests..."
npm version --no-git-tag-version "$NEW_VERSION"

# Bump versions in READMEs
echo -e "\nBumping versions in READMEs..."
PACKAGE_NAME=$(node -pe "require('./package.json').name" | sed -e 's/^@[a-zA-Z0-9-]*\///' -e 's/^@//')
sed_actions=(
    # Latest Build shield src
    -exec sed -i -E "s|[0-9.]+(-.*logo=icinga)|$NEW_VERSION\1|" {} +
    # jsDelivr ver tags in import section
    -exec sed -i -E "s|@([0-9]+\.[0-9]+\.[0-9]+)|@$NEW_VERSION|g" {} +
    # Latest Build shield link + Unpacked Size shield link/src
    -exec sed -i -E "s|($PACKAGE_NAME-)[0-9]+\.[0-9]+\.[0-9]+([^.]\|$)|\1$NEW_VERSION\2|g" {} +
)
find . -name 'README.md' "${sed_actions[@]}"
echo "v$NEW_VERSION"

# Commit to Git
echo -e "\nCommitting changes...\n"
find . -name "README.md" -exec git add {} +
git add package*.json
git commit -n -m "Bumped $PACKAGE_NAME versions to $NEW_VERSION"

# Push to GiHub
echo -e "\nPushing to GitHub...\n"
git push

# Publish to NPM
if [[ "$*" == *"--publish"* ]] ; then
    echo -e "\nPublishing to npm...\n"
    npm publish ; fi

# Print final summary
echo -e "\n${bg}Successfully bumped to v$NEW_VERSION$(
    [[ "$*" == *"--publish"* ]] && echo ' and published to npm' || echo ''
)!${nc}"
