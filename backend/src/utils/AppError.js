// A thrown AppError carries its own HTTP status, so errorHandler.js can
// read err.statusCode/err.message directly instead of every controller
// building its own res.status(...).json(...) by hand.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
