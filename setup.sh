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
REMOVE_OLD=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --reset) RESET=true ;;
    --cleanup) REMOVE_OLD=true ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
  shift
done

# Clean up old scripts if requested
if [ "$REMOVE_OLD" = true ]; then
  echo "Removing old scripts..."
  rm -f setup-dev.sh reset-dev.sh install.sh cleanup.sh
fi

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
  echo "Usage:"
  echo "  ./setup.sh            - Set up your development environment"
  echo "  ./setup.sh --reset    - Reset your environment completely"
  echo "  ./setup.sh --cleanup  - Remove old scripts"
  echo "  ./dev.sh              - Start the development server"
  echo "  ./dev.sh --rebuild    - Rebuild and start the development server"
  echo "  ./dev.sh --detached   - Start in detached mode (run in background)"
fi
