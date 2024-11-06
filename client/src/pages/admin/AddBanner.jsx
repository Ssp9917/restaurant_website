import React, { useState } from 'react';
import axios from '../../config/axiosConfig';
import { useAddBannersMutation } from '../../api/bannerSlice';
import Swal from 'sweetalert2';

const AddBanner = () => {
    const [bannerName, setBannerName] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [message, setMessage] = useState('');

    const [addBanners, { isLoading }] = useAddBannersMutation();

    // Handle file selection
    const handleImageChange = (e) => {
        setBannerImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!bannerName || !bannerImage) {
            setMessage('Please provide both banner name and image.');
            return;
        }

        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('bannerName', bannerName);
            formData.append('bannerImage', bannerImage);

         
            await addBanners(formData).unwrap();

            // Show a success message with SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Banner added successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            setMessage('Error adding banner');
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Banner</h2>
            {message && <p className="mb-4 text-center">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Banner Name:</label>
                    <input
                        type="text"
                        value={bannerName}
                        onChange={(e) => setBannerName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter banner name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Banner Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Add Banner
                </button>
            </form>
        </div>
    );
};

export default AddBanner;
