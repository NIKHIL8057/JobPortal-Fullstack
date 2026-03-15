import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { singleUploader } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUploader,register);
router.route("/login").post(login);
router.route("/logout").post(logout)
router.route("/profile/update").post(isAuth,singleUploader,updateProfile);

export default router;