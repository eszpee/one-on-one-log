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

1. Clone the repository
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

### Accessing Local Development Services

- Frontend: http://localhost:8888
- Backend API: http://localhost:3000
- Database: PostgreSQL on port 5432 (default credentials in .env.development)

## Directory Structure

```
one-on-one-log/
├── backend/                  # Express.js API server
│   ├── init-scripts/         # Database initialization scripts
│   │   └── init-db.sql       # Creates database and user
│   ├── src/                  # Source code
│   │   └── index.js          # Main entry point
│   ├── Dockerfile            # Development Docker configuration
│   ├── Dockerfile.prod       # Production Docker configuration
│   └── package.json          # Node.js dependencies
│
├── frontend/                 # React application
│   ├── src/                  # Source code
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Entry point
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
└── dev.sh                    # Development server script
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
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`

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
1. Create and configure `.env` based on `.env.production`
2. Start services:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

### Production Configuration
Key differences in production mode:
- Frontend is built as static files and served by Vite's preview server
- Backend runs in production mode with optimized settings
- More restrictive database access
- Lower log verbosity

### Database Migration Strategy
For database changes:
1. Create a migration script
2. Apply it to development environment for testing
3. Include in deployment process for production

### Backup Strategy
- Implement regular database backups through volume snapshots
- Maintain backup retention policy according to data importance

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

### Debug Strategies
- Backend logs: `docker compose logs backend`
- Frontend logs: Browser console or `docker compose logs frontend`
- Database logs: `docker compose logs db`

### Resetting the Environment
If needed, reset the entire development environment:
```bash
./setup.sh --reset
```
This will remove all containers and volumes, giving you a clean slate.
