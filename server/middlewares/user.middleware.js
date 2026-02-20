const { User } = require("../model/user.model.js");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");

const verifyUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) throw new ApiError(401, "No logged in user exist");

  const decodeToken = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  const user = await User.findById(decodeToken._id);

  if (!user)
    throw new ApiError(401, "there is no authorized user found");

  req.user = user;
  next();
});

module.exports = { verifyUser };