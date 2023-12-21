import express from 'express';
import {test} from '../controllers/user.controller.js'

const router = express();

router.post('/', test)

export default router