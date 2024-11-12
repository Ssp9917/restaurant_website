import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { useEditBannerMutation, useGetSingleBannerQuery } from '../../api/bannerSlice';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const EditBanner = () => {
    const [bannerName, setBannerName] = useState('');
    const [bannerImage, setBannerImage] = useState(null); // File input
    const [bannerImageUrl, setBannerImageUrl] = useState(''); // Display image URL
    const [message, setMessage] = useState('');

    const [editBanner, { isLoading }] = useEditBannerMutation();
    const { bannerId } = useParams();
    const { data: bannerData } = useGetSingleBannerQuery(bannerId);

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    useEffect(() => {
        if (bannerData) {
            setBannerName(bannerData.bannerName);
            setBannerImageUrl(bannerData.bannerImage); // Set URL for display only
        }
    }, [bannerData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!bannerName || !bannerImage) {
        //     setMessage('Please provide both banner name and image.');
        //     return;
        // }

        try {
            const formData = new FormData();
            formData.append('bannerName', bannerName);
            formData.append('bannerImage', bannerImage);

            await editBanner({ id: bannerId, banner: formData }).unwrap();

            Swal.fire({
                title: 'Success!',
                text: 'Banner updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            setMessage('');
        } catch (error) {
            setMessage('Error updating banner');
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Banner</h2>
            {message && <p className="mb-4 text-center text-red-500">{message}</p>}
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
                    <label className="block text-gray-700">Current Banner Image:</label>
                    {bannerImageUrl && (
                        <img src={backendBaseUrl+'/'+bannerImageUrl} alt="Current Banner" className="mb-4 w-48 h-auto" />
                    )}
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Banner'}
                </button>
            </form>
        </div>
    );
};

export default EditBanner;
