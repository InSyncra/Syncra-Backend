#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 Checking if branch needs to be rebased...${NC}"

LAST_COMMIT_DATE=$(git log -1 --format=%ct)
CURRENT_DATE=$(date +%s)
DIFF=$(( (CURRENT_DATE - LAST_COMMIT_DATE) / 86400 ))  # Convert to days

if [[ "$DIFF" -gt 7 ]]; then
  echo "⚠️ Skipping automatic rebase for branches older than 7 days."
  echo "👉 Please manually rebase with 'git rebase dev' if needed."
  exit 0
fi

echo -e "${BLUE}🔄 Fetching latest changes from dev...${NC}"
git fetch origin dev

echo -e "${BLUE}🔄 Rebasing your branch onto 'dev'...${NC}\n"
git rebase origin/dev
if [[ $? -ne 0 ]]; then
  echo -e "\n${RED}❌ Rebase failed! Please resolve any conflicts manually, then continue with:${NC}"
  echo -e "${YELLOW}   git rebase --continue${NC}"
  exit 1
else
  echo -e "\n${GREEN}✅ Successfully rebased onto 'dev'.${NC}"
  echo -e "${GREEN}🚀 Now you can safely push your changes!${NC}"
fi