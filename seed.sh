#!/bin/bash

# Run database seed scripts inside the backend container

echo "Running database seeds..."
docker compose exec backend npx sequelize-cli db:seed:all

if [ $? -eq 0 ]; then
  echo "Seeding completed successfully!"
else
  echo "Seeding failed!"
  exit 1
fi
