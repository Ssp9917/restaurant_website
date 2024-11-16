// controllers/authController.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';


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


        // send Email
        await sendEmail(
            newUser.email,
            "Welcome to Zomato",
            `
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333;
                  }
                  .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                    background-color: #ff4c4c;
                    color: #fff;
                    padding: 15px;
                    border-radius: 8px 8px 0 0;
                    text-align: center;
                  }
                  .header h2 {
                    margin: 0;
                    font-size: 24px;
                  }
                  .content {
                    padding: 20px;
                    line-height: 1.6;
                  }
                  .content p {
                    margin: 10px 0;
                  }
                  .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 30px;
                  }
                  .footer a {
                    color: #ff4c4c;
                    text-decoration: none;
                  }
                  .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #ff4c4c;
                    color: #fff;
                    border-radius: 5px;
                    text-decoration: none;
                    margin-top: 20px;
                    font-weight: bold;
                  }
                  .button:hover {
                    background-color: #e74c3c;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>Welcome to Zomato!</h2>
                  </div>
          
                  <div class="content">
                    <p>Dear ${newUser.userName},</p>
                    <p>Welcome to Zomato! We're delighted to inform you that your account has been successfully created. You are now part of our community.</p>
          
                    <p>Thank you for joining us. We look forward to serving you and providing you with a great experience.</p>
          
                  </div>
          
                  <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Zomato. All rights reserved.</p>
                    <p><a href="http://zomato.com">Visit our website</a></p>
                  </div>
                </div>
              </body>
            </html>
            `
        );


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
export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find();

        if (users) {
            res.status(200).json({ message: "get all users successfully", users: users })
        }


    } catch (error) {
        console.log("Error in get All users", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
