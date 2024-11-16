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
        dispatch(removeItemFromCart({ id }));
        Swal.fire('Deleted!', 'Item has been removed from the cart.', 'success');
      }
    });
  };


  return (
    <div className="bg-white relative border-b-[2px] p-2 flex gap-4 rounded border">
      <div className=" bg-white rounded overflow-hidden">
        <img src={backendBaseUrl + '/' + image} className="h-20 w-20 object-fill" />
      </div>
      <div className="flex flex-col justify-center gap-1 w-full">
        <div className="flex justify-between  ">
          <h3 className="font-semibold text-slate-600 break-words max-w-[56px] capitalize text-lg md:text-xl">
            {name}
          </h3>

          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center border-2 p-1 rounded-lg ">
              <button
                onClick={() => dispatch(increaseItemQuantity({ id }))}
                className=" py-1  rounded  p-1 "
              >
                <TbPlus color='green' />
              </button>
              <p className="font-semibold p-1 text-green-500">{qty}</p>
              <button
                onClick={() => dispatch(decreaseItemQuantity({ id }))}
                className=" py-1  rounded  p-1 "
              >
                <TbMinus color='green' />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            {/* <p>Total :</p> */}
            <p className='text-xl'>
              <span className="text-red-500">₹</span>
              {total}
            </p>
          </div>
          <div
            className="cursor-pointer absolute right-0 top-0 text-slate-700 hover:text-red-500"
            onClick={() => handleDelete(id)}
          >
            <AiFillDelete color='red' />
          </div>
        </div>
        {/* <p className=" text-slate-500  font-medium ">{category}</p> */}
        {/* <p className=" font-bold text-base"> */}
        {/* <span className="text-red-500 ">₹</span> */}
        {/* <span>{price}</span> */}
        {/* </p> */}
      </div>
    </div>
  );
};

export default CartProduct