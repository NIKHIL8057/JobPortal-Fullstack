import { Job } from "../models/job_model.js";

// job post api
export const jobPost = async (req, res) => {
    try {
        const { title, description, requirement, salary, location, jobType, position, companyId, experienceLevel } = req.body;
        const userId = req.id;

        if (!title || !description || !requirement || !salary || !location || !jobType || !position || !companyId || !experienceLevel) {
            return res.status(400).json({
                message: "Somthing is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirement: Array.isArray(requirement) ? requirement : requirement.split(","),
            salary: Number(salary),
            location,
            jobType,
            position,
            company: companyId,
            experienceLevel,
            created_by: userId
        })
        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
// get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}
// get job by id 
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application",
        })

        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin created get all jobs
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        })
            .sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}