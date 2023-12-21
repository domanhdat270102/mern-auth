import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    const {userName, email, password} = req.body;
    const newUser = new User({userName, email, password});
    try {
        await newUser.save()
        res.status(200).json({
            message: "User created successfully"
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
};