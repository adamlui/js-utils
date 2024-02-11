#!/bin/bash

# Init UI colors
nc="\033[0m" # no color
bg="\033[1;92m" # bright green

# Get old version from package.json
OLD_VERSION=$(node -pe "require('./package.json').version")

# Determine new version
if [ -z "$1" ] || [ "$1" == "patch" ] ; then
    IFS='.' read -ra PARTS <<< "$OLD_VERSION"
    PATCH=$((PARTS[2] + 1))
    NEW_VERSION="${PARTS[0]}.${PARTS[1]}.$PATCH"
elif [ "$1" == "minor" ] ; then
    IFS='.' read -ra PARTS <<< "$OLD_VERSION"
    MINOR=$((PARTS[1] + 1))
    NEW_VERSION="${PARTS[0]}.$MINOR.0"
elif [ "$1" == "major" ] ; then
    IFS='.' read -ra PARTS <<< "$OLD_VERSION"
    MAJOR=$((PARTS[0] + 1))
    NEW_VERSION="$MAJOR.0.0"
else
    echo "Invalid argument. Please specify 'major', 'minor', or 'patch'."
    exit 1 ; fi

# Bump version in package.json + package-lock.json
echo -e "Bumping versions in package manifests..."
npm version --no-git-tag-version "$NEW_VERSION"

# Bump version in README.md
echo -e "\nBumping version in README.md..."
sed -i "s/Latest_Build-[0-9.]\+/Latest_Build-$NEW_VERSION/" README.md
echo "v$NEW_VERSION"

# Commit to Git
echo -e "\nCommitting changes..."
git add package*.json README.md
git commit -n -m "Bumped version to $NEW_VERSION"

# Push to GiHub
echo -e "\nPushing to GitHub..."
git push

# Publish to NPM
if [[ "$*" == *"--publish"* ]] ; then
    echo -e "\nPublishing to npm..."
    npm publish ; fi

echo -e "\n${bg}Successfully bumped to v$NEW_VERSION!${nc}"
