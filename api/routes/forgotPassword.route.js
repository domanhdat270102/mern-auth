import express from 'express'
import {resetUserPassword, sendPasswordResetOTPEmail} from '../controllers/forgotPassword.controller.js'
const router = express.Router();

router.post('/', sendPasswordResetOTPEmail)
router.post('/reset', resetUserPassword)
export default router