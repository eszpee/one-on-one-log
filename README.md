# One-on-One Log

A contact management system for tracking one-on-one meetings.

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

### Accessing the Application

- Frontend: http://localhost:8888
- Backend API: http://localhost:3000
- Database: PostgreSQL on port 5432

## Project Structure

- `frontend/` - React application with Vite
- `backend/` - Express.js API
- `docker-compose.yml` - Development environment configuration
- `docker-compose.prod.yml` - Production environment configuration

