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
    <div className="mb-[70px] md:mb-0">
      <div className="p-2 md:p-4 md:pt-12">
        <div className="w-full max-w-5xl m-auto md:flex md:gap-4 bg-white">
          <div className="max-w-sm  overflow-hidden w-full p-2 md:border border-[#ddd]">
            <img
              src={backendUrl + '/' + productData.image}
              alt={productData.name}
              className="hover:scale-105 transition-all h-full"
            />
          </div>

          <div className="flex flex-col md:w-[50%] gap-3">
            <h3 className="font-semibold pl-2 md:pl-0 text-slate-600 capitalize text-2xl md:text-4xl">
              {productData.name}
            </h3>
            <p className="text-slate-500 pl-2 md:pl-0 font-medium text-2xl">
              {productData.category.name} {/* Assuming category has a name field */}
            </p>
            <p className="font-bold md:text-2xl pl-2 md:pl-0">
              <span className="text-red-500">₹</span>
              <span>{productData.price}</span>
              <span className="pl-4 text-sm line-through">{productData.oldPrice}</span>
            </p>
            <div>
              <p className="text-slate-600 font-medium pl-2 md:pl-0">Description:</p>
              <p className="pl-2 md:pl-0">{productData.description}</p>
            </div>
            <div className="flex gap-3">
              {/* <button
                onClick={handleBuy}
                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              >
                Buy
              </button> */}
              <button
                onClick={handleAddCartProduct}
                className="bg-yellow-500 py-1 ml-2 md:ml-0 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              >
                Add Cart
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* Uncomment and use your related products component if needed */}
      <RelatedProduct heading={"Related Product"} category={productData?.category} />
    </div>
  );
};

export default SingleRecipeDetails;
