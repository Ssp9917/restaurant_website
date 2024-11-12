import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import addToCartImage from '../assets/addToCart.png';
import { addItemToCart } from '../features/cart/cartSlice';
import { useGetAllRecipeQuery } from '../api/recipeSlice';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  

    const handleAddCartProduct = () => {
        const { _id: id, image, name, price, category } = product;
        dispatch(addItemToCart({ id, image, name, price, category }));
    };

    return (
        <div className="flex items-center flex-1 border rounded-lg shadow-md bg-white w-[200px] md:w-full">
            <Link className='w-[200px] md:w-full flex items-center gap-2'>
                <Link  to={`/menu/${product._id}`}>
                    <img src={`${backendBaseUrl}/${product.image}`} alt={product.name} className="md:w-20 w-full mb-2 md:mb-0 h-20 rounded-lg mr-4" />

                </Link>
                <div className="flex flex-col justify-between w-full pr-2 pl-2 md:pl-0">
                    <h3 className="text-[12px] font-semibold pb-2 mb-2 border-b ">{product.name}</h3>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-gray-700">₹ {product.price}</p>
                        <button className="z-[999] rounded" onClick={handleAddCartProduct}>
                            <img src={addToCartImage} alt="Add to cart" />
                        </button>
                    </div>
                </div>

            </Link>
        </div>
    );
};

const TopSellingItems = () => {
    const { data: products, isLoading, isError } = useGetAllRecipeQuery();
    const [visibleCount, setVisibleCount] = useState(9); // Initially show 9 products

    const navigate = useNavigate()

    useEffect(() => {
        if (products) {
            // Filter products to only include those with topSellingProduct set to true
            const topSellingProducts = products.filter(product => product.topSellingProduct);
            setVisibleCount(topSellingProducts.length); // Show all filtered products
        }
    }, [products]);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to load products. Please try again later.</div>;
    }

    // Filter products to only include those with topSellingProduct set to true
    const topSellingProducts = products?.filter(product => product.topSellingProduct) || [];

    return (
        <div className="">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Top Selling Items</h2>
                <button className="text-red-500 font-semibold" onClick={()=>navigate('/food')}>See All</button>
            </div>

            {/* Container for products with horizontal scrolling on mobile */}
            <div className="overflow-x-auto scrollbar-none md:overflow-hidden">
                <div className="flex md:grid gap-5 place-items-center md:grid-cols-3">
                    {topSellingProducts?.length > 0
                        ? topSellingProducts.slice(0, visibleCount).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                        : <div>Loading...</div>}
                </div>
            </div>

            {/* Show More Button - Visible only on larger screens */}
            {topSellingProducts.length > visibleCount && (
                <div className="justify-center mt-4 md:flex hidden">
                    <button
                        onClick={handleShowMore}
                        className="bg-red-500 text-white font-medium px-4 py-2 rounded-xl"
                    >
                        Show More Items
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopSellingItems;
