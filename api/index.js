import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import forgotPasswordRouter from './routes/forgotPassword.route.js'
import otpRouter from './routes/otp.route.js'
import cookieParser from 'cookie-parser';
import path from 'path'
dotenv.config()


const DB = process.env.MONGODB_URL.replace('<PASSWORD>', process.env.MONGODB_PASSWORD)
mongoose.connect(DB)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
})

const __dirname = path.resolve();

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use('/api/listing', listingRouter)
app.use('/api/forgot-password', forgotPasswordRouter)
app.use('/api/otp', otpRouter)


app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html' ))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})
app.listen(3000, () => {
    console.log('Sever listening on port 3000');
})