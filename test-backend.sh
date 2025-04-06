#!/bin/bash

# Run backend tests within the Docker container
docker compose exec backend npm test "$@"
