#!/bin/sh
if [ "$MSBUILD_PROJECT" != "" ]; then
  msbuild -r "$MSBUILD_PROJECT"
fi

mono /docfx/docfx.exe "$@"
