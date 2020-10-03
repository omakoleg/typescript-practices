#!/usr/bin/env bash
set -euo pipefail

yarn tsc
node converter/convert.js
yarn format
