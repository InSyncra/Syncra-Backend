#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" == "main" ||  "$BRANCH" == "dev" ]]; then
  echo -e "\n${YELLOW} DEFAULT BRANCH WARNING:"
  echo -e "${RED}❌ You are trying to commit/push to '$BRANCH'.${NC}"
  echo "👉 Please switch to a feature branch before proceeding."
  echo -e "${YELLOW}⛔ Otherwise, use '--no-verify' to bypass (not recommended).${NC}\n"
  exit 1
else
  echo -e "\n${GREEN}✅ Running all processes for branch '$BRANCH'...${NC}\n"
fi