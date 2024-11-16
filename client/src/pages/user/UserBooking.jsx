import React from "react";
import { useGetUserBookingQuery } from "../../api/bookingTable";

const UserBooking = () => {


    const { data: bookings } = useGetUserBookingQuery();

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleString('en-IN', options);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bookings</h2>
            <div className="space-y-4">
                {bookings?.map((booking) => (
                    <div
                        key={booking.id}
                        className="p-4 bg-white rounded-lg shadow flex justify-between items-center border-l-4"
                        style={{
                            borderColor:
                                booking.status === "Confirmed"
                                    ? "green"
                                    : booking.status === "Pending"
                                        ? "yellow"
                                        : "red",
                        }}
                    >
                        <div>
                            <p className="font-medium text-gray-700">{booking.name}</p>
                            <p className="text-sm text-gray-500">
                            Date & Time : {formatDate(booking.date)} {booking.time}
                            </p>
                            <p className="text-sm text-gray-500">Person: {booking.person}</p>
                            <p className="text-sm text-gray-500">Table Number: {booking.tableNo}</p>
                            <p className="text-sm text-gray-500">Message: {booking.message}</p>
                        </div>
                        <span
                            className={`px-3 py-1 text-sm font-semibold rounded ${booking.status === "confirm"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                        >
                            {booking.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBooking;
