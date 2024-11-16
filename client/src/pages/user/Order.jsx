import React, { useState } from 'react';
import { useGetAllOrdersQuery } from '../../api/orderSlice';
import BackButton from '../../components/BackIcon';

const Order = () => {
    
   


    const { data, error, isLoading } = useGetAllOrdersQuery();

    // Loading state
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    }

    // Error handling
    if (error) {
        return <div className="flex justify-center items-center h-screen text-lg text-red-600">Error fetching orders.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6"> <span><BackButton/></span>Orders</h1>
            {data && data.length > 0 ? (
                data.map((order) => (
                    <div key={order._id} className="bg-white shadow-md rounded-lg p-6 mb-4">
                        <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                        <p className="text-gray-500">Status: {order.status}</p>
                        <p className="text-gray-500">Total Amount: ₹{order.totalAmount}</p>
                        <p className="text-gray-500">Payment Intent ID: {order.paymentIntentId}</p>
                        <h3 className="text-lg font-semibold mt-4">Items:</h3>
                        <ul className="list-disc list-inside">
                            {order.items.map((item) => (
                                <li key={item._id} className="flex items-center justify-between mt-2">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-3" />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <span className="text-gray-600">₹{item.price} x {item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-gray-500">
                            Ordered on: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                    </div>
                ))
            ) : (
                <div className="flex justify-center items-center h-64 text-lg">No orders found.</div>
            )}
        </div>
    );
};

export default Order;
