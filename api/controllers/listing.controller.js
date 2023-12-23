import Listing from "../models/listing.model.js";
import { catchAsync } from "../util/catchAsync.js";

export const creatListing = catchAsync(async (req, res, next) => {
    const listing = await Listing.create(req.body)
    res.status(201).json(listing);
})