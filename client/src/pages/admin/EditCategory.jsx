import React, { useEffect, useState } from 'react';
import { useEditCategoryMutation, useGetCategoryByIdQuery } from '../../api/categorySlice';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const EditCategory = () => {
  const { categoryId } = useParams();
  const [name, setName] = useState('');
  
  // Fetch the category data based on the categoryId
  const { data: categoryData, isLoading: isFetching } = useGetCategoryByIdQuery(categoryId);
  
  const [editCategory, { isLoading: isSaving }] = useEditCategoryMutation();

  // Pre-fill the input with the fetched category name when data is loaded
  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name);
    }
  }, [categoryData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the mutation function to edit the category
      const response = await editCategory({ id: categoryId, name }).unwrap();
      console.log("Mutation response:", response);
  
      // Show a success message with SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Category updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.log(error);
      // Show an error message if something goes wrong
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update category.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };
  

  if (isFetching) {
    return <p>Loading category data...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter category name"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Category'}
        </button>
      </div>
    </form>
  );
};

export default EditCategory;
