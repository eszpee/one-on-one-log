#!/bin/bash

# Run database migrations inside the backend container

echo "Running database migrations..."
docker compose exec backend npx sequelize-cli db:migrate

if [ $? -eq 0 ]; then
  echo "Migrations completed successfully!"
else
  echo "Migration failed!"
  exit 1
fi
