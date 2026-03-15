import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getAdminJobs, getAllJobs, getJobById, jobPost } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuth,jobPost);
router.route("/get").get(isAuth,getAllJobs);
router.route("/getadminjobs").get(isAuth,getAdminJobs);
router.route("/get/:id").get(isAuth,getJobById);

export default router;