FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "dev"]
