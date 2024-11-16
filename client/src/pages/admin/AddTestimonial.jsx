import React, { useState } from 'react';
import axios from '../../config/axiosConfig';
import Swal from 'sweetalert2';

const AddTestimonial = () => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData is required to handle file uploads
        const formData = new FormData();
        formData.append('title', title);
        formData.append('name', name);
        formData.append('image', image);

        try {
            const response = await axios.post('/testimonial/addTestimonial', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Show a success message with SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Category added successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            setTitle('');
            setName('');
            setImage(null);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add category.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="p-3 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Testimonial</h2>
            {message && <p className="text-green-500">{message}</p>}

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
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddTestimonial;
