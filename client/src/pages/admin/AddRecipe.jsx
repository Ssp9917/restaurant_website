import React, { useState } from 'react';
import { useGetAllCategoryQuery } from '../../api/categorySlice';
import { useAddRecipeMutation } from '../../api/recipeSlice';
import Swal from 'sweetalert2';

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [oldPrice, setOldPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [bestSeller, setBestSeller] = useState(false);

    const { data: categories } = useGetAllCategoryQuery();
    const [addRecipe, { isLoading }] = useAddRecipeMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("oldPrice", oldPrice);
            formData.append("discount", discount);
            formData.append("description", description);
            formData.append("rating", rating);
            formData.append("bestSeller", bestSeller);
            formData.append("image", image);

            await addRecipe(formData).unwrap();

            Swal.fire({
                title: 'Success!',
                text: 'Recipe added successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            setName('');
            setPrice('');
            setCategory('');
            setImage(null);
            setOldPrice('');
            setDiscount('');
            setDescription('');
            setRating('');
            setBestSeller(false);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add recipe.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Old Price</label>
                    <input
                        type="number"
                        value={oldPrice}
                        onChange={(e) => setOldPrice(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        maxLength="1000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="0"
                        max="5"
                        step="0.1"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Best Seller</label>
                    <input
                        type="checkbox"
                        checked={bestSeller}
                        onChange={(e) => setBestSeller(e.target.checked)}
                        className="mt-1 block"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select a category</option>
                        {categories?.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Recipe'}
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;
