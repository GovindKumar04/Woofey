const express = require("express");
const {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  logoutUser,
  loggedInUser,
} = require("../controllers/auth.controller.js");
const { verifyUser } = require("../middlewares/user.middleware.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete").post(verifyUser, deleteUser);
router.route("/update").post(verifyUser, updateUser);
router.route("/logout").post(verifyUser, logoutUser);
router.route("/loggedInUser").get(verifyUser, loggedInUser);

module.exports = { router };