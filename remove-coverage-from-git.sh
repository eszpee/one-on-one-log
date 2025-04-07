#!/bin/bash

# This script removes test coverage files from git tracking without deleting them

echo "Removing coverage files from git tracking..."

# Remove backend coverage files
git rm --cached -r backend/coverage || true

# Remove frontend coverage files if they exist
git rm --cached -r frontend/coverage || true

# Add any other coverage directories that might exist
git rm --cached -r coverage || true

echo "Coverage files removed from git tracking."
echo "The files still exist on your filesystem but won't be tracked by git."
echo "The updated .gitignore will prevent these files from being added to git again."
