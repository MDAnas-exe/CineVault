const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
    ...(err.details && { errors: err.details } &&
      process.env.NODE_ENV === "development"),
  });
};

export default errorHandler;
