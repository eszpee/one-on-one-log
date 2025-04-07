/**
 * Utility functions for consistent API responses
 */

/**
 * Create a success response
 * @param {object} res - Express response object
 * @param {string} message - Success message
 * @param {*} data - Response data
 * @param {number} statusCode - HTTP status code (default: 200)
 */
const sendSuccess = (res, message, data, statusCode = 200) => {
  res.status(statusCode).json({
    message,
    status: 'success',
    data
  });
};

/**
 * Create an error response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 * @param {string} error - Detailed error information
 * @param {number} statusCode - HTTP status code (default: 500)
 */
const sendError = (res, message, error, statusCode = 500) => {
  res.status(statusCode).json({
    message,
    status: 'error',
    error
  });
};

module.exports = {
  sendSuccess,
  sendError
};
