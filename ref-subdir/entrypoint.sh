#!/bin/ash
set -e
if [ "$DIR" = "" ]; then
  DIR="."
fi
if [ "$REDIRECT_INDEX" != "" ]; then
  options=--redirect-index
else
  options=
fi
python3 /ref_subdir.py $options "$DIR" "$(basename "$GITHUB_REF")"
