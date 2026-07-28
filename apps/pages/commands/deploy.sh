#!/bin/sh
# Shell, not JS: rsync and ssh are POSIX binaries, so a JS wrapper adds code without adding portability.
set -e

DEPLOY_HOST='<SSH_HOST>'
DEPLOY_DIR=/var/www/html
DEPLOY_URL=https://webapp-template-pages.usagizmo.com/

if [ "$DEPLOY_HOST" = '<SSH_HOST>' ]; then
  echo 'Configure DEPLOY_HOST in commands/deploy.sh before running deploy.' >&2
  exit 1
fi

# Absolute package root, so the script works from any cwd
PKG_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# rsync creates only the last path segment, so the parents have to exist beforehand.
ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_DIR'"

# -u leaves files that are newer on the server untouched.
rsync -ahvu --delete --exclude=".*" "$PKG_DIR/public/" "$DEPLOY_HOST:$DEPLOY_DIR/"

printf '\n🚀 \033[32m%s\033[0m\n\n' "$DEPLOY_URL"
