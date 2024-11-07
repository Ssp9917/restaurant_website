import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ThankyouPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-200">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto text-center">
                <div className="flex flex-col items-center">
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                    <p className="text-gray-600">Thank you for your purchase. Your payment has been processed successfully.</p>
                </div>
            </div>
        </div>
    );
};

export default ThankyouPage;
