import React, { useState } from 'react';
import { useAddOfferMutation } from '../../api/offerSlice';
import Swal from 'sweetalert2';

const AddOffer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [offerImage, setOfferImage] = useState(null);
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');

  const [addOffer, { isLoading, isError }] = useAddOfferMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {



      // Constructing FormData
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('discount', discount);
      formData.append('offerImage', offerImage);  // Adding image file
      // formData.append('startDate', startDate);
      // formData.append('endDate', endDate);

      // Sending FormData via addOffer API call
      await addOffer(formData);

      Swal.fire({
        title: 'Success!',
        text: 'Offer added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Reset form fields
      setTitle('');
      setDescription('');
      setDiscount('');
      setOfferImage(null);
      // setStartDate('');
      // setEndDate('');


    } catch (error) {

    }
  };

  return (
    <div className="mt-2 p-2 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Discount (%)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Offer Image</label>
          <input
            type="file"
            onChange={(e) => setOfferImage(e.target.files[0])}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <div>
          <label className="block text-gray-700 font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* <div>
          <label className="block text-gray-700 font-medium mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Add Offer'}
        </button>
        {/* {isError && <p className="text-red-500 mt-2">Failed to add offer. Please try again.</p>} */}
      </form>
    </div>
  );
};

export default AddOffer;
