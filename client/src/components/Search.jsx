import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGetAllRecipeQuery } from '../api/recipeSlice';
import CardFeature from './CardFeature';

const Search = () => {
  const [query, setQuery] = useState('');
  const { data: products, isLoading, isError } = useGetAllRecipeQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle filtering when products or query change
  useEffect(() => {
    if (query === '') {
      setFilteredProducts(products || []); // If the query is empty, show all products
    } else {
      setFilteredProducts(
        (products || []).filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, products]);

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Error fetching products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute top-3 right-4 text-gray-500" />
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((el) => (
            <CardFeature
            key={el._id}
            id={el._id}
            image={el.image}
            name={el.name}
            category={el.category.name}
            price={el.price}
            oldprice={el.oldPrice}
          />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
