require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.API_PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Simple Hello World route
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from One-on-One Log API!',
    status: 'running',
    environment: process.env.NODE_ENV
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
