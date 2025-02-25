#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Format and lint only if we're not on main or dev (branch check is done in check-branch.sh)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "dev" ]; then
  echo -e "${RED} ⚠️ Skipping formatting and linting on '$BRANCH' branch."
  exit 1
fi

STAGED_FILES=$(git diff --name-only --cached | grep -E '\.(js|ts|jsx|tsx)$')

echo -e "\n${BLUE}🔍 Running Biome format and lint on staged files...\n"
pnpm exec biome check --write $STAGED_FILES
if [[ $? -ne 0 ]]; then
  echo -e "${RED}❌ Formatting and linting failed! Fix errors before committing.${NC}"
  exit 1
else
  echo -e "\n${GREEN}✅ Formatting and linting passed!${NC}\n"
fi