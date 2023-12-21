import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from '../util/error.js'
import {catchAsync} from '../util/catchAsync.js'

export const signup = catchAsync(async (req, res, next) => {
    const {userName, email, password} = req.body;
    const newUser = new User({userName, email, password});
    // try {
    //     await newUser.save()
    //     res.status(200).json({
    //         message: "User created successfully"
    //     })
    // } catch (error) {
    //     next(error);
    // }
    await newUser.save()
    res.status(200).json({
        message: "User created successfully"
    })
});