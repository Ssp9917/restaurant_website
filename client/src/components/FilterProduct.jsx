import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive,image }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

  console.log(image)
  return (
    <div onClick={onClick} className="w-[90px]">
      <div
        className={`text-3xl   rounded-3xl  w-[90px]  cursor-pointer md:w-full h-[100px] flex justify-center items-center ${
          isActive ? "bg-red-600 text-white" : ""
        }`}
      >
        {
          image ? <img src={backendUrl+"/"+image} className="h-[72px] object-contain  w-[72px]" alt="" /> :<CiForkAndKnife size={72}/>
        }
         
      </div>
      <p className="text-center font-medium my-1 md:my-0 md:mb-5 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;