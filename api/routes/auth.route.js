import express from 'express'
import {signup, signin, google, signout} from '../controllers/auth.controller.js'
import { isLoggedIn } from '../util/verifyUser.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', google)
router.get('/signout', signout)
router.get('/isLogin', isLoggedIn);
export default router