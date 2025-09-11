export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not found.`;
    err = new ErrorHandler(message, 404);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid authentication token.`;
    err = new ErrorHandler(message, 401);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Authentication token has expired.`;
    err = new ErrorHandler(message, 401);
  }
  if (err.code === 11000) {
    const message = `Duplicate value entered.`;
    err = new ErrorHandler(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
