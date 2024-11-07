import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useGetAllCategoryQuery } from '../api/categorySlice';
import { useGetAllRecipeQuery } from '../api/recipeSlice';

const AllProduct = ({ heading }) => {
  const { data: categoryList } = useGetAllCategoryQuery();

  const { data: homeProductCartList } = useGetAllRecipeQuery()

  const [filterby, setFilterBy] = useState("all");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(homeProductCartList);
  }, [homeProductCartList]);


  const handleFilterProduct = (category) => {

    console.log(category)
    if (category === 'all') {
      setFilterBy('all');
      const filtered = homeProductCartList
      setDataFilter(filtered);
    } else {
      setFilterBy(category.name);
      const filtered = homeProductCartList.filter(
        (el) => el.category.name.toLowerCase() === category.name.toLowerCase()
      );
      setDataFilter(filtered);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      <div className="flex max-w-[350px] gap-4 md:justify-center justify-start overflow-scroll scrollbar-none">
        <FilterProduct
          category={'All'}
          key={'all'}
          onClick={() => handleFilterProduct('all')}
          isActive={'all' === filterby.toLowerCase()}
        />
        {categoryList?.length != 0 ? (
          categoryList?.map((el, index) => (
            <FilterProduct
              category={el.name || el}
              key={el._id || index}
              onClick={() => handleFilterProduct(el)}
              isActive={el.name.toLowerCase() === filterby.toLowerCase()}
            />
          ))
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>No Recipes Found</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter?.length > 0 ? (
          dataFilter.slice(0,15).map((el) => (
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
          <div className="min-h-[150px] flex justify-center items-center">
            <p>No Product Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
