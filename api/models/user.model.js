import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
    }
}, {timestamps: true})

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 12)
//     next();
// })

const User = mongoose.model('User', userSchema)

export default User