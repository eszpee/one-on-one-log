/**
 * Custom error class for "not found" errors
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

/**
 * Custom error class for validation errors
 */
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

/**
 * Determine the appropriate status code for an error
 * @param {Error} error - The error object
 * @returns {number} The HTTP status code
 */
const getStatusCode = (error) => {
  if (error.statusCode) {
    return error.statusCode;
  }
  
  // Check for Sequelize errors
  if (error.name === 'SequelizeValidationError' || 
      error.name === 'SequelizeUniqueConstraintError') {
    return 400;
  }
  
  if (error.name === 'SequelizeDatabaseError') {
    return 500;
  }
  
  // Default to 500 for unknown errors
  return 500;
};

module.exports = {
  NotFoundError,
  ValidationError,
  getStatusCode
};
