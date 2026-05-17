import express from "express";
import { deleteMentor, getAllMentors, registerMentor, requestMentor } from "../controllers/mentor.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/all", getAllMentors);
router.post("/register",isAuth,registerMentor);
router.post("/request", isAuth, requestMentor);
router.delete("/delete", isAuth, deleteMentor);

export default router;