import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../features/cart/cartSlice'
import { CiSquarePlus } from "react-icons/ci";

const CardFeature = ({ image, name, price, category, loading, id, oldprice }) => {

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    const dispatch = useDispatch()

    const handleAddCartProduct = (e) => {
        dispatch(addItemToCart({ id, image, name, price, category, }));
    };

    return (
        <div className="relative   h-[220px] md:max-w-[200px] bg-white hover:shadow-sm drop-shadow-sm py-5  cursor-pointer flex flex-col pb-2 pl-2 ">
            {image ? (
                <>
                    <Link
                        className='w-[140px]'
                        to={`/menu/${id}`}
                        onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
                    >
                        <div
                            className="h-[96px] w-[140px] flex flex-col justify-center items-center"
                            style={{
                                 background: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
                                 borderRadius:24,
                                 overflow:"hidden" 

                            }}
                        >
                            <div className=" overflow-hidden bg-transparent w-full h-full flex justify-center items-center">
                                <img src={backendBaseUrl + '/' + image} className="w-full h-full " />
                            </div>
                        </div>

                        <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 break-words max-w-[140px] px-2">
                            {name}
                        </h3>
                        {/* <p className=" text-slate-500  font-medium">{category}</p> */}
                        <p className=" flex font-semibold gap-1 px-2">
                            <span className="">₹</span>
                            <div className='flex gap-4'>
                                <span>{price}</span><span className='font-normal line-through decoration-red-500'>{oldprice}</span>
                            </div>
                        </p>
                    </Link>
                    <button
                        className="absolute top-0 right-0 z-[999] rounded"
                        onClick={handleAddCartProduct}
                    >
                        <CiSquarePlus size={32} color='green' />
                    </button>
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