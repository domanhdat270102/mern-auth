import OTP from "../models/otp.model.js"
import User from "../models/user.model.js"
import { catchAsync } from "../util/catchAsync.js"
import { errorHandler } from "../util/error.js"
import { hashData } from "../util/hashData.js"
import { sendOTP, verifyOTP } from "./otp.controller.js"

export const resetUserPassword =  catchAsync(async (req, res, next) => {
            const {email, otp, newPassword} = req.body
            if (!(email && otp && newPassword)) {
                return next(errorHandler(401,"Empty credentials are not allowed"))
            }
            const validOTP = await verifyOTP({email, otp})
            if (!validOTP) {
                throw Error("Invalid code passed. Check your inbox")
            }

            const hashedNewPassword = await hashData(newPassword)

            await User.updateOne({email}, {password: hashedNewPassword})
            await OTP.deleteOne({email})
            res.status(200).json({email, passwordreset: true})
})

export const sendPasswordResetOTPEmail = catchAsync(async (req, res, next) => {
            const {email} = req.body;
            console.log(email);
            if (!email) return next(errorHandler(401, 'An email is required'))

            const existingUser = await User.findOne({email});

            if (!existingUser) return next(errorHandler(401, "There's no account for the provied email."))

            const otpDetails = {
                email,
                subject: "Password Reset",
                message: "Enter the code below to reset your password.",
                duration: 1
            }

            const createOTP = await sendOTP(otpDetails)
            res.status(200).json({
                status: 'success',
                data: {
                    createOTP
                }
            }) 
})
