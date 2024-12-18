import express from 'express';
import { editOrderStatus, getAllOrdersForAdmin, getOrders, getSingleOrderDetails, updateStatus } from '../controllers/order.controller.js'; // Adjust the import based on your folder structure
import { authenticate } from '../middleware/auth.js'; // Adjust the import based on your authentication middleware

const orderRouter = express.Router();

// Define a route to get orders
orderRouter.get('/getAllOrders', authenticate, getOrders); // Protect this route with authentication middleware
orderRouter.get('/getSingelOrder/:orderId', getSingleOrderDetails); // Get single order details
orderRouter.get('/getAdminOrder/orders', getAllOrdersForAdmin); // Get all orders for admin
orderRouter.put('/editOrderStatus/:orderId',editOrderStatus);
orderRouter.put('/updateStatus/:id',updateStatus)

export default orderRouter;
