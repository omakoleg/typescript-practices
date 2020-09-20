#!/usr/bin/env bash
set -euo pipefail

rm -Rf ./docs/pages

# Compiled converter
rm -f converter/**/*.js
rm -f converter/**.js

# Compiled sources
rm -f src/**/*.js
rm -f src/**.js
