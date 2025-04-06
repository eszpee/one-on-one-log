# One-on-One Log

A contact management system for tracking one-on-one meetings. Designed for Engineering Managers, coaches, and consultants to keep track of their professional contacts and 1:1 conversations. The application allows users to store, view, edit, and organize contact information in a simple and intuitive interface that works well on both desktop and mobile devices.

## Development Setup

This project uses Docker Compose for local development with hot reloading for both frontend and backend.

### Prerequisites

- Docker and Docker Compose
- Git

### Getting Started

1. Clone the repository and navigate to the project directory
2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

4. Start the development server:
   ```bash
   ./dev.sh
   ```

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

### Accessing the Application

- Frontend: http://localhost:8888
- Backend API: http://localhost:3000
- Database: PostgreSQL on port 5432

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

## Project Structure

- `frontend/` - React application with Vite
- `backend/` - Express.js API
- `docker-compose.yml` - Development environment configuration
- `docker-compose.prod.yml` - Production environment configuration

### Documentation

- `README.md` - This file, contains basic setup and usage instructions
- `PROJECT_DESCRIPTION.md` - Detailed project requirements and features
- `IMPLEMENTATION_PLAN.md` - Step-by-step development plan following TDD
- `CLAUDE.md` - Comprehensive technical documentation
- `TESTING.md` - Detailed testing guide and best practices

