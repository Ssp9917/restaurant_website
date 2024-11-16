import Order from '../models/order.model.js'; // Adjust the import based on your folder structure
import User from '../models/user.model.js';

// Get all orders for the authenticated user
export const getOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming you are using middleware to set req.user
        const orders = await Order.find({ userId }); // Fetch orders for the authenticated user

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
};

// Get a single order's details by order ID
export const getSingleOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params; // Get the order ID from the request parameters
        const order = await Order.findById(orderId); // Fetch the order by its ID

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order details:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching the order details.' });
    }
};

// Get all orders for admin
export const getAllOrdersForAdmin = async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders in the database

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found.' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching all orders for admin:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
};

// Edit order status
export const editOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};


// update order status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the booking by ID
    const order = await Order.findById(id);

    // console.log(req.body, status)

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the user by userId in the booking
    const user = await User.findById(order.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the status
    order.status = status || order.status;
    await order.save();

    // Email content for confirmation
    // const emailContentForUser = `
    // <html>
    //   <head>
    //     <style>
    //       body {
    //         font-family: Arial, sans-serif;
    //         background-color: #f4f4f4;
    //         margin: 0;
    //         padding: 0;
    //         color: #333;
    //       }
    //       .container {
    //         max-width: 600px;
    //         margin: 20px auto;
    //         padding: 20px;
    //         background-color: #ffffff;
    //         border-radius: 8px;
    //         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    //       }
    //       .header {
    //         text-align: center;
    //         background-color: green;
    //         color: #fff;
    //         padding: 10px 0;
    //         border-radius: 8px 8px 0 0;
    //       }
    //       .header h2 {
    //         margin: 0;
    //       }
    //       .content {
    //         padding: 20px;
    //         line-height: 1.6;
    //       }
    //       .content p {
    //         margin: 10px 0;
    //       }
    //       .details {
    //         margin: 20px 0;
    //         padding: 15px;
    //         background-color: #f9f9f9;
    //         border: 1px solid #ddd;
    //         border-radius: 5px;
    //       }
    //       .details p {
    //         margin: 5px 0;
    //       }
    //       .footer {
    //         text-align: center;
    //         font-size: 12px;
    //         color: #777;
    //         margin-top: 30px;
    //       }
    //       .footer a {
    //         color: #5c6bc0;
    //         text-decoration: none;
    //       }
    //     </style>
    //   </head>
    //   <body>
    //     <div class="container">
    //       <div class="header">
    //         <h2>Booking Confirmation</h2>
    //       </div>
  
    //       <div class="content">
    //         <p>Dear ${user.userName},</p>
  
    //         <p>We are pleased to inform you that your booking has been confirmed. Below are the details of your booking:</p>
  
    //         <div class="details">
    //           <p><strong>Name:</strong> ${user.userName}</p>
    //           <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
    //           <p><strong>Number of persons:</strong> ${booking.person}</p>
    //           <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
    //           <p><strong>Time:</strong> ${booking.time}</p>
    //           <p><strong>Message:</strong> ${booking.message || "N/A"}</p>
    //           <p><strong>Table Number:</strong> ${booking.tableNo || "Assigned upon arrival"}</p>
    //         </div>
  
    //         <p>We look forward to serving you!</p>
    //       </div>
  
    //       <div class="footer">
    //         <p>Thank you for choosing us.</p>
    //         <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    //         <p><a href="http://yourcompany.com">Visit our website</a></p>
    //       </div>
    //     </div>
    //   </body>
    // </html>
    // `;

    // Email content for cancle booking
//     const emailContentForUserBookingCancel = `
// <html>
//   <head>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         background-color: #f4f4f4;
//         margin: 0;
//         padding: 0;
//         color: #333;
//       }
//       .container {
//         max-width: 600px;
//         margin: 20px auto;
//         padding: 20px;
//         background-color: #ffffff;
//         border-radius: 8px;
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//       }
//       .header {
//         text-align: center;
//         background-color: red;
//         color: #fff;
//         padding: 10px 0;
//         border-radius: 8px 8px 0 0;
//       }
//       .header h2 {
//         margin: 0;
//       }
//       .content {
//         padding: 20px;
//         line-height: 1.6;
//       }
//       .content p {
//         margin: 10px 0;
//       }
//       .details {
//         margin: 20px 0;
//         padding: 15px;
//         background-color: #f9f9f9;
//         border: 1px solid #ddd;
//         border-radius: 5px;
//       }
//       .details p {
//         margin: 5px 0;
//       }
//       .footer {
//         text-align: center;
//         font-size: 12px;
//         color: #777;
//         margin-top: 30px;
//       }
//       .footer a {
//         color: #5c6bc0;
//         text-decoration: none;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <h2>Booking Canceled</h2>
//       </div>

//       <div class="content">
//         <p>Dear ${user.userName},</p>

//         <p>We regret to inform you that your booking has been canceled. Below are the details of the canceled booking:</p>

//         <div class="details">
//           <p><strong>Name:</strong> ${user.userName}</p>
//           <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
//           <p><strong>Number of persons:</strong> ${booking.person}</p>
//           <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
//           <p><strong>Time:</strong> ${booking.time}</p>
//           <p><strong>Message:</strong> ${booking.message || "N/A"}</p>
//           <p><strong>Table Number:</strong> ${booking.tableNo || "N/A"}</p>
//         </div>

//         <p>If this cancellation was made in error or if you would like to rebook, please do not hesitate to contact us.</p>
//       </div>

//       <div class="footer">
//         <p>We hope to serve you in the future.</p>
//         <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
//         <p><a href="http://yourcompany.com">Visit our website</a></p>
//       </div>
//     </div>
//   </body>
// </html>
// `;

    // Send confirmation email
    // if(booking.status === "confirm"){
    // await sendEmail(user.email, "Booking Confirmation - Your Booking Details", emailContentForUser);
    // }else{
    //   await sendEmail(user.email, "Booking Cancel - Your Booking Details", emailContentForUserBookingCancel);
    // }

    res.status(200).json({ message: "Booking status updated and email sent" });
  } catch (error) {
    console.log("Error in update order Status ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

