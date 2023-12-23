import express from 'express';
import { creatListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../util/verifyUser.js';

const router = express.Router()

router.post('/create', verifyToken, creatListing)
export default router