const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/api-error');
const logger = require('../utils/logger');

const isTrustedError = (err) => {
  if (err instanceof ApiError) {
    return err.isOperational;
  }
  return false;
};

const handleError = async (err) => {
  logger.fatal(`Uncaught Exception: ${err.message}`, { stack: err.stack });
  if (!isTrustedError(err)) {
    // TODO: Send an email to the developer
  }
};

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack, method: req.method, url: req.originalUrl });

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Validation Error',
      message: Object.values(err.errors).map(e => e.message).join(', '),
      isOperational: true
    });
  }

  // Handle Mongoose Cast Errors (Invalid ObjectId format)
  if (err.name === 'CastError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Invalid ID Format',
      message: `Invalid ID: ${err.value}`,
      isOperational: true
    });
  }

  // Handle MongoDB Duplicate Key Errors
  if (err.code === 11000) {
    return res.status(StatusCodes.CONFLICT).json({
      error: 'Duplicate Key Error',
      message: `Duplicate value for ${Object.keys(err.keyValue).join(', ')}`,
      isOperational: true
    });
  }

  // If it's an instance of ApiError, use its properties
  if (err instanceof ApiError) {
    return res.status(err.httpCode).json({
      error: err.name,
      message: err.message,
      isOperational: err.isOperational
    });
  }

  // Handle unexpected errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error',
    message: err.message,
    isOperational: false,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}), // Include stack in dev mode
  });
};

module.exports = { errorHandler, handleError, isTrustedError };
