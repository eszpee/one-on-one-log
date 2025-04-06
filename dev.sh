#!/bin/bash

# Parse command line arguments
DETACHED=false
REBUILD=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --detached|-d) DETACHED=true ;;
    --rebuild|-r) REBUILD=true ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
  shift
done

# Stop any running containers if rebuilding
if [ "$REBUILD" = true ]; then
  echo "Stopping any existing containers for rebuild..."
  docker compose down
fi

# Start everything
echo "Starting development environment..."

if [ "$DETACHED" = true ]; then
  if [ "$REBUILD" = true ]; then
    docker compose up --build -d
  else
    docker compose up -d
  fi
  echo "Development environment started in detached mode."
  echo "Access your application at http://localhost:8888"
  echo "To view logs: docker compose logs -f"
  echo "To stop: docker compose down"
else
  if [ "$REBUILD" = true ]; then
    docker compose up --build
  else
    docker compose up
  fi
fi
