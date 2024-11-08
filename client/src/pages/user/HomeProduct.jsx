import React, { useEffect, useState, useRef } from 'react';
import HomeCard from '../../components/HomeCard';
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from '../../components/CardFeature';
import { useGetAllRecipeQuery } from '../../api/recipeSlice';

const HomeProduct = ({ headings, vegitable }) => {
    const { data: homeProductCartList } = useGetAllRecipeQuery();
    const [recipe, setRecipe] = useState([]);

    // create a refrecnce
    const scrollContainerRef = useRef(null);

    // Array to show loading skeletons
    const loadingArray = new Array(7).fill(null);

    useEffect(() => {
        if (vegitable) {
            const vegetableProducts = homeProductCartList?.filter(
                product => product.category.name.toLowerCase() === "vegetable"
            );
            setRecipe(vegetableProducts);
        } else {
            setRecipe(homeProductCartList);
        }
    }, [homeProductCartList, vegitable]);

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

    return (
        <div className="mt-7">
            <div className="flex w-full items-center">
                <h2 className="font-bold text-2xl text-slate-800 mb-4 pl-2">
                    {headings}
                </h2>
                <div className="ml-auto flex gap-4">
                    <button className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded" onClick={handlePrev}>
                        <GrPrevious />
                    </button>
                    <button className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded" onClick={handleNext}>
                        <GrNext />
                    </button>
                </div>
            </div>
            <div 
                ref={scrollContainerRef} 
                className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
            >
                {recipe?.length > 0
                    ? recipe.map((el) => (
                        <CardFeature
                            key={el._id + "vegetable"}
                            id={el._id}
                            name={el.name}
                            category={el.category.name}
                            price={el.price}
                            image={el.image}
                        />
                    ))
                    : loadingArray.map((_, index) => (
                        <CardFeature loading="Loading..." key={index + "cartLoading"} />
                    ))}
            </div>
        </div>
    );
};

export default HomeProduct;
