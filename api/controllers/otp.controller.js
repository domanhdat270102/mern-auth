import OTP from "../models/otp.model.js";
import { catchAsync } from "../util/catchAsync.js";
import generateOTP from "../util/generateOTP.js";
import { hashData, verifyHashedData } from "../util/hashData.js";
import sendEmail from "../util/sendEmail.js";
const {AUTH_EMAIL} = process.env;

export const verifyOTP = catchAsync(async (req, res, next) => {
        let { email, otp} = req.body;

        if (!(email && otp)) {
            throw Error("Provide values for email, otp")
        }

        // ensure otp record exists
        const matchedOTPRecord = await OTP.findOne({
            email,
        })

        if (!matchedOTPRecord) {
            throw Error("No otp records found")
        }

        const {expiresAt} = matchedOTPRecord

        // checking for expired code
        if (expiresAt < Date.now()) {
            await OTP.deleteOne({email})
            throw Error("Code has expired. Request for a new one")
        }

        // not expired yet, verify value
        const hashedOTP = matchedOTPRecord.otp
        const validOTP = await verifyHashedData(otp, hashedOTP)
        res.status(200).json({
            valid: validOTP
        })
})

export const deleteOTP = catchAsync(async (email) => {
    await OTP.deleteOne({email})
})        


export const sendOTP = async ({email, subject, message, duration = 1}) => {
    try {
        if (!(email && subject && message)) {
            throw Error("Provide values for email and subject and message")
        }
        // clear any old record
        await OTP.deleteOne({email})
        const generatedOTP = await generateOTP()

        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style="color:tomato; font-size:25px;letter-spacing:2px"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b></p>`
        }

        await sendEmail(mailOptions)
        const hashedOTP = await hashData(generatedOTP)
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration
        })

        const createdOTPRecord = await newOTP.save()
        return createdOTPRecord
    } catch (error) {
        throw error
    }
}