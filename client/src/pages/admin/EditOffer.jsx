import React, { useState, useEffect } from 'react';
import { useEditOfferMutation, useGetSingleOfferQuery } from '../../api/offerSlice';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditOffer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');
    const [offerImage, setOfferImage] = useState(null);

    const { offerId } = useParams();
    const { data } = useGetSingleOfferQuery(offerId);
    const [editOffer, { isLoading, isError }] = useEditOfferMutation();

    // Prefill form fields when data is loaded
    useEffect(() => {
        if (data) {
            setTitle(data.title || '');
            setDescription(data.description || '');
            setDiscount(data.discount || '');
            // If the image needs to be displayed, you'll need a URL or a preview method
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('discount', discount);
            formData.append('offerImage', offerImage);

            console.log(title, description, discount)

            await editOffer({ id: offerId, offer: formData }).unwrap();

            Swal.fire({
                title: 'Success!',
                text: 'Offer updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            setTitle('');
            setDescription('');
            setDiscount('');
            setOfferImage(null);
        } catch (error) {
            // Handle error if needed
        }
    };

    return (
        <div className="mt-2 p-2 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Offer</h2>
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
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Update Offer'}
                </button>
                {isError && <p className="text-red-500 mt-2">Failed to update offer. Please try again.</p>}
            </form>
        </div>
    );
}

export default EditOffer;
