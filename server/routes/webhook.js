// import express from 'express';
// import Stripe from 'stripe';
// import Order from '../models/order.model.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (err) {
//         console.log(`Webhook Error: ${err.message}`);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the checkout.session.completed event
//     if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;

//         // Create an order in the database
//         const order = await Order.create({
//             user: session.client_reference_id, // Assuming you pass user ID as client_reference_id
//             items: session.display_items.map(item => ({
//                 product: item.custom.product,
//                 name: item.custom.name,
//                 quantity: item.quantity,
//                 price: item.amount / 100, // Convert from cents to the base currency
//                 image: item.image,
//             })),
//             totalAmount: session.amount_total / 100,
//             paymentStatus: 'paid',
//         });

//         console.log('Order created:', order);
//     }

//     res.json({ received: true });
// });

// export default router;
