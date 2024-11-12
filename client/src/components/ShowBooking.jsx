import React from "react";

const ShowBooking = ({ title, count, image, background }) => {
  return (
    <div
      className="w-full mt-8 md:h-[100px] h-[65px] relative rounded-md flex flex-col justify-center pl-5"
      style={{
        background: `${background}`,
        filter: "drop-shadow(0 7px 12px rgba(rgb(0,0,0), 10%))",
      }}
    >
      <div>
        <h3
          className="text-[26px] text-white font-bold leading-tight"
          style={{
            letterSpacing: 2,
          }}
        >
          {count}
        </h3>
        <p className="text-[16px] text-white font-normal">{title}</p>
        <div
          className="md:w-12 md:h-12 w-9 h-9 flex justify-center items-center rounded-full absolute right-4 md:-top-[23px] -top-[14px]"
          style={{
            background: `${background}`,
          }}
        >
          <div className=" md:text-3xl text-xl text-white">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBooking;
