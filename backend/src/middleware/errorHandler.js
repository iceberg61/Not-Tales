// Central error handler — every controller should call next(err) on failure
module.exports = function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Server error",
  });
};
