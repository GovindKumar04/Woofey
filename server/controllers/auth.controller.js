const { User } = require("../model/user.model.js");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { options } = require("../utils/httpOption.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, number, password } = req.body;

  if ([name, email, number, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All field are required");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { number }] });
  if (existingUser) throw new ApiError(400, "user already exist");

  const user = await User.create({
    name,
    email,
    number,
    password,
  });

  if (!user) throw new ApiError(500, "Problem creating user");

  res
    .status(200)
    .json({ msg: `${name} your profile succesfully created`, user });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, number, password } = req.body;

  if (!(email || number) || !password) {
    throw new ApiError(400, "All field are required");
  }

  const user = await User.findOne({ $or: [{ email }, { number }] });
  if (!user) throw new ApiError(400, "user not found");

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = user.genrateAccessToken();
  const refreshToken = user.genrateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ msg: `welcome back ${user.name} `, user });
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, number, email, password } = req.body;

  if (!name && !number && !email && !password)
    throw new ApiError(401, "Nothing to update");

  const user = req.user;

  if (number && number !== user.number) {
    const existingUser = await User.findOne({ number });
    if (existingUser) throw new ApiError(401, "this number already exist");
    user.number = number;
  }

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(401, "this email already exist");
    user.email = email;
  }

  if (name) user.name = name;
  if (password) user.password = password;

  await user.save();

  return res.status(200).json({ msg: "user updated succesfully" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "user not found");

  await User.deleteOne({ _id: user._id });

  return res.status(200).json({ msg: "user deleted succesfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  user.refreshToken = "";
  await user.save({ validateBeforeSave: true });

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ msg: "Logged out successfully" });
});

const loggedInUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user)
    return res.status(401).json({ user: "No user found" });

  return res.status(200).json({ user });
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
  loggedInUser,
};