#!/bin/bash

# Install dependencies in Docker containers

echo "Installing frontend dependencies..."
docker compose exec frontend npm install

echo "Installing backend dependencies..."
docker compose exec backend npm install

echo "Dependencies installed successfully!"
