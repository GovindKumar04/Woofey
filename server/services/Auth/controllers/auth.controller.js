import jwt from "jsonwebtoken";
import { User } from "../services/config/model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  options,
  accessCookieOptions,
  refreshCookieOptions,
} from "../utils/httpOption.js";
import {
  createSession,
  getSession,
  deleteSession,
  deleteAllSessions,
  rotateSession,
} from "../utils/session.utils.js";

// Issues a stateless access token + a Redis-backed refresh session, and sets cookies.
const issueAuth = async (user, res, req) => {
  const accessToken = user.generateAccessToken();
  const { refreshToken } = await createSession(user, {
    ip: req?.ip,
    userAgent: req?.get?.("user-agent"),
  });

  res
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions);
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone_number, password } = req.body;

  if ([name, email, phone_number, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { phone_number }],
  });
  if (existingUser) throw new ApiError(400, "User already exists");

  const user = await User.create({ name, email, phone_number, password });

  // Log in immediately so the store + cookies stay consistent.
  await issueAuth(user, res, req);

  res
    .status(201)
    .json({ msg: `${name}, your profile was successfully created`, user });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, phone_number, password } = req.body;

  if (!(email || phone_number) || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({
    $or: [{ email }, { phone_number }],
  }).select("+password");

  if (!user) throw new ApiError(400, "User not found");
  if (user.status !== "active") {
    throw new ApiError(403, "Account is not active");
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) throw new ApiError(400, "Invalid credentials");

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  await issueAuth(user, res, req);

  res.status(200).json({ msg: `Welcome back ${user.name}`, user });
});

// Silent renewal: validate the refresh JWT + its Redis session, then rotate.
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken;
  if (!incomingToken) throw new ApiError(401, "No refresh token provided");

  let decoded;
  try {
    decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const session = await getSession(decoded.jti);
  if (!session) throw new ApiError(401, "Session expired or revoked");

  const user = await User.findOne({ user_id: decoded.user_id });
  if (!user || user.status !== "active") {
    throw new ApiError(401, "User is no longer active");
  }

  const accessToken = user.generateAccessToken();
  const { refreshToken } = await rotateSession(decoded.jti, user, {
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  res
    .status(200)
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json({ msg: "Token refreshed", user });
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, phone_number, email, password } = req.body;

  if (!name && !phone_number && !email && !password)
    throw new ApiError(400, "Nothing to update");

  const user = await User.findOne({ user_id: req.user.user_id });
  if (!user) throw new ApiError(404, "User not found");

  if (phone_number && phone_number !== user.phone_number) {
    const exists = await User.findOne({ phone_number });
    if (exists) throw new ApiError(409, "This phone number already exists");
    user.phone_number = phone_number;
  }

  if (email && email !== user.email) {
    const exists = await User.findOne({ email });
    if (exists) throw new ApiError(409, "This email already exists");
    user.email = email;
  }

  if (name) user.name = name;

  if (password) {
    user.password = password;
    // Force re-login everywhere after a credential change.
    await deleteAllSessions(user.user_id);
  }

  await user.save();

  res.status(200).json({ msg: "User updated successfully", user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;

  await User.deleteOne({ user_id: userId });
  await deleteAllSessions(userId);

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ msg: "User deleted successfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
  // Revoke just this device's session.
  const incomingToken = req.cookies?.refreshToken;
  if (incomingToken) {
    try {
      const decoded = jwt.verify(
        incomingToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      await deleteSession(decoded.jti, decoded.user_id);
    } catch {
      // token already invalid — nothing to revoke
    }
  }

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ msg: "Logged out successfully" });
});

// Revoke every session (all devices).
const logoutAll = asyncHandler(async (req, res) => {
  await deleteAllSessions(req.user.user_id);

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ msg: "Logged out from all devices" });
});

const loggedInUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ user_id: req.user.user_id });
  if (!user) throw new ApiError(401, "No user found");

  res.status(200).json({ user });
});

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  updateUser,
  deleteUser,
  logoutUser,
  logoutAll,
  loggedInUser,
};
