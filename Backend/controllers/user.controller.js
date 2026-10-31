import { User } from "../models/user_model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dataUri from "../config/datauri.js";
import cloudinary from "../config/cloudanary.js"

// register a new user
export const register = async (req, res) => {
    try {
        const { username, email, phoneNumber, password, role } = req.body;
        if (!username || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false,
            });
        }

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "Profile image is required",
                success: false,
            });
        }

        const fileuri = dataUri(file);
        const cloudinaryResponse = await cloudinary.uploader.upload(fileuri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User alerady exits with this email..',
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile: {
                profilePhoto: cloudinaryResponse.secure_url,
            }
        });

        return res.status(200).json({
            message: 'Account created successfully..',
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
}
// login user
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false,
            });
        }
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password..",
                success: false,
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                message: 'Incorrect email or password..',
                success: false,
            })
        }

        // chack is role is correct or not 
        if (role !== user.role) {
            return res.status(400).json({
                message: 'Account does not exit with this role..',
                success: false,
            })
        };

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1D' });

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .json({
                message: `Welcome back ${user.username}`,
                success: true,
                user
            });

    } catch (error) {
        console.log(error);
    }
}
// log out user
export const logout = async (req, res) => {
    try {
        return res.status(200)
            .clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .json({
                message: "Logged out successfully..",
                success: true
            });
    } catch (error) {
        console.log(error);
    }
};
// update profile user
export const updateProfile = async (req, res) => {
    try {
        const { username, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // cloudanary aiyga idher 
        const fileuri = dataUri(file);
        // const cloudinaryResponse = await uploadOnCloudinary(fileuri.content);
        const cloudinaryResponse = await cloudinary.uploader.upload(fileuri.content);



        const Arrayskills = skills ? skills.split(",") : [];
        const userId = req.id; // midleware auth
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found..",
                success: false,
            })
        }

        // updating data 
        if (username) user.username = username
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = Arrayskills

        // resume comes later
        if (cloudinaryResponse) {
            user.profile.resume = cloudinaryResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }

        await user.save();

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        return res.status(200).json({
            message: "Profile updated successfully...",
            user,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}