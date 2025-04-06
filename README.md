# One-on-One Log

One-on-One Log is a contact management system designed specifically for Engineering Managers, coaches, and consultants to keep track of their professional contacts and 1:1 conversations.

## Features

- Store and manage professional contacts
- Track 1:1 conversations
- Simple, intuitive interface
- Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: React with Vite
- **Database**: PostgreSQL
- **Deployment**: Docker Compose

## Prerequisites

- Docker and Docker Compose
- Git

## Installation

### Clone the Repository

```bash
git clone https://github.com/eszpee/one-on-one-log.git
cd one-on-one-log
```

### Setting Up Environment Variables

The application requires environment variables for configuration. There are separate configurations for development and production environments.

#### Development Mode

1. Copy the example environment file to create a development environment file:

```bash
cp .env.development .env
```

2. Review and update the variables in `.env` if needed.

#### Production Mode

1. Copy the production environment file:

```bash
cp .env.production .env
```

2. Update the environment variables in `.env` with secure credentials for production:
   - Replace `POSTGRES_PASSWORD` with a strong password
   - Review and adjust other variables as needed

### Starting the Application

#### Development Mode

For development, use:

```bash
docker-compose up --build
```

This command will:
- Build the Docker images for backend and frontend
- Start the PostgreSQL database
- Start the backend server with hot-reloading enabled
- Start the frontend development server with hot-reloading enabled

The application will be available at:
- Frontend: http://localhost:8080
- API: http://localhost:3000/api

#### Production Mode

For production, use:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

This starts the application in detached mode with production settings.

### Stopping the Application

To stop the application:

```bash
docker-compose down
```

To stop the application and remove volumes (this will delete the database data):

```bash
docker-compose down -v
```

## Development

### Project Structure

```
one-on-one-log/
├── backend/                  # Node.js API
│   ├── src/                  # Source code
│   └── Dockerfile            # Backend Docker configuration
├── frontend/                 # React client application
│   ├── src/                  # Source code
│   └── Dockerfile            # Frontend Docker configuration
├── .env.development          # Development environment variables
├── .env.production           # Production environment variables
├── .env.example              # Example environment file
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # Project documentation
```

### Running Tests

To run backend tests:

```bash
docker-compose exec backend npm test
```

To run frontend tests:

```bash
docker-compose exec frontend npm test
```

## License

[MIT](LICENSE)
