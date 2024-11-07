import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRecipeDetailsQuery } from "../../api/recipeSlice"; // Import your API hook
import AllProduct from "../../components/AllProduct";
import { addItemToCart } from "../../features/cart/cartSlice";
import RelatedProduct from "../../components/RelatedProduct";
// import { addCartItem } from "../redux/productSlide"; // Adjust this path if needed

const SingleRecipeDetails = () => {
  const { id } = useParams(); // Use to get parameter from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

  console.log(id)

  // Fetch product data using the filterby parameter
  const { data: productData, isLoading, error } = useGetSingleRecipeDetailsQuery(id);
  
  const handleAddCartProduct = () => {
    if (productData) {
      const { image, name, price, category: { name: categoryName }, _id: id } = productData; // Destructure category.name as categoryName
      dispatch(addItemToCart({ image, name, price, category: categoryName, id })); // Use categoryName as category
    }
  };

  console.log(productData)

  const handleBuy = () => {
    if (productData) {
      dispatch(addCartItem(productData));
      navigate("/cart");
    }
  };

  if (isLoading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error fetching product: {error.message}</div>; // Error handling
  if (!productData) return <div>No product found.</div>; // Handle case with no product

  return (
    <div>
      <div className="p-2 md:p-4">
        <div className="w-full max-w-4xl m-auto md:flex bg-white">
          <div className="max-w-sm overflow-hidden w-full p-5">
            <img
              src={backendUrl+'/'+productData.image}
              alt={productData.name}
              className="hover:scale-105 transition-all h-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
              {productData.name}
            </h3>
            <p className="text-slate-500 font-medium text-2xl">
              {productData.category.name} {/* Assuming category has a name field */}
            </p>
            <p className="font-bold md:text-2xl">
              <span className="text-red-500">₹</span>
              <span>{productData.price}</span>
              <span className="pl-4 text-sm line-through">{productData.oldPrice}</span>
            </p>
            <div className="flex gap-3">
              {/* <button
                onClick={handleBuy}
                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              >
                Buy
              </button> */}
              <button
                onClick={handleAddCartProduct}
                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              >
                Add Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium">Description:</p>
              <p>{productData.description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Uncomment and use your related products component if needed */}
      <RelatedProduct heading={"Related Product"} category={productData?.category}/>
    </div>
  );
};

export default SingleRecipeDetails;
