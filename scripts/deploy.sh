#!/bin/bash
echo "deploy to gh-pages."

cp -rf lib example
cd example
git add --all .
git commit -a -m ":sparkles:(TravisCI) automatically update from travis_ci (version: $TRAVIS_TAG)"
git push --quiet "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" gh-pages:gh-pages