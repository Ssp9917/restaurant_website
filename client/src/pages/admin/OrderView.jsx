import React, { useRef } from 'react';
import { FaDownload } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useGetSingleOrderDetailsQuery } from '../../api/orderSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrderView = () => {
    const { orderId } = useParams();
    const { data: order, isLoading, isError } = useGetSingleOrderDetailsQuery(orderId);
    const invoiceRef = useRef();

    // Function to handle downloading the invoice
    const handleDownloadInvoice = async () => {
        if (!order) return;

        const invoiceElement = invoiceRef.current;
        const canvas = await html2canvas(invoiceElement);
        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice_${order._id}.pdf`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading order details.</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h1>

            {/* Invoice Content for Download */}
            <div ref={invoiceRef} className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Invoice</h2>

                {/* Order Summary */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Order ID: {order._id}</h3>
                    <p className="text-gray-600">Status: <span className={`font-bold ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                    <p className="text-gray-600">Payment ID: {order.paymentIntentId}</p>
                    <p className="text-gray-600">Total Amount: ₹ {order.totalAmount}</p>
                    <p className="text-gray-600">Ordered on: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>

                {/* Order Items */}
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Items in this Order</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {order.items && order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1 px-4">
                                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                                <p className="text-gray-500">Price: ₹ {item.price}</p>
                            </div>
                            <p className="font-semibold text-gray-800">₹ {item.price * item.quantity}</p>
                        </div>
                    ))}
                </div>

                {/* Total Amount */}
                <div className="mt-6 text-right">
                    <h3 className="text-lg font-semibold text-gray-800">Grand Total: ₹ {order.totalAmount}</h3>
                </div>
            </div>

            {/* Download Invoice Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleDownloadInvoice}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                    <FaDownload className="mr-2" />
                    Download Invoice
                </button>
            </div>
        </div>
    );
};

export default OrderView;
