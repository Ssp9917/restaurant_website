import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/order.model.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export const webhookHandler = async (req, res) => {
    console.log('Stripe Webhook Secret:', process.env.STRIPE_WEBHOOK_SECRET, "STRIPE_SECRET_KEY",process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // console.log(session)
            // Process the session, e.g., create an order
            await handleOrder(session);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
};




const handleOrder = async (session) => {
    console.log(session);

    try {
        // Fetch line items from Stripe to get the detailed information
        const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id);

        const items = await Promise.all(lineItemsResponse.data.map(async (item) => {
            // Fetch the product details using the product ID from the line item
            const productResponse = await stripe.products.retrieve(item.price.product);

            console.log("productResponse",productResponse)
            return {
                name: productResponse.name, // Use the product name
                image: productResponse.images[0], // Use the first product image
                price: item.price.unit_amount / 100, // Convert to standard currency unit
                quantity: item.quantity, // Quantity of the item
            };
        }));

        const orderData = {
            userId: session.metadata.userId, // Assuming you stored userId in metadata when creating the session
            items, // Updated items array with product details
            totalAmount: session.amount_total / 100, // Stripe uses smallest currency unit (e.g., cents)
            paymentIntentId: session.payment_intent,
            status: 'completed',
        };

        // Save the order to the database
        const order = new Order(orderData);
        await order.save();

        console.log('Order saved to database:', order);
    } catch (error) {
        console.error('Error saving order to database:', error.message);
    }
};


