import User from '../models/user.model.js'
import {catchAsync} from '../util/catchAsync.js'
import { errorHandler } from '../util/error.js'
import bcrypt from 'bcryptjs'
export const test = (req,res) => {
    res.json({
        message: 'API is working'
    })
}

export const updateUser = catchAsync( async (req, res) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'you can only update your own account!'));
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        }
    }, {
        new: true
    })

    const {password, ...rest} = updateUser._doc
    res.status(200).json(rest)
})

export const deleteUser = catchAsync (async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account.'))
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token')
    res.status(200).json('User has been deleted!')
})