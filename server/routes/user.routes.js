import { Router } from "express";
import {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete").post(verifyUser, deleteUser);
router.route("/update").post(verifyUser, updateUser);
router.route("/logout").post(verifyUser, logoutUser);
export { router };
