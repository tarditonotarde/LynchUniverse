#!/usr/bin/env sh

# Abort on errors
set -e

# Build
echo "Building project..."
npm run build

# Navigate into the build output directory
cd dist

# Create .nojekyll to bypass Jekyll processing
echo "" > .nojekyll

# If you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy to GitHub Pages'

# Push to gh-pages branch
# Replace USER/REPO with your GitHub username and repo name
git push -f git@github.com:YOUR-USERNAME/lynchUniverse.git main:gh-pages

cd -
