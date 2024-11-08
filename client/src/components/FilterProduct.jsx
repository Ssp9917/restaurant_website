import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive,image }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

  console.log(image)
  return (
    <div onClick={onClick} className="w-[120px]">
      <div
        className={`text-3xl p-5  rounded-3xl ml-2 cursor-pointer ${
          isActive ? "bg-red-600 text-white" : "bg-gradient-to-tr from-violet-500 to-orange-300"
        }`}
      >
        {
          image ? <img src={backendUrl+"/"+image} className="h-[72px] w-[72px]" alt="" /> :<CiForkAndKnife size={72}/>
        }
         
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;