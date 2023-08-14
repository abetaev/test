#!/bin/sh

set -e

if [ $(git status -s | wc -l) -ne 0 ]; then
  echo "uncommited changes" 1>&2
  exit 1
fi

if [ ! -f .env ]; then
  echo "configuration not found" 1>&2
  exit 1
fi

TMP_FILE="/tmp/$(uuidgen)"
BRANCH="$(git branch --show-current)"
npm run build
tar cvpf $TMP_FILE -C dist .
git checkout gh-pages
rm -rf *
tar xf $TMP_FILE
rm $TMP_FILE
git add .
git commit -am"deployment $(date)"
git push
git checkout $BRANCH