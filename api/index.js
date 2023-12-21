import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
dotenv.config()


const DB = process.env.MONGODB_URL.replace('<PASSWORD>', process.env.MONGODB_PASSWORD)
mongoose.connect(DB)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
})
const app = express();

app.use("/api/user", userRouter)
app.listen(3000, () => {
    console.log('Sever listening on port 3000');
})