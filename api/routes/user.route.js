import express from 'express';
import {test, updateUser, deleteUser, getUserListings} from '../controllers/user.controller.js'
import { verifyToken } from '../util/verifyUser.js';

const router = express();

router.post('/', test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);

export default router