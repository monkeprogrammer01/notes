#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -d node_modules ]]; then
  npm ci --no-audit --no-fund
fi

set +e
output="$(npm run test:e2e --silent 2>&1)"
status=$?
set -e

printf '%s\n' "$output"

passed=""
total=""
if [[ "$output" =~ Tests:[[:space:]]+([0-9]+)[[:space:]]+passed,[[:space:]]+([0-9]+)[[:space:]]+total ]]; then
  passed="${BASH_REMATCH[1]}"
  total="${BASH_REMATCH[2]}"
fi

if [[ "$status" -ne 0 || -z "$passed" || "$passed" != "$total" ]]; then
  exit 1
fi

echo "TESTS: ${passed}/${total}"
