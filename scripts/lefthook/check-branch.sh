#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" == "main" ||  "$BRANCH" == "dev" ]]; then
  echo "Default Branch Warning:"
  echo "❌ You are trying to commit/push to '$BRANCH'."
  echo "👉 Please switch to a feature branch before proceeding."
  echo "⛔ Otherwise, use '--no-verify' to bypass (not recommended)"
  exit 1
fi