#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -d node_modules ]]; then
  npm ci --no-audit --no-fund
fi

if [[ -z "${PORT:-}" ]]; then
  PORT=8080
fi
export PORT

exec npm run start