#!/usr/bin/env bash
set -euo pipefail

./scripts/clean.sh

yarn tsc
node converter/convert.js
yarn format
