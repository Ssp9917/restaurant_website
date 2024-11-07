import Order from '../models/order.model.js'; // Adjust the import based on your folder structure

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

