/**
 * Operational error with an HTTP status code.
 * Thrown inside services/controllers for known, expected errors.
 * The global error handler checks isOperational to decide
 * whether to leak message details to the client.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;