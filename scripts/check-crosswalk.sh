#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
for file in labcorp-crosswalk-ui.js labcorp-crosswalk-data.js labcorp-quest-workbook-crosswalk-overrides.js assets/js/batch-inline-hints.js assets/js/batch-no-match-finder.js; do
  node --check "$file"
done
# Automatically include future crosswalk regression suites.
shopt -s nullglob
tests=(tests/*crosswalk*.test.cjs)
if (( ${#tests[@]} == 0 )); then
  echo "No crosswalk regression suites found" >&2
  exit 1
fi
node --test "${tests[@]}"
