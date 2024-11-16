import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useGetAllCategoryQuery } from '../api/categorySlice';
import { useGetAllRecipeQuery } from '../api/recipeSlice';
import { useNavigate } from 'react-router-dom';

const AllProduct = ({ heading }) => {
  const { data: categoryList } = useGetAllCategoryQuery();

  const { data: homeProductCartList } = useGetAllRecipeQuery();

  const navigate = useNavigate()

  const [filterby, setFilterBy] = useState("all");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(homeProductCartList);
  }, [homeProductCartList]);


  // for big devices
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


  // mobail devices
  const handleNavigate = (category) => {
    navigate(`/category/${category._id}`)
  }

  // Handle click event based on device size
  const handleClick = (category) => {
    if (window.innerWidth >= 768) { // md and larger
      handleFilterProduct(category);
    } else { // sm and smaller
      handleNavigate(category);
    }
  };

  return (
    <div className="mt-5 md:mt-10">
      <h2 className="md:font-bold font-medium md:text-2xl text-xl text-slate-800 md:mb-4 pl-2">{heading}</h2>

      <div className="overflow-x-auto scrollbar-none md:overflow-hidden flex md:justify-center gap-2 md:gap-6">
        {/* <div className='hidden md:block'>
          <FilterProduct
            category={'All'}
            key={'all'}
            onClick={() => handleFilterProduct('all')}
            isActive={'all' === filterby.toLowerCase()}
          />
        </div> */}
        {categoryList?.length !== 0 ? (
          categoryList?.map((el, index) => (
            <FilterProduct
              category={el.name || el}
              image={el.categoryImage}
              key={el._id || index}
              onClick={() => handleNavigate(el)}
              isActive={el.name.toLowerCase() === filterby.toLowerCase()}
            />
          ))
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>No Category Found</p>
          </div>
        )}
      </div>


      {/* <div className="md:grid hidden  md:grid-cols-7 grid-cols-2 place-items-center  my-4">
        {dataFilter?.length > 0 ? (
          dataFilter.slice(0, 14).map((el) => (
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
      </div> */}
    </div>
  );
};

export default AllProduct;
