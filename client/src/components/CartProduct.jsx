import React from 'react'
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch();

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    console.log(id)
    
    // Handle item removal
    const handleDelete = (item) => {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
          if (result.isConfirmed) {
              dispatch(removeItemFromCart({id}));
              Swal.fire('Deleted!', 'Item has been removed from the cart.', 'success');
          }
      });
  };

  
    return (
      <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
        <div className="p-3 bg-white rounded overflow-hidden">
          <img src={backendBaseUrl+'/'+image} className="h-28 w-40 object-cover " />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between">
            <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
              {name}
            </h3>
            <div
              className="cursor-pointer text-slate-700 hover:text-red-500"
              onClick={()=>handleDelete(id)}
            >
              <AiFillDelete color='red' />
            </div>
          </div>
          <p className=" text-slate-500  font-medium ">{category}</p>
          <p className=" font-bold text-base">
            <span className="text-red-500 ">₹</span>
            <span>{price}</span>
          </p>
          <div className="flex justify-between ">
            <div className="flex gap-3 items-center">
              <button
                onClick={() => dispatch(increaseItemQuantity({id}))}
                className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
              >
                <TbPlus />
              </button>
              <p className="font-semibold p-1">{qty}</p>
              <button
                onClick={() => dispatch(decreaseItemQuantity({id}))}
                className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
              >
                <TbMinus />
              </button>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <p>Total :</p>
              <p>
                <span className="text-red-500">₹</span>
                {total}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CartProduct