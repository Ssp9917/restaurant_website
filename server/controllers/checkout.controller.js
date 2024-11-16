import Stripe from 'stripe';
import dotenv from 'dotenv';

import User from '../models/user.model.js';

dotenv.config(); // Load environment variables

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY; // Get your secret key from environment variables
const stripe = new Stripe(STRIPE_SECRET_KEY); // Initialize Stripe with the secret key


export const createPaymentIntent = async (req, res) => {
    try {
        const { userId, items } = req.body; // Extract userId and items from the request body

        // Fetch user's email from the database using userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const email = user.email; // Retrieve the user's email
        const userName = user.userName

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            line_items: items.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                            images: [`${process.env.BACKEND_URL}/${item.image.replace(/\\/g, '/')}`],
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                userId, // Attach the userId here
                email,  // Add the email to metadata
                userName
            },
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json({ id: session.id });
    } catch (err) {
        console.error("Error creating payment intent:", err); // Log error for debugging
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

