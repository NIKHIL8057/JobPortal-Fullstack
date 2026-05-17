import { Mentor } from "../models/mentor.model.js";
import { MentorRequest } from "../models/mentorRequest.model.js";
import nodemailer from "nodemailer";

// mentors get
export const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find({ available: true });
        res.status(200).json({
            success: true,
            mentors
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Mentor register
export const registerMentor = async (req, res) => {
    try {
        const { name, email, skills, experience, bio, zoomLink } = req.body;

        // const existing = await Mentor.findOne({ email });
        // if (existing) {
        //     return res.status(400).json({ success: false, message: "Mentor already exists" });
        // }

        // Correct ✅ - userId se check
        const existing = await Mentor.findOne({ userId: req.id });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "You are already registered as a mentor!"
            });
        }

        const mentor = await Mentor.create({
            name, email, skills, experience, bio, zoomLink,
            userId: req.id
        });

        res.status(201).json({ success: true, mentor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// User mentor to request 
export const requestMentor = async (req, res) => {
    try {
        const { mentorId, course, message } = req.body;

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ success: false, message: "Mentor not found" });
        }

        // Request save karo
        const request = await MentorRequest.create({
            userId: req.id,
            mentorId,
            course,
            message
        });

        // Email bhejo mentor ko
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: mentor.email,
            subject: "New Mentorship Request!",
            html: `
                <h2>Naya Mentorship Request Aaya Hai!</h2>
                <p><b>Course:</b> ${course}</p>
                <p><b>Message:</b> ${message}</p>
                <p>Job Portal pe login karke respond karein.</p>
            `
        });

        res.status(200).json({ success: true, message: "Request sent successfully!", request });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// delete mentor
export const deleteMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findOne({ userId: req.id });
        
        if (!mentor) {
            return res.status(404).json({ 
                success: false, 
                message: "Mentor not found!" 
            });
        }

        await Mentor.findByIdAndDelete(mentor._id);

        res.status(200).json({ 
            success: true, 
            message: "Mentor profile deleted successfully!" 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};