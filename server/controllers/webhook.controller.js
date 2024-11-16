import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/order.model.js';
import sendEmail from '../utils/sendEmail.js';


const adminEmail = process.env.ADMIN_EMAIL;

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export const webhookHandler = async (req, res) => {
  console.log('Stripe Webhook Secret:', process.env.STRIPE_WEBHOOK_SECRET, "STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);
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

      console.log("productResponse", productResponse);
      return {
        name: productResponse.name, // Use the product name
        image: productResponse.images[0], // Use the first product image
        price: item.price.unit_amount / 100, // Convert to standard currency unit
        quantity: item.quantity, // Quantity of the item
      };
    }));

    const totalAmount = session.amount_total / 100; // Stripe uses the smallest currency unit (e.g., cents)

    const orderData = {
      userId: session.metadata.userId, // Assuming you stored userId in metadata when creating the session
      items, // Updated items array with product details
      totalAmount,
      paymentIntentId: session.payment_intent,
      paymentStatus: 'completed',
    };

    // Save the order to the database
    const order = new Order(orderData);
    await order.save();

    // Prepare order summary for email
    const orderDetails = items.map(item =>
      `Product: ${item.name}\nPrice: ₹${item.price}\nQuantity: ${item.quantity}\n`
    ).join("\n");

    // Email content for the user
    const emailContentForUser = `
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
                text-align: center;
                background-color: #00796b;
                color: #fff;
                padding: 15px;
                border-radius: 8px 8px 0 0;
              }
              .header h2 {
                margin: 0;
              }
              .content {
                padding: 20px;
                line-height: 1.6;
              }
              .content p {
                margin: 10px 0;
              }
              .order-details {
                margin-top: 20px;
                padding: 15px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 5px;
              }
              .order-details p {
                margin: 5px 0;
              }
              .total-amount {
                margin-top: 15px;
                font-size: 18px;
                font-weight: bold;
                color: #333;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 30px;
              }
              .footer a {
                color: #00796b;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Your Order!</h2>
              </div>

              <div class="content">
                <p>Dear ${session.metadata.userName},</p>

                <p>Thank you for your order! Below are the details of your purchase:</p>

                <div class="order-details">
                  <p><strong>Order Details:</strong></p>
                   ${orderDetails}
                </div>

                <div class="total-amount">
                  <p><strong>Total Amount:</strong> ₹ ${totalAmount}</p>
                </div>

                <p>We appreciate your business and hope you enjoy your products!</p>
              </div>

              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                <p><a href="http://yourcompany.com">Visit our website</a></p>
              </div>
            </div>
          </body>
        </html>
      `;

    console.log(session.metadata.email);
    // Send confirmation email to user
    await sendEmail(
      session.metadata.email, // Send email to the user
      "Order Confirmation - Your Purchase Details",
      emailContentForUser
    );

    // Prepare order summary for admin email
    const emailContentForAdmin = `
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
                text-align: center;
                background-color: #00796b;
                color: #fff;
                padding: 15px;
                border-radius: 8px 8px 0 0;
              }
              .header h2 {
                margin: 0;
              }
              .content {
                padding: 20px;
                line-height: 1.6;
              }
              .content p {
                margin: 10px 0;
              }
              .order-details {
                margin-top: 20px;
                padding: 15px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 5px;
              }
              .order-details p {
                margin: 5px 0;
              }
              .total-amount {
                margin-top: 15px;
                font-size: 18px;
                font-weight: bold;
                color: #333;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 30px;
              }
              .footer a {
                color: #00796b;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Order Received</h2>
              </div>

              <div class="content">
                <p><strong>Order Details:</strong></p>
                <p><strong>Name:</strong> ${session.metadata.userName}</p>
                <p><strong>Email:</strong> ${session.metadata.email}</p>
                

                <div class="order-details">
                  <p><strong>Products Ordered:</strong></p>
                   ${orderDetails}
                </div>

                <div class="total-amount">
                  <p><strong>Total Amount:</strong> ₹ ${totalAmount}</p>
                </div>

                <p>Please review the order details and take necessary actions.</p>
              </div>

              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                <p><a href="http://yourcompany.com">Visit our website</a></p>
              </div>
            </div>
          </body>
        </html>
      `;

    console.log('Admin email sent');
    // Send email to admin
    await sendEmail(
      adminEmail, // Replace with your admin email
      "New Order Received",
      emailContentForAdmin
    );

    console.log('Order saved to database and confirmation email sent:', order);
  } catch (error) {
    console.error('Error saving order or sending email:', error.message);
  }
};




