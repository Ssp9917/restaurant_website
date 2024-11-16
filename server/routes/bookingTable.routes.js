import express from 'express';
import { addBooking, deleteBooking, getAllBookings, getBooking, updateStatus } from '../controllers/bookingTable.controller.js';
import { authenticate } from '../middleware/auth.js';


const bookingTableRoute = express.Router();

bookingTableRoute.post('/book',authenticate, addBooking);
bookingTableRoute.get('/bookings', getAllBookings);
bookingTableRoute.put('/updateStatus/:id',updateStatus);
bookingTableRoute.delete('/deleteBooking/:id',deleteBooking);
bookingTableRoute.get('/getUserBooking',authenticate,getBooking);

export default bookingTableRoute;
