// controllers/authController.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateTokenAndSetCookie from '../utils/generateToken.js';


// Signup Controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ userName: name, email, password: hashedPassword, provider: 'local' });

        // Save the new user to the database
        await newUser.save();

        // Generate JWT token and set it as a cookie
        const token = generateTokenAndSetCookie(newUser._id, res);

        // Send response with user data and token
        res.status(201).json({
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email
            },
            token: token // Return the token directly
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token and set it as a cookie
        const token = generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            message: 'User logged in successfully',
            user: {
                userName: user.userName, // Include only necessary fields
                email: user.email,
                _id: user._id
            },
            token: token
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Logout Handler
export const logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
}


// get all user
export const getAllUsers = async (req,res) => {
    try {
        
        const users = await User.find();

        if(users){
            res.status(200).json({message:"get all users successfully",users:users})
        }


    } catch (error) {
        console.log("Error in get All users", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
