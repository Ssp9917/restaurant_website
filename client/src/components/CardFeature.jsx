import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../features/cart/cartSlice'
import { CiSquarePlus } from "react-icons/ci";
import addToCartImage from '../assets/addToCart.png'

const CardFeature = ({ image, name, price, category, loading, id, oldprice }) => {

    console.log(oldprice)

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    const dispatch = useDispatch()

    const handleAddCartProduct = (e) => {
        dispatch(addItemToCart({ id, image, name, price, category, }));
    };

    return (
        <div className="p-[10px] w-full md:max-w-[306px] bg-white hover:shadow-sm drop-shadow-sm py-5  cursor-pointer flex flex-col items-center rounded-[20px] border pb-2 pl-2 ">
            {image ? (
                <>
                    <Link
                        className='w-[300px] md:pl-3 md:pr-3'
                        // onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
                    >
                        <Link
                            className="h-[150px] w-[300px]  md:w-full  flex flex-col justify-center items-center"
                            style={{
                                background: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
                                borderRadius: 24,
                                overflow: "hidden"

                            }}
                            to={`/menu/${id}`}

                        >
                            <div className="overflow-hidden bg-transparent w-full h-full flex justify-center items-center">
                                <img src={backendBaseUrl + '/' + image} className="w-full h-full " />
                            </div>
                        </Link>

                        <h3 className="font-semibold  text-slate-600 capitalize text-lg mt-4 px-2">
                            {name}
                        </h3>
                        {/* <p className=" text-slate-500  font-medium">{category}</p> */}
                        <p className=" flex justify-between items-center font-semibold gap-1 px-2">
                           
                            <div className='flex gap-4'>
                                <span>₹ {price}</span><span className='font-normal line-through decoration-red-500'>₹ {oldprice}</span>
                            </div>

                            <button
                                className="z-[999] rounded"
                                onClick={handleAddCartProduct}
                            >
                               <img src={addToCartImage} alt="" />
                            </button>
                        </p>
                    </Link>

                </>
            ) : (
                <div className="min-h-[150px] flex justify-center items-center">
                    <p>{loading}</p>
                </div>
            )}
        </div>
    )
}

export default CardFeature