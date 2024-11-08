import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllRecipeQuery } from '../../api/recipeSlice';
import CardFeature from '../../components/CardFeature';
import BackButton from '../../components/BackIcon';

const CategoryProduct = () => {
  const { categoryId } = useParams();
  const { data: products, isLoading, error } = useGetAllRecipeQuery();

  // Filter products based on matching category ID
  const filteredProducts = products?.filter(
    (product) => product.category._id === categoryId
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-6"> <span><BackButton/></span> {filteredProducts[0].category.name}</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts && filteredProducts.length > 0 ? (
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
            No products found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
