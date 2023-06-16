import express from "express";
import { signup, login, logout, forgotPassword, passwordReset, getLoggedInUserDetails, changePassword, updateUser } from "../controller/userController.js";
import { isLoggedIn } from "../middleware/user.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userdashboard").get(isLoggedIn,getLoggedInUserDetails);
router.route("/changepassword").get(isLoggedIn, changePassword);
router.route("/userdashboard/update").post(isLoggedIn, updateUser);

export default router;
