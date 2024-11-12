import React, { useState } from 'react'
import { useGetAllRecipeQuery } from '../../api/recipeSlice';
import BackButton from '../../components/BackIcon';
import CardFeature from '../../components/CardFeature';

const Food = () => {
    // const { categoryId } = useParams();
    const { data: products, isLoading, error } = useGetAllRecipeQuery();
    const [visibleCount, setVisibleCount] = useState(8)

    // Filter products based on matching category ID
    // const filteredProducts = products?.filter(
    //     (product) => product.category._id === categoryId
    // );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    // Show 4 more products on each "Show More" button click
    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <h2 className="text-2xl font-bold mb-6"> <span><BackButton /></span>Recipe</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {products && products.length > 0 ? (
                    products.slice(0, visibleCount).map((el) => (
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

            {/* Show More Button - Visible only on larger screens */}
            {products.length > visibleCount && (
                <div className="md:flex justify-center mt-4  hidden">
                    <button
                        onClick={handleShowMore}
                        className="bg-red-500 text-white font-medium px-4 py-2 rounded-xl"
                    >
                        Show More Dishes
                    </button>
                </div>
            )}
        </div>
    );
}

export default Food