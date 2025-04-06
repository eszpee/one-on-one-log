# Testing Guide for One-on-One Log

This document provides comprehensive guidance on testing the One-on-One Log application, focusing on testing principles, tools, and processes.

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Testing Environment](#testing-environment)
3. [Running Tests](#running-tests)
4. [Backend Testing](#backend-testing)
5. [Frontend Testing](#frontend-testing)
6. [Test-Driven Development](#test-driven-development)
7. [Troubleshooting](#troubleshooting)
8. [Continuous Integration](#continuous-integration)

## Testing Philosophy

The One-on-One Log application follows the Test-Driven Development (TDD) approach with the "Red-Green-Refactor" cycle:

1. **RED**: Write a failing test that defines the expected behavior
2. **GREEN**: Implement the minimal code needed to make the test pass
3. **REFACTOR**: Clean up the code while ensuring tests continue to pass

We prioritize writing tests for:
- Core business logic
- API endpoints
- User interactions
- Edge cases and error handling

## Testing Environment

We use Docker to ensure consistent testing environments across different machines. All tests run inside Docker containers to match the development and production environments.

### Environment Variables

- Testing environments use the `NODE_ENV=test` environment variable
- Backend tests use port 3001 (instead of 3000) to avoid conflicts with running services
- Database credentials match those in `.env` files

## Running Tests

### Prerequisites

- Docker and Docker Compose installed
- Project cloned and set up according to README.md

### Setup Scripts

Make the test scripts executable:

```bash
# Make scripts executable (first time only)
chmod +x make-executable.sh
./make-executable.sh
```

### Running Tests

```bash
# Run all tests (backend and frontend)
./test.sh

# Run only backend tests
./test-backend.sh

# Run only frontend tests
./test-frontend.sh

# Run with additional options
./test-backend.sh --watch      # Watch mode for continuous testing
./test-frontend.sh --coverage  # Generate coverage report
```

### Installing Dependencies

If you encounter errors about missing dependencies, run:

```bash
# Install dependencies in Docker containers
./install-deps.sh
```

## Backend Testing

### Tools

- **Jest**: Testing framework for all JavaScript code
- **Supertest**: HTTP assertions for API testing
- **Sequelize**: Database ORM with built-in test helpers

### Test Directory Structure

```
backend/
└── src/
    └── tests/
        ├── api/            # API endpoint tests
        │   └── health.test.js
        ├── db/             # Database tests
        │   └── connection.test.js
        ├── models/         # Model tests
        ├── repositories/   # Repository layer tests
        ├── services/       # Service layer tests
        └── setup.js        # Test configuration
```

### Writing Backend Tests

#### Database Test Example

```javascript
const { sequelize } = require('../../db');

describe('Database Connection', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it('should connect to the database successfully', async () => {
    // Test code here
    expect(connected).toBe(true);
  });
});
```

#### API Test Example

```javascript
const request = require('supertest');
const { app } = require('../../index');

describe('API Endpoints', () => {
  it('should return 200 status for health check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
  });
});
```

## Frontend Testing

### Tools

- **Vitest**: Testing framework for React components and hooks
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM simulation for testing browser functionality

### Test Directory Structure

```
frontend/
└── src/
    └── tests/
        ├── components/     # Component tests
        ├── hooks/          # Custom hooks tests
        ├── utils/          # Utility function tests
        ├── App.test.jsx    # Main App component test
        └── setup.js        # Test configuration
```

### Writing Frontend Tests

#### Component Test Example

```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText('One-on-One Log')).toBeInTheDocument();
  });
});
```

## Test-Driven Development

Follow this process for implementing new features:

1. **Write a failing test** that describes the expected behavior
   ```bash
   ./test-backend.sh --watch
   ```

2. **Implement minimal code** to make the test pass

3. **Refactor** the implementation while keeping tests passing

4. Repeat for the next feature or user story

## Troubleshooting

### Common Issues

- **Tests not finding dependencies**: Run `./install-deps.sh`
- **Port conflicts**: Ensure no other services are using the same ports
- **Database connection issues**: Check the database container is running properly
- **Test hanging**: Look for open connections or promises that aren't resolved/rejected

### Debugging Tips

- Use `console.log` in tests for debugging specific values
- Run tests with verbose output: `./test-backend.sh --verbose`
- Check Docker container logs for errors

## Continuous Integration

In the future, we plan to:
- Add GitHub Actions for automated testing
- Implement test coverage thresholds
- Add pre-commit hooks to run tests before committing code

---

This document will be updated as the testing strategy evolves with the application.
