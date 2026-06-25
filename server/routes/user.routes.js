import express from "express";
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  deleteUser,
  updateUser,
  logoutUser,
  logoutAll,
  loggedInUser,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/user.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshAccessToken);

router.route("/delete").post(verifyUser, deleteUser);
router.route("/update").post(verifyUser, updateUser);
router.route("/logout").post(verifyUser, logoutUser);
router.route("/logout-all").post(verifyUser, logoutAll);
router.route("/loggedInUser").get(verifyUser, loggedInUser);

export { router };
