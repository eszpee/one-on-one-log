#!/bin/bash

# Run frontend tests within the Docker container
docker compose exec frontend npm test "$@"
