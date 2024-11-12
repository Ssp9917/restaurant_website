import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetSingleRecipeDetailsQuery, useEditRecipeMutation } from '../../api/recipeSlice'
import { useGetAllCategoryQuery } from '../../api/categorySlice'
import Swal from 'sweetalert2'


const EditRecipe = () => {
    const { recipeId } = useParams()
    const navigate = useNavigate()

    // Fetch the recipe data using RTK Query
    const { data: recipe, error, isLoading } = useGetSingleRecipeDetailsQuery(recipeId)
    const { data: categories } = useGetAllCategoryQuery();

    // State for form fields
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [oldPrice, setOldPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')
    const [bestSeller, setBestSeller] = useState(false)
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null)
    const [featuredProduct, setFeaturedProduct] = useState(false);
    const [topSellingProduct, setTopSellingProduct] = useState(false)

    const [editRecipe, { isLoading: isUpdating }] = useEditRecipeMutation()

    useEffect(() => {
        if (recipe) {
            // Pre-fill the form fields with recipe data
            setName(recipe.name)
            setPrice(recipe.price)
            setOldPrice(recipe.oldPrice)
            setDiscount(recipe.discount)
            setDescription(recipe.description)
            setRating(recipe.rating)
            setBestSeller(recipe.bestSeller)
            setCategory(recipe.category?._id || '')
            setFeaturedProduct(recipe.featuredProduct);
            setTopSellingProduct(recipe.topSellingProduct);
            // Don't overwrite image because we don't want to pre-fill file input
        }
    }, [recipe])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Create a FormData object
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('oldPrice', oldPrice)
        formData.append('discount', discount)
        formData.append('description', description)
        formData.append('rating', rating)
        formData.append('bestSeller', bestSeller)
        formData.append('category', category)
        formData.append("featuredProduct", featuredProduct);
        formData.append("topSellingProduct", topSellingProduct);

        // Add the image if there is one
        if (image) {
            formData.append('image', image)
        }

        try {
            // Send the formData to the API
            await editRecipe({ id: recipeId, recipe: formData }).unwrap()

            Swal.fire({
                title: 'Success!',
                text: 'Recipe updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            console.error('Failed to update recipe:', err)
        }
    }


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching recipe data</div>

    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
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

                <div className='flex gap-2'>
                    <label className="block text-sm font-medium text-gray-700">Featured Product</label>
                    <input
                        type="checkbox"
                        checked={featuredProduct}
                        onChange={(e) => setFeaturedProduct(e.target.checked)}
                        className="mt-1 block"
                    />
                </div>

                <div className='flex gap-2'>
                    <label className="block text-sm font-medium text-gray-700">Top Selling Product</label>
                    <input
                        type="checkbox"
                        checked={topSellingProduct}
                        onChange={(e) => setTopSellingProduct(e.target.checked)}
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
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : 'Update Recipe'}
                </button>
            </form>
        </div>
    )
}

export default EditRecipe
