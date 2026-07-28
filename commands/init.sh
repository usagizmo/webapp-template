#!/bin/sh
# In repository root
cd "$(dirname "$0")/.." || exit 1

if [ ! -f .env ]; then
  cp .env.example .env && echo 'Generated: .env'
fi
