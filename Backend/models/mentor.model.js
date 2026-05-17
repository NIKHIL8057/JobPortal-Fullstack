import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    skills: [{
        type: String
    }],
    experience: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    zoomLink: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Mentor = mongoose.model("Mentor", mentorSchema);