const { sendError } = require("../utils/response");
const HTTP          = require("../constants/httpStatus");
const MESSAGES      = require("../constants/messages");

/**
 * Global Express error handler.
 * Must be registered LAST in app.js (after all routes).
 *
 * Handles:
 *  - AppError  (operational, known errors)
 *  - Mongoose validation / cast / duplicate errors
 *  - JWT errors
 *  - Unexpected errors (hide details in production)
 */
const errorHandler = (err, req, res, _next) => {
  // ── Mongoose: invalid ObjectId ───────────────────────────────────────────
  if (err.name === "CastError") {
    return sendError(res, HTTP.BAD_REQUEST, `Invalid ${err.path}: ${err.value}`);
  }

  // ── Mongoose: duplicate key ───────────────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, HTTP.CONFLICT, `${field} is already in use`);
  }

  // ── Mongoose: validation error ────────────────────────────────────────────
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return sendError(res, HTTP.BAD_REQUEST, messages.join(". "));
  }

  // ── JWT: invalid signature ────────────────────────────────────────────────
  if (err.name === "JsonWebTokenError") {
    return sendError(res, HTTP.UNAUTHORIZED, MESSAGES.TOKEN_INVALID || "Invalid token");
  }

  // ── JWT: expired ──────────────────────────────────────────────────────────
  if (err.name === "TokenExpiredError") {
    return sendError(res, HTTP.UNAUTHORIZED, "Token expired, please log in again");
  }

  // ── Operational (AppError) ────────────────────────────────────────────────
  if (err.isOperational) {
    return sendError(res, err.statusCode, err.message);
  }

  // ── Unexpected / programming error ────────────────────────────────────────
  console.error("💥 UNEXPECTED ERROR:", err);

  const message =
    process.env.NODE_ENV === "production"
      ? MESSAGES.SERVER_ERROR
      : err.message;

  return sendError(res, HTTP.INTERNAL_SERVER_ERROR, message);
};

module.exports = errorHandler;