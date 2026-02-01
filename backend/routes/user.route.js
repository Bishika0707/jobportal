import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";



const router = express.Router();
router.post("/register", singleUpload, register);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;