import React from 'react';
import HomeCard from '../../components/HomeCard';
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from '../../components/CardFeature';
import { useGetAllRecipeQuery } from '../../api/recipeSlice';

const HomeProduct = () => {
    const { data: homeProductCartList } = useGetAllRecipeQuery();

    // Array to show loading skeletons
    const loadingArray = new Array(7).fill(null);

    // Filter products to show only those in the "Vegetable" category
    const vegetableProducts = homeProductCartList?.filter(
        product => product.category.name.toLowerCase() === "vegetable"
    );

    return (
        <div className="mt-7">
            <div className="flex w-full items-center">
                <h2 className="font-bold text-2xl text-slate-800 mb-4">
                    Fresh Vegetables
                </h2>
                <div className="ml-auto flex gap-4">
                    <button className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded">
                        <GrPrevious />
                    </button>
                    <button className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded">
                        <GrNext />
                    </button>
                </div>
            </div>
            <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all">
                {vegetableProducts?.length > 0
                    ? vegetableProducts.map((el) => (
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
