import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGetAllRecipeQuery } from '../api/recipeSlice';
import CardFeature from './CardFeature';
import search_banner from '../assets/search_banner.png'

const Search = () => {
  const [query, setQuery] = useState('');
  const { data: products, isLoading, isError } = useGetAllRecipeQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount,setVigibleCount] = useState(8)


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
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className='h-[200px]   mb-6 relative' >
        <img src={search_banner} className='w-full h-full' alt="" />
        <div className="absolute md:w-[400px] w-[250px] top-[70%] md:left-[35%] left-[20%]">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-2 px-4 outline-none rounded-lg "
        />
        <FaSearch className="absolute top-3 right-4 text-gray-500" />
      </div>
      </div>


      {/* Product List */}
      <div className="grid grid-cols-1 md:p-0 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredProducts?.length > 0 ? (
          filteredProducts.slice(0,visibleCount).map((el) => (
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
