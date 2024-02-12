#!/bin/bash

# Init UI colors
nc="\033[0m" # no color
bg="\033[1;92m" # bright green

# Validate version arg
VERSION_TYPES=("major" "minor" "patch")
if [[ ! "${VERSION_TYPES[@]}" =~ "$1" ]] ; then
    echo "${br}Invalid version argument. Please specify 'major', 'minor', or 'patch'.${nc}"
    exit 1 ; fi

# Determine new version to bump to
OLD_VERSION=$(node -pe "require('./package.json').version")
INDEX=$((${#VERSION_TYPES[@]} - 1 - $(echo ${VERSION_TYPES[@]/$1*/} | wc -w))) # index of version type
IFS='.' read -ra PARTS <<< "$OLD_VERSION" # split OLD_VERSION into array
case $1 in # calculate version based on type
    "patch") PARTS[2]=$((PARTS[2] + 1)) ;;
    "minor") PARTS[1]=$((PARTS[1] + 1)); PARTS[2]=0 ;;
    "major") PARTS[0]=$((PARTS[0] + 1)); PARTS[1]=0; PARTS[2]=0 ;;
esac
NEW_VERSION=$(IFS='.'; echo "${PARTS[*]}") # construct new version string

# Bump version in package.json + package-lock.json
echo -e "Bumping versions in package manifests..."
npm version --no-git-tag-version "$NEW_VERSION"

# Bump version in README.md
echo -e "\nBumping version in README.md..."
sed -i "s/Latest_Build-[0-9.]\+/Latest_Build-$NEW_VERSION/" README.md
echo "v$NEW_VERSION"

# Commit to Git
echo -e "\nCommitting changes...\n"
git add package*.json README.md
git commit -n -m "Bumped version to $NEW_VERSION"

# Push to GiHub
echo -e "\nPushing to GitHub...\n"
git push

# Publish to NPM
if [[ "$*" == *"--publish"* ]] ; then
    echo -e "\nPublishing to npm...\n"
    npm publish ; fi

echo -e "\n${bg}Successfully bumped to v$NEW_VERSION!${nc}"
