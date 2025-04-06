#!/bin/bash

# Make scripts executable
chmod +x test-backend.sh
chmod +x test-frontend.sh
chmod +x test.sh
chmod +x install-deps.sh

echo "Scripts are now executable."
echo "You can run tests with:"
echo "  ./test.sh         # Run all tests"
echo "  ./test-backend.sh  # Run only backend tests"
echo "  ./test-frontend.sh # Run only frontend tests"
echo ""
echo "To install dependencies in Docker containers:"
echo "  ./install-deps.sh"
