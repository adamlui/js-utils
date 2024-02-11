#!/bin/bash

# Init UI colors
nc="\033[0m" # no color
bg="\033[1;92m" # bright green

# Get latest version from package.json
VERSION=$(node -pe "require('./package.json').version")

# Bump version in package.json
echo "Bumping version in package.json..."
if [ -z "$1" ] || [ "$1" == "patch" ] ; then npm version patch # no arg or 'patch' passed, bump patch version  
elif [ "$1" == "major" ] ; then npm version major # 'major' arg passed, bump major version  
elif [ "$1" == "minor" ] ; then npm version minor # 'minor' arg passed, bump minor version  
else echo "Invalid argument. Please specify 'major', 'minor' or 'patch'." ; exit 1 ; fi

# Get updated version after bump
VERSION=$(node -pe "require('./package.json').version")

# Bump version in README.md
echo -e "\nBumping version in README.md..."
sed -i "s/Latest_Build-[0-9.]\+/Latest_Build-$VERSION/" README.md
echo "v$VERSION"

# Commit to Git
echo -e "\nCommitting changes..."
git add package.json README.md
git commit -m "Bumped version to $VERSION"

# Push to GiHub
echo -e "\nPushing to GitHub..."
git push

# Publish to NPM
if [[ "$*" == *"--publish"* ]] ; then
    echo -e "\nPublishing to npm..."
    npm publish ; fi

echo -e "\n${bg}Successfully bumped to v$VERSION!${nc}"
