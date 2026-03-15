import { Application } from "../models/Application.model.js";
import { Job } from "../models/job_model.js";

// apply jobs api
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            })
        }

        // check if the user is already applied the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: true
            })
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}
// get applied jobs 
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        })
        if(!application) {
            return res.status(400).json({
                message:"No Application",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
// admin see apply jobs 
export const getApplicant = async(req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"application",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        })
        if(!job) {
            return res.status(400).json({
                message:"JOb not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success:true 
        })
    } catch (error) {
        console.log(error);
    } 
}
// update status    
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicantId = req.params.id;

        if(!status) {
            returnres.status(400).json({
                message:"Status is required",
                success:true
            })
        }
        // find application by applicant id
        const application = await Application.findOne({_id:applicantId});

        if (!application) {
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status update successfully",
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}