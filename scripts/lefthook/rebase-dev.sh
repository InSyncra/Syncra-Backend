#!/bin/bash

LAST_COMMIT_DATE=$(git log -1 --format=%ct)
CURRENT_DATE=$(date +%s)
DIFF=$(( (CURRENT_DATE - LAST_COMMIT_DATE) / 86400 ))  # Convert to days

if [[ "$DIFF" -gt 7 ]]; then
  echo "⚠️ Skipping automatic rebase for branches older than 7 days."
  echo "👉 Please manually rebase with 'git rebase dev' if needed."
  exit 0
fi

echo "🔄 Fetching latest changes from dev..."
git fetch origin dev
echo "⚠️ Before pushing, ensure you have rebased with 'git pull --rebase origin dev'."
echo "If you encounter conflicts, resolve them before pushing."