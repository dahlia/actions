#!/bin/ash
set -e
if [ "$GITHUB_REF" = "" ]; then
  exit 78
fi
if [ "$DIR" = "" ]; then
  DIR="."
fi
match_ref="
from fnmatch import *
from os import *
from sys import *
exit(int(fnmatch(environ['GITHUB_REF'], environ.get('REDIRECT_INDEX', ''))))
"
if [ "$REDIRECT_INDEX" = '*' ]; then
  options=--redirect-index
elif python3 -c "$match_ref"; then
  options=--redirect-index
else
  options=
fi
python3 /ref_subdir.py $options "$DIR" "$(basename "$GITHUB_REF")"
