import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useGetAllCategoryQuery } from '../api/categorySlice';
import { useGetAllRecipeQuery } from '../api/recipeSlice';

const RelatedProduct = ({ heading, category }) => {

    const { data: homeProductCartList } = useGetAllRecipeQuery()
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        const filtered = homeProductCartList?.filter(
            (el) => el.category.name.toLowerCase() === category.name.toLowerCase()
        );
        setDataFilter(filtered)
    }, [homeProductCartList,category]);

    return (
        <div className="my-5">
            <h2 className="font-bold text-2xl text-slate-800 mb-4 pl-2 pr-2">{heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 pl-2 gap-4 my-4">
                {dataFilter?.length > 0 ? (
                    dataFilter.map((el) => (
                        <CardFeature
                            key={el._id}
                            id={el._id}
                            image={el.image}
                            name={el.name}
                            category={el.category.name}
                            price={el.price}
                        />
                    ))
                ) : (
                    <div className="min-h-[150px] flex justify-center items-center">
                        <p>No Product Found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelatedProduct;
