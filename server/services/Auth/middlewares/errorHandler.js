import { ApiError } from "../utils/ApiError.js";

// Central error handler: converts thrown errors into consistent JSON
// so the frontend can always read `error.response.data.msg`.
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Normalize JWT errors into 401 ApiErrors
  if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token");
  } else if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token expired");
  } else if (err.name === "ValidationError") {
    // Mongoose schema validation (e.g. bad phone/email format)
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, messages.join(", "), messages);
  } else if (err.code === 11000) {
    // Mongoose duplicate key
    const field = Object.keys(err.keyValue || {})[0] || "field";
    error = new ApiError(400, `${field} already exists`);
  } else if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    error = new ApiError(statusCode, err.message || "Something went wrong");
  }

  // Only log genuine server errors loudly. Expected client errors (4xx,
  // e.g. the "not logged in" auth check on page load) stay quiet.
  if (error.statusCode >= 500) {
    console.error("❌", error.statusCode, error.message);
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("·", error.statusCode, error.message);
  }

  return res.status(error.statusCode).json({
    success: false,
    msg: error.message,
    errors: error.errors,
  });
};

export { errorHandler };
