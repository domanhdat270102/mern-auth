import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from '../util/error.js'
import {catchAsync} from '../util/catchAsync.js'
import jwt from 'jsonwebtoken'

export const signup = catchAsync(async (req, res, next) => {
    const {username, email, password} = req.body;
    const newUser = new User({username, email, password});
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

export const signin = catchAsync (async(req, res, next) => {
    const {email, password} = req.body
    const validUser = await User.findOne({email})
    if (!validUser) return next(errorHandler(404, 'User not found'))
    const validPassword = bcrypt.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
    const {password: pass, ...rest} = validUser._doc
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
})
