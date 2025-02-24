#!/bin/bash

# Format and lint only if we're not on main or dev (branch check is done in check-branch.sh)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "dev" ]; then
  echo "⚠️ Skipping formatting and linting on '$BRANCH' branch."
  exit 1
fi

echo "🔍 Running Biome format and lint on staged files..."
pnpm exec biome check --write {staged_files} || {
  echo "❌ Formatting and linting failed!"
  exit 1
}
echo "✅ Formatting and linting passed!"