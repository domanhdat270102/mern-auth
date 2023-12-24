import Listing from "../models/listing.model.js";
import { catchAsync } from "../util/catchAsync.js";
import { errorHandler } from "../util/error.js";

export const creatListing = catchAsync(async (req, res, next) => {
    const listing = await Listing.create(req.body)
    res.status(201).json(listing);
})

export const deleteListing = catchAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found'))
    }

    if (req.user.id !== listing.useRef) {
        return next(errorHandler(401, 'You can delete your own listings'))
    }

    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json('Listing has been deleted!')
})

export const updateListing = catchAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
        return next(errorHandler(404, 'Listing not found'));
    }

    if (req.user.id !== listing.useRef) {
        return next(errorHandler(401, 'You can delete your own listings'))
    }

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedListing)
})

export const getListing = catchAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found'));
    }
    res.status(200).json(listing)
})