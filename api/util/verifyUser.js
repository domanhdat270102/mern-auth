import jwt from 'jsonwebtoken';
import {promisify} from 'util'
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        req.user = user
        next();
    })
}

export const isLoggedIn = async (req, res, next) => {
    //1) Getting token and check of it's there
    if (req.cookies.access_token) {
      try {
        //2) verification token
        const decoded = await promisify(jwt.verify)(
          req.cookies.access_token,
          process.env.JWT_SECRET
        );
        console.log(decoded);
        //3) check if user stall exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
        res.status(200).json(currentUser)
      } catch (err) {
        return next();
      }
    }
    return next(errorHandler(401, 'Not logged in'))
  };