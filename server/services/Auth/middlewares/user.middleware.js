import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Stateless: verifies the access-token signature only — no DB/Redis hit,
// so it scales to millions of requests. Claims become req.user.
const verifyUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) throw new ApiError(401, "No logged in user exist");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }

  req.user = {
    _id: decoded._id,
    user_id: decoded.user_id,
    email: decoded.email,
    role: decoded.role,
  };
  next();
});

// Route guard: authorizeRoles("admin")
const authorizeRoles = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!roles.includes(req.user?.role)) {
      throw new ApiError(403, "You do not have permission to do this");
    }
    next();
  });

export { verifyUser, authorizeRoles };
