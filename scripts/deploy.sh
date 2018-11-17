#!/bin/bash
echo "deploy to gh-pages."
echo "current repo: $TRAVIS_REPO_SLUG tag: $TRAVIS_TAG"

cp -rf lib gh-pages
cp -rf example/* gh-pages
cd gh-pages
git add --all .
git commit -a -m ":sparkles:(TravisCI) automatically update from travis_ci (version: $TRAVIS_TAG)"
git push --quiet --force "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" gh-pages:gh-pages