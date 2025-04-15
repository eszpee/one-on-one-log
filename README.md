# One-on-One Log

A contact management system for tracking one-on-one meetings. Designed for Engineering Managers, coaches, and consultants to keep track of their professional contacts and 1:1 conversations. The application allows users to store, view, edit, and organize contact information in a simple and intuitive interface that works well on both desktop and mobile devices.

## Features

- **Contact List Page**: View all contacts in a sortable, searchable table format
- **Contact Detail Page**: Access comprehensive contact profiles with inline editing
- **Search**: Find contacts quickly with real-time filtering
- **Sorting**: Organize contacts by different fields
- **Responsive Design**: Works on both desktop and mobile devices

## Installation (Production)

### Prerequisites

- Docker and Docker Compose

### Getting Started

1. Clone the repository and navigate to the project directory

2. Create an environment file:
   ```bash
   cp .env.production .env
   ```

3. Edit the `.env` file to set your preferred passwords and configuration

4. Start the application in production mode:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

5. Initialize the database:
   ```bash
   ./migrate.sh
   ```

6. (Optional) Seed the database with initial data:
   ```bash
   ./seed.sh
   ```

7. Access the application at http://localhost:8888

### Updates

When updating to a new version:

1. Pull the latest code:
   ```bash
   git pull
   ```

2. Rebuild and restart the containers:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
   ```

3. Apply any database changes:
   ```bash
   ./migrate.sh
   ```

## Accessing the Application

- Frontend (Web Interface): http://localhost:8888
- API (if needed): http://localhost:3000

## Development

For details on setting up a development environment, contributing to the project, or running tests, please refer to `CLAUDE.md`.

## Documentation

- `README.md` - This file, contains installation and usage instructions
- `PROJECT_DESCRIPTION.md` - Detailed project requirements and features
- `CLAUDE.md` - Comprehensive technical documentation for developers
- `TESTING.md` - Detailed testing guide and best practices

