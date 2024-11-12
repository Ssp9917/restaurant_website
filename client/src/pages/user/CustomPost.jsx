import React from 'react'
import bike1 from '../../assets/bike1.png'
import { IoCallOutline } from "react-icons/io5";
import handPhone from '../../assets/handPhone.png';
import dev1 from '../../assets/dev-logo-1.png'
import dev2 from '../../assets/dev-logo-2.png'
import dev3 from '../../assets/dev-logo-3.png'

const CustomPost = () => {
  return (
    <div className='gap-5 justify-center hidden md:flex'>
      {/* first div */}

      <div className='w-[400px] flex border  h-[150px] ml-2 rounded-[20px] bg-red-500'>
        {/* left div */}
        <div className='w-[40%] flex justify-center items-center h-full'>
          <img src={bike1} alt="bike" width={150} height={150} />
        </div>

        {/* right div */}
        <div className='w-[60%] flex flex-col'>
          <div className='text-white text-[20px] mt-2'>
            Get Free Delivery
          </div>

          <div className='text-[12px] text-white leading-tight mb-2'>
            As well known and we are very busy all days beforeso we can guarantee your seat.
          </div>

          {/* button */}
          <button className='w-[180px] h-10 rounded-[20px] text-[14px] bg-yellow-400 flex items-center gap-2'>
            <IoCallOutline className='ml-2' /> Call: +91 1234512345
          </button>
        </div>
      </div>

      {/* second div */}
      <div className='w-[400px] flex  h-[150px] ml-2 rounded-[20px] bg-yellow-500'>
        {/* left div */}
        <div className='w-[40%]  flex justify-center items-center h-full'>
          <img src={handPhone} alt="bike" width={150} height={150} />
        </div>

        {/* right div */}
        <div className='w-[60%] flex flex-col'>
          <div className='text-black text-[20px] mt-2'>
            Post Your Order Yet
          </div>

          <div className='text-[12px] text-black leading-tight mb-2'>
            As well known and we are very busy all days beforeso we can guarantee your seat.
          </div>

          {/* button */}
         <div className='flex items-center gap-2 h-10 mr-4'>
          <div>
            <img src={dev3} alt="" />
          </div>
          <div>
            <img src={dev2} alt="" />
          </div>
          <div>
            <img src={dev1} alt="" />
          </div>
         </div>
        </div>
      </div>

    </div>
  )
}

export default CustomPost