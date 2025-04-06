#!/bin/bash

# Script to run all tests in the project

# Define colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Running backend tests...${NC}"
docker compose exec backend npm test
BACKEND_RESULT=$?

echo ""
echo -e "${YELLOW}Running frontend tests...${NC}"
docker compose exec frontend npm test
FRONTEND_RESULT=$?

echo ""
if [ $BACKEND_RESULT -eq 0 ] && [ $FRONTEND_RESULT -eq 0 ]; then
  echo -e "${GREEN}All tests passed successfully!${NC}"
  exit 0
else
  echo -e "${RED}Some tests failed.${NC}"
  exit 1
fi
