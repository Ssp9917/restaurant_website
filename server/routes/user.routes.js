// /routes/authRoutes.js
import express from 'express';
import {
    logout,
    signup,
    login,
    getAllUsers,
} from '../controllers/user.controller.js';

const authRouter = express.Router();

// Signup Route
authRouter.post('/signup', signup);
// Login Route
authRouter.post('/login', login);
// Logout Route
authRouter.get('/logout', logout);
// get all user
authRouter.get('/getAllUser',getAllUsers)

export default authRouter;
