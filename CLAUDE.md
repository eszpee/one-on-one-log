# One-on-One Log: Technical Documentation

This document provides comprehensive technical documentation for the One-on-One Log application, focusing on implementation details, development workflows, and deployment practices. This should be used in conjunction with the existing `project_description.md` and `README.md`.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Development Environment](#development-environment)
4. [Directory Structure](#directory-structure)
5. [API Design](#api-design)
6. [Database Management](#database-management)
7. [Code Style Guidelines](#code-style-guidelines)
8. [Testing Strategy](#testing-strategy)
9. [DevOps](#devops)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

## Architecture Overview

The One-on-One Log application follows a modern three-tier architecture:

1. **Frontend**: React-based SPA (Single Page Application) built with Vite
2. **Backend**: Express.js RESTful API server
3. **Database**: PostgreSQL for data persistence

The application is containerized using Docker, which ensures consistent environments across development and production.

## Tech Stack

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **CSS Framework**: Tailwind CSS
- **Testing**: Vitest with React Testing Library

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ORM**: Sequelize
- **Testing**: Jest with Supertest

### Database
- PostgreSQL 16

### DevOps
- Docker and Docker Compose for containerization
- Shell scripts for environment setup and management

## Development Environment

### Prerequisites
- Docker and Docker Compose
- Git

### Environment Setup

The application uses Docker Compose for local development with hot reloading for both frontend and backend.

1. Clone the repository and navigate to the project directory
2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
3. Start the development server:
   ```bash
   ./dev.sh
   ```

The setup script will:
- Make `dev.sh` executable
- Create a `.env` file from `.env.example` if it doesn't exist

### Development Commands

- **Start the development server:**
  ```bash
  ./dev.sh
  ```

- **Start with rebuilding containers:**
  ```bash
  ./dev.sh --rebuild
  ```

- **Start in detached mode (background):**
  ```bash
  ./dev.sh --detached
  ```

- **Reset your environment (including database):**
  ```bash
  ./setup.sh --reset
  ```

- **Install dependencies in Docker containers:**
  ```bash
  ./install-deps.sh
  ```

### Accessing Local Development Services

- Frontend: http://localhost:8888
- Backend API: http://localhost:3000
- Database: PostgreSQL on port 5432 (default credentials in .env.development)

### Running Tests

To run tests inside Docker containers, use the provided scripts:

```bash
# Make scripts executable (once)
./make-executable.sh

# Run all tests
./test.sh

# Run backend tests only
./test-backend.sh

# Run frontend tests only
./test-frontend.sh

# Run with additional options (e.g., watch mode)
./test-backend.sh --watch
./test-frontend.sh --coverage
```

### Development Workflow

1. Start the development environment with `./dev.sh --detached`
2. Make changes to the code (both frontend and backend have hot reloading)
3. Run tests with `./test.sh` to verify your changes
4. View the application at http://localhost:8888 to test in browser
5. Database changes are preserved in the Docker volume between restarts

For major changes requiring a fresh start:
```bash
./setup.sh --reset
./dev.sh
```

## Directory Structure

```
one-on-one-log/
├── backend/                  # Express.js API server
│   ├── init-scripts/         # Database initialization scripts
│   │   └── init-db.sql       # Creates database and user
│   ├── src/                  # Source code
│   │   ├── db/               # Database configuration and models
│   │   │   ├── config/       # Sequelize configuration
│   │   │   └── index.js      # Database initialization
│   │   ├── models/           # Sequelize models
│   │   ├── tests/            # Test files
│   │   │   ├── api/          # API tests
│   │   │   ├── db/           # Database tests
│   │   │   └── setup.js      # Test configuration
│   │   └── index.js          # Main entry point
│   ├── jest.config.js        # Jest configuration
│   ├── Dockerfile            # Development Docker configuration
│   ├── Dockerfile.prod       # Production Docker configuration
│   └── package.json          # Node.js dependencies
│
├── frontend/                 # React application
│   ├── src/                  # Source code
│   │   ├── tests/            # Test files
│   │   │   ├── App.test.jsx  # App component tests
│   │   │   └── setup.js      # Test configuration
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Entry point
│   ├── vitest.config.js      # Vitest configuration
│   ├── Dockerfile            # Development Docker configuration
│   ├── Dockerfile.prod       # Production Docker configuration
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   └── package.json          # Node.js dependencies
│
├── .env.example              # Example environment variables
├── .env.development          # Development environment variables
├── .env.production           # Production environment variables
├── docker-compose.yml        # Development Docker Compose config
├── docker-compose.prod.yml   # Production Docker Compose config
├── setup.sh                  # Environment setup script
├── dev.sh                    # Development server script
├── test.sh                   # Run all tests script
├── test-backend.sh           # Run backend tests script
├── test-frontend.sh          # Run frontend tests script
├── install-deps.sh           # Install dependencies script
└── make-executable.sh        # Make scripts executable
```

## API Design

The application follows RESTful API design principles with the following conventions:

### Base URL
- Development: `http://localhost:3000/api`
- Production: Configured via `API_URL` environment variable

### Current Available Endpoints
- `GET /` - Welcome message and available endpoints
- `GET /api` - API status information
- `GET /api/health` - Health check endpoint

### Future Resource Endpoints (as per project description)
- `/api/contacts` - Collection operations for contacts
- `/api/contacts/:id` - Individual contact operations

### Response Structure
API responses follow a consistent JSON structure:

```json
{
  "message": "Optional human-readable message",
  "status": "Status of the operation",
  "data": {
    // Response data here
  },
  "error": "Optional error message"
}
```

## Database Management

### PostgreSQL Configuration
- Default database name: `one_on_one_log_dev` (development) or `one_on_one_log_prod` (production)
- Access is configured through environment variables in `.env` files

### Database Initialization
The database is automatically initialized with the script in `backend/init-scripts/init-db.sql`, which:
1. Creates a user (`dev_user` in development)
2. Creates the database with appropriate encoding
3. Grants necessary privileges

### Data Validation Philosophy
By design, the application does not enforce strong validation on field contents. This is a deliberate choice to provide flexibility to users:

- Email addresses are stored as strings without format validation
- LinkedIn URLs are not validated for proper format
- Phone numbers, addresses, and other fields accept any input format
- Fields like workplace, knownFrom, etc. can contain any content the user prefers

This approach allows users to use the system according to their own organizational needs and preferences. Only presence validation is applied to ensure required fields are not empty.

### ORM Setup
The application uses Sequelize ORM for database operations. While models are not yet implemented, they will follow standard Sequelize conventions.

## Code Style Guidelines

### JavaScript/React Conventions
- Follow modern ES6+ syntax
- Use functional components with React Hooks
- Prefer destructuring for props
- Use async/await for asynchronous operations
- Use descriptive variable and function names
- Implement error handling with try/catch blocks

### File Structure Conventions
- Component files use PascalCase (e.g., `ContactList.jsx`)
- Utility and helper files use camelCase
- One component per file
- Group related components in folders

### API Development Guidelines
- Follow RESTful conventions for endpoints
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Implement proper error handling and status codes
- Validate input data on both client and server

## Testing Strategy

### Backend Testing
- Use Jest for unit and integration tests
- Use Supertest for API endpoint testing
- Tests should be located adjacent to the code they test

### Frontend Testing
- Use Vitest with React Testing Library
- Focus on component behavior over implementation details
- Test user interactions and UI state changes

### Running Tests
- Use the provided testing scripts:
  ```bash
  # Make scripts executable (once only)
  ./make-executable.sh
  
  # Run all tests
  ./test.sh
  
  # Run backend tests only
  ./test-backend.sh
  
  # Run frontend tests only
  ./test-frontend.sh
  ```

### Test Environment
- Tests run in a separate environment with `NODE_ENV=test`
- Backend tests use a separate port (3001) to avoid conflicts with the running server
- Database connections are properly closed after tests complete

### Test Coverage
- Backend: `./test-backend.sh --coverage`
- Frontend: `./test-frontend.sh --coverage`

## DevOps

### Docker Configuration
- Each service (frontend, backend, database) has its own Docker container
- Development containers include hot reloading
- Production containers are optimized for size and security

### Environment Variables
- Development values in `.env.development`
- Production values in `.env.production`
- Local overrides in `.env` (excluded from version control)

### Script Automation
- `setup.sh` - Initial environment setup
- `dev.sh` - Development server management
- Both scripts accept command line arguments for different operations

## Deployment

### Production Setup
1. Create and configure `.env` based on `.env.production`:
   ```bash
   cp .env.production .env
   ```
   
2. Edit the `.env` file to set your preferred passwords and configuration
   
3. Start services:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```
   
4. Initialize the database structure:
   ```bash
   ./migrate.sh
   ```
   
5. (Optional) Seed the database with initial data:
   ```bash
   ./seed.sh
   ```

### Production Configuration
Key differences in production mode:
- Frontend is built as static files and served by Vite's preview server
- Backend runs in production mode with optimized settings
- More restrictive database access
- Lower log verbosity
- Containers configured to restart automatically

### Database Migration Strategy
The application uses Sequelize migrations to manage database schema changes:

1. Database migrations are defined in the `backend/src/db/migrations` directory
2. Migrations are versioned and tracked in a special table in the database
3. Running `./migrate.sh` applies any pending migrations in sequential order
4. Migrations are designed to be incremental and non-destructive to existing data

For developing new migrations:
1. Create a migration file using Sequelize CLI:
   ```bash
   docker compose exec backend npx sequelize-cli migration:generate --name add-new-field
   ```
2. Edit the migration file to define both the 'up' (apply change) and 'down' (revert change) operations
3. Test the migration in development
4. Include in deployment process for production

When deploying updates with database changes:
1. Pull the latest code
2. Rebuild and restart containers
3. Run `./migrate.sh` to apply any new migrations
4. Database schema will be updated without data loss

### Backup Strategy
- Implement regular database backups through volume snapshots:
  ```bash
  docker volume ls  # Identify the postgres volume
  docker run --rm -v one-on-one-log_postgres_data:/data -v $(pwd)/backup:/backup alpine tar -czf /backup/postgres-backup-$(date +%Y%m%d).tar.gz /data
  ```
- For restoring from backup:
  ```bash
  docker volume rm one-on-one-log_postgres_data  # Remove existing volume (make sure containers are down)
  docker volume create one-on-one-log_postgres_data
  docker run --rm -v one-on-one-log_postgres_data:/data -v $(pwd)/backup:/backup alpine sh -c "cd /data && tar -xzf /backup/postgres-backup-YYYYMMDD.tar.gz --strip 1"
  ```
- Best practice: Schedule regular backups and maintain a retention policy

### Production Maintenance
- Check container status: `docker compose ps`
- View logs: `docker compose logs`
- Restart services: `docker compose restart [service_name]`
- Update application: 
  ```bash
  git pull
  docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
  ./migrate.sh
  ```

## Troubleshooting

### Common Issues

#### Application won't start
1. Check if Docker is running
2. Verify ports 3000, 5432, and 8888 are available
3. Check logs with `docker compose logs`

#### Database connection errors
1. Verify PostgreSQL container is running
2. Check database credentials in `.env`
3. Ensure database initialization script ran successfully

#### Frontend API connection issues
1. Verify backend is running and accessible
2. Check proxy configuration in `vite.config.js`
3. Review CORS settings in backend and environment variables

#### Testing issues
1. Make sure containers are running with `docker compose ps`
2. If tests fail with "command not found" errors, run `./install-deps.sh` to ensure dependencies are installed
3. For port conflicts during tests, check that the test environment is properly set to use different ports

### Debug Strategies
- Backend logs: `docker compose logs backend`
- Frontend logs: Browser console or `docker compose logs frontend`
- Database logs: `docker compose logs db`
- Run tests with verbose output: `./test-backend.sh --verbose` or `./test-frontend.sh --verbose`

### Resetting the Environment
If needed, reset the entire development environment:
```bash
./setup.sh --reset
```
This will remove all containers and volumes, giving you a clean slate.
