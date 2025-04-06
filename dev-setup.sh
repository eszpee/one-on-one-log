#!/bin/bash

# Make dev.sh executable
chmod +x dev.sh

# Check if environment file exists, create if needed
if [ ! -f .env ]; then
  echo "Creating .env file from example..."
  cp .env.example .env
fi

# Parse command line arguments
RESET=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --reset) RESET=true ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
  shift
done

if [ "$RESET" = true ]; then
  echo "Performing complete reset..."
  
  # Stop any running containers
  echo "Stopping running containers..."
  docker compose down
  
  # Remove the volume to force database recreation
  echo "Removing database volume..."
  docker volume rm one-on-one-log_postgres_data 2>/dev/null || true
  
  echo "Reset complete! You can now run ./dev.sh to start with a fresh environment."
else
  echo "Setup complete! Run ./dev.sh to start the development server."
  echo ""
  echo "Additional options:"
  echo "  --reset    Completely reset the environment (stops containers and removes database)"
fi
