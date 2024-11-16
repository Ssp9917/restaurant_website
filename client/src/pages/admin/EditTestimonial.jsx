import React, { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';
import Swal from 'sweetalert2';
import { useGetSingleTestimonialQuery } from '../../api/testimonialSlice';
import { useParams } from 'react-router-dom';

const EditTestimonial = () => {
    const { testimonialId } = useParams();
    const { data } = useGetSingleTestimonialQuery(testimonialId);

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    // Set initial form values when data is fetched
    useEffect(() => {
        if (data) {
            setTitle(data.title || '');
            setName(data.name || '');
            setMessage(data.testimonial || '');
        }
    }, [data]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData to handle file uploads
        const formData = new FormData();
        formData.append('title', title);
        formData.append('name', name);
        if (image) formData.append('image', image); // Only append image if a new one is selected
        formData.append('testimonial', message);

        try {
            const response = await axios.put(`/testimonial/editTestimonial/${testimonialId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Success message with SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Testimonial updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update testimonial.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="p-3 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Testimonial</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="w-full"
                        accept="image/*"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
                >
                    Update Testimonial
                </button>
            </form>
        </div>
    );
};

export default EditTestimonial;
