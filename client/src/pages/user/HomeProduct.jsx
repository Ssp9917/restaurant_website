import React, { useEffect, useState, useRef } from 'react';
import HomeCard from '../../components/HomeCard';
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from '../../components/CardFeature';
import { useGetAllRecipeQuery } from '../../api/recipeSlice';

const HomeProduct = ({ headings }) => {
    const { data: homeProductCartList } = useGetAllRecipeQuery();
    const [recipe, setRecipe] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8); // Initially show 8 products

    // Reference for horizontal scrolling (if needed)
    const scrollContainerRef = useRef(null);

    // Array to show loading skeletons
    const loadingArray = new Array(7).fill(null);

    useEffect(() => {
        if (homeProductCartList) {
            // Filter products where bestSeller is true
            const bestSellerProducts = homeProductCartList.filter(
                product => product.bestSeller === true
            );
            setRecipe(bestSellerProducts);
        }
    }, [homeProductCartList]);

    // Scroll by 300px on each button click
    const handleNext = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 300;
        }
    };

    const handlePrev = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 300;
        }
    };

    // Show 4 more products on each "Show More" button click
    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    return (
        <div className="mt-7 mb-4">
            <div className="flex w-full items-center">
                <h2 className="font-bold text-center text-2xl text-slate-800 mb-4 pl-2">
                    {headings}
                </h2>
            </div>

            {/* Container for products */}
            <div className="overflow-x-auto scrollbar-none md:overflow-hidden pl-2 pr-2">
                <div
                    ref={scrollContainerRef}
                    className="flex md:grid gap-5 place-items-center md:grid-cols-4"
                >
                    {recipe?.length > 0
                        ? recipe.slice(0, visibleCount).map((el) => (
                            <CardFeature
                                key={el._id + "bestSeller"}
                                id={el._id}
                                name={el.name}
                                category={el.category.name}
                                price={el.price}
                                image={el.image}
                                oldprice={el.oldPrice}
                            />
                        ))
                        : loadingArray.map((_, index) => (
                            <CardFeature loading="Loading..." key={index + "cartLoading"} />
                        ))}
                </div>
            </div>

            {/* Show More Button - Visible only on larger screens */}
            {recipe.length > visibleCount && (
                <div className="md:flex justify-center mt-4  hidden">
                    <button
                        onClick={handleShowMore}
                        className="bg-red-500 text-white font-medium px-4 py-2 rounded-xl"
                    >
                        Show More Dishes
                    </button>
                </div>
            )}

            {/* Horizontal Scroll Buttons - Visible only on smaller screens */}
            {/* <div className="flex justify-between mt-2 md:hidden">
                <button
                    onClick={handlePrev}
                    className="bg-red-500 text-white p-2 rounded-full"
                >
                    <GrPrevious />
                </button>
                <button
                    onClick={handleNext}
                    className="bg-red-500 text-white p-2 rounded-full"
                >
                    <GrNext />
                </button>
            </div> */}
        </div>
    );
};

export default HomeProduct;
