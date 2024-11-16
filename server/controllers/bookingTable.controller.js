
import Booking from '../models/bookingTable.model.js';
import tableModel from '../models/table.model.js';
import User from '../models/user.model.js';
import sendEmail from '../utils/sendEmail.js';
import dotenv from 'dotenv'

dotenv.config()


const adminEmail = process.env.ADMIN_EMAIL;

// import { sendEmail } from '../utils/sendEmail.js'; 

export const addBooking = async (req, res) => {
  try {
    const { name, phone, person, date, time, message, tableNo } = req.body;

    console.log(name, phone, person, date, time, message);

    // Validate the required fields
    if (!name || !phone || !person || !date || !time || !tableNo) {
      return res.status(400).json({ error: 'Please fill all required fields.' });
    }


    const userId = req.user.userId;

    const user = await User.findById(userId);

    const table = await tableModel.findOne({ tableNumber: tableNo });


    console.log(user)

    if (!user) {
      return res.status(400).json({ error: 'User not authenticated.' });
    }

    // Create new booking
    const newBooking = new Booking({
      name,
      phone,
      person,
      date,
      time,
      message,
      tableNo,
      userId,
    });

    const savedBooking = await newBooking.save();

    // update table status
    table.status = "booked"

    await table.save()

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
          background-color: green;
          color: #fff;
          padding: 10px 0;
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
        .details {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .details p {
          margin: 5px 0;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #777;
          margin-top: 30px;
        }
        .footer a {
          color: #5c6bc0;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Booking Confirmation</h2>
        </div>

        <div class="content">
          <p>Dear ${name},</p>

          <p>Thank you for your booking! Below are the details of your booking:</p>

          <div class="details">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Number of persons:</strong> ${person}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Table Number:</strong> ${tableNo}</p>
          </div>

          <p>We look forward to seeing you soon!</p>
        </div>

        <div class="footer">
        <p>Your Booking status is panding now. Wait for confirmation mail</p>
          <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          <p><a href="http://yourcompany.com">Visit our website</a></p>
        </div>
      </div>
    </body>
  </html>
`;



    // Email content for the admin
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
          padding: 10px 0;
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
        .details {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .details p {
          margin: 5px 0;
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
          <h2>New Booking Alert</h2>
        </div>

        <div class="content">
          <p>Dear Admin,</p>

          <p>A new booking has been made! Below are the details:</p>

          <div class="details">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Number of persons:</strong> ${person}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Table Number:</strong> ${tableNo}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>

          <p>Please review the booking details and take necessary actions.</p>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          <p><a href="http://yourcompany.com">Visit our website</a></p>
        </div>
      </div>
    </body>
  </html>
`;


    // Send confirmation email to the user
    await sendEmail(user.email, "Booking Confirmation - Your Booking Details", emailContentForUser);



    await sendEmail(adminEmail, "New Booking - New Booking Details", emailContentForAdmin);

    res.status(201).json({ message: 'Booking added successfully!', booking: savedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding booking', details: error.message });
  }
};


// Controller to get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving bookings', details: error.message });
  }
};

// delete booking controller
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id); // Delete the booking

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.log("Error in deleteBooking controller", error.message)
    res.status(500).json("Internal server error")
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the booking by ID
    const booking = await Booking.findById(id);

    console.log(req.body, status)
    

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Find the user by userId in the booking
    const user = await User.findById(booking.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the status
    booking.status = status || booking.status
    await booking.save();

    // Email content for confirmation
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
            background-color: green;
            color: #fff;
            padding: 10px 0;
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
          .details {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .details p {
            margin: 5px 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 30px;
          }
          .footer a {
            color: #5c6bc0;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Booking Confirmation</h2>
          </div>
  
          <div class="content">
            <p>Dear ${user.userName},</p>
  
            <p>We are pleased to inform you that your booking has been confirmed. Below are the details of your booking:</p>
  
            <div class="details">
              <p><strong>Name:</strong> ${user.userName}</p>
              <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
              <p><strong>Number of persons:</strong> ${booking.person}</p>
              <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${booking.time}</p>
              <p><strong>Message:</strong> ${booking.message || "N/A"}</p>
              <p><strong>Table Number:</strong> ${booking.tableNo || "Assigned upon arrival"}</p>
            </div>
  
            <p>We look forward to serving you!</p>
          </div>
  
          <div class="footer">
            <p>Thank you for choosing us.</p>
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p><a href="http://yourcompany.com">Visit our website</a></p>
          </div>
        </div>
      </body>
    </html>
    `;

    // Email content for cancle booking
    const emailContentForUserBookingCancel = `
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
        background-color: red;
        color: #fff;
        padding: 10px 0;
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
      .details {
        margin: 20px 0;
        padding: 15px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      .details p {
        margin: 5px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
        margin-top: 30px;
      }
      .footer a {
        color: #5c6bc0;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Booking Canceled</h2>
      </div>

      <div class="content">
        <p>Dear ${user.userName},</p>

        <p>We regret to inform you that your booking has been canceled. Below are the details of the canceled booking:</p>

        <div class="details">
          <p><strong>Name:</strong> ${user.userName}</p>
          <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
          <p><strong>Number of persons:</strong> ${booking.person}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Message:</strong> ${booking.message || "N/A"}</p>
          <p><strong>Table Number:</strong> ${booking.tableNo || "N/A"}</p>
        </div>

        <p>If this cancellation was made in error or if you would like to rebook, please do not hesitate to contact us.</p>
      </div>

      <div class="footer">
        <p>We hope to serve you in the future.</p>
        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p><a href="http://yourcompany.com">Visit our website</a></p>
      </div>
    </div>
  </body>
</html>
`;

    // Send confirmation email
    if(booking.status === "confirm"){
    await sendEmail(user.email, "Booking Confirmation - Your Booking Details", emailContentForUser);
    }else{
      await sendEmail(user.email, "Booking Cancel - Your Booking Details", emailContentForUserBookingCancel)
    }

    res.status(200).json({ message: "Booking status updated and email sent" });
  } catch (error) {
    console.log("Error in update booking Status", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all booking for the authenticated user
export const getBooking = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you are using middleware to set req.user
    const bookings = await Booking.find({ userId }); // Fetch booking for the authenticated user

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No booking found for this user.' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching booking.' });
  }
};

