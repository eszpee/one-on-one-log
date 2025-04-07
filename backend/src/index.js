require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./db');
const contactRoutes = require('./routes/contacts');
const { errorHandler } = require('./middleware/errorMiddleware');

// Initialize Express app
const app = express();
const PORT = process.env.API_PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to One-on-One Log API',
    endpoints: [
      '/api',
      '/api/health',
      '/api/contacts'
    ]
  });
});

// Simple Hello World route
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from One-on-One Log API!',
    status: 'running',
    environment: process.env.NODE_ENV
  });
});

// Health check route
app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({ 
    status: 'OK',
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

// Register contact routes
app.use('/api/contacts', contactRoutes);

// Global error handler - must be registered after all routes
app.use(errorHandler);

// Start the server only if not in test mode
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

// For testing, we'll export the app without starting the server
module.exports = { app, server };
