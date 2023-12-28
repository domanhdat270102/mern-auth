import express from 'express'
import { sendOTP, verifyOTP } from '../controllers/otp.controller.js';

const router = express.Router();

router.post('/verify', verifyOTP)
router.post('/', async (req, res) => {
    try {
        const {email, subject, message, duration} = req.body
        const createOTP = await sendOTP({
            email,
            subject,
            message,
            duration
        })
        res.status(200).json(createOTP)
    }catch (error) {
        res.status(400).send(error.message)
    }
})
export default router