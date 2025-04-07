const { sendError } = require('../utils/apiResponse');
const { getStatusCode } = require('../utils/errorHandler');

/**
 * Global error handling middleware
 * Catches all unhandled errors in the request processing chain
 */
const errorHandler = (err, req, res, next) => {
  console.error(`Error processing ${req.method} ${req.path}:`, err);
  
  const statusCode = getStatusCode(err);
  const message = statusCode === 500 
    ? 'An unexpected error occurred' 
    : err.message;
  
  sendError(res, 'Request failed', message, statusCode);
};

module.exports = {
  errorHandler
};
