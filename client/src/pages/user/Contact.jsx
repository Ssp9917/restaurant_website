import React, { useState } from 'react';
import { useAddBookingMutation } from '../../api/bookingTable';
import Swal from 'sweetalert2';
import { useGetAllTableQuery } from '../../api/tableSlice';

const Contact = () => {
  const [addBooking, { isLoading, isError, error }] = useAddBookingMutation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    person: '1 Person',
    date: '',
    time: '08:00am',
    message: '',
    tableNo: '',
  });

  const { data,refetch } = useGetAllTableQuery()

  const tables = data?.tables || []

  console.log(tables)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBooking(formData).unwrap();
      // refetch table
      refetch()

      Swal.fire({
        title: 'Success!',
        text: 'Booking successfully made.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      setFormData({
        name: '',
        phone: '',
        person: '1 Person',
        date: '',
        time: '08:00am',
        message: '',
        tableNo: '1',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to book a table. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <section className="bg-gray-500">
      <div className="">
        <div className="flex flex-col lg:flex-row bg-gray-100 overflow-hidden">
          <div className="lg:w-2/3 p-4 bg-white">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
              Online Reservation
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Booking request{' '}
              <a href="tel:+88123123456" className="text-lamaSky hover:underline">
                +88-123-123456
              </a>{' '}
              or fill out the order form
            </p>
            {isError && (
              <p className="text-red-500 text-center mb-4">
                {error?.data?.message || 'Something went wrong. Please try again.'}
              </p>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  autoComplete="off"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  autoComplete="off"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <select
                    name="person"
                    value={formData.person}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                  >
                    {Array.from({ length: 7 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1}-person`}>
                        {i + 1} Person
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative flex-1">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                  />
                </div>

                <div className="relative flex-1">
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                  >
                    {['08:00am', '09:00am', '10:00am', '11:00am', '12:00pm', '01:00pm', '02:00pm', '03:00pm', '04:00pm', '05:00pm', '06:00pm', '07:00pm', '08:00pm', '09:00pm', '10:00pm'].map(
                      (time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {/* Label */}
                <label className="block text-gray-700 font-medium mb-2">Select a Table</label>

                {/* Table Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {tables.map((table) => (
                    <div
                      key={table.tableNumber}
                      onClick={() =>
                        table.status === "available" && setFormData({ ...formData, tableNo: table.tableNumber })
                      }
                      className={`relative cursor-pointer border p-4 rounded-lg text-center shadow-sm ${table.status === "available"
                          ? "bg-green-100 border-green-400 hover:bg-green-200"
                          : table.status === "booked"
                            ? "bg-red-100 border-red-400 cursor-not-allowed"
                            : "bg-yellow-100 border-yellow-400 cursor-not-allowed"
                        }`}
                    >
                      {/* Tick Mark for Selected Table */}
                      {formData.tableNo === table.tableNumber && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
                          ✓
                        </div>
                      )}

                      <h4 className="font-bold text-lg">Table {table.tableNumber}</h4>
                      <p className="text-sm">Capacity: {table.capacity} Persons</p>
                      <p
                        className={`text-xs font-semibold mt-2 ${table.status === "available"
                            ? "text-green-600"
                            : table.status === "booked"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                      >
                        {table.status}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Selected Table */}
                {formData.tableNo && (
                  <p className="text-green-600 mt-4">
                    Selected Table: <strong>{formData.tableNo}</strong>
                  </p>
                )}
              </div>





              <textarea
                name="message"
                placeholder="Message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
              ></textarea>

              <button
                type="submit"
                className={`w-full py-4 bg-black text-white font-semibold rounded-md transition ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lamaSky-dark'
                  }`}
                disabled={isLoading}
              >
                {isLoading ? 'Booking...' : 'Book A Table'}
              </button>
            </form>
          </div>

          {/* Contact Section */}
          <div className="lg:w-1/3 p-4 text-center mb-[54px] md:mb-0  text-white bg-black flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-semibold">Contact Us</h2>
            <a href="tel:+88123123456" className="text-2xl font-bold hover:underline">
              +88-123-123456
            </a>
            <p className="text-lg">Restaurant St, Delicious City, London 9578, UK</p>
            <p className="text-lg">Lunch: Mon-Sun, 11am-2:30pm | Dinner: Mon-Sun, 5pm-10pm</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
