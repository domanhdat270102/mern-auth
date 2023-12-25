import User from '../models/user.model.js'
import {catchAsync} from '../util/catchAsync.js'
import { errorHandler } from '../util/error.js'
import Listing from '../models/listing.model.js'
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

export const getUserListings = catchAsync (async (req, res, next) => {
    if (req.user.id === req.params.id) {
        const listings = await Listing.find({useRef: req.params.id})
        res.status(200).json(listings)
    } else {
        return next(errorHandler(401, 'You can only view your own listings!'))
    }
})

export const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) return next(errorHandler(404, 'User not found!'))
    const {password: pass, ...rest} = user._doc
    res.status(200).json(rest)
})
