import topSellingBg from '../assets/topSellingBg.png';

const OfferPromotion = () => {

    

  return (
    <div
      className="bg-yellow-500 h-[334px] text-center p-4 rounded-lg text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${topSellingBg})`,
      }}
    >
      <h3 className="text-xl font-medium text-black">Super Delicious</h3>
      <h3 className='text-2xl font-bold text-red-500'> CHICKEN</h3>
      <p className="text-lg mt-2 text-red-500">CALL US NOW:</p>
      <p className="text-3xl font-bold mt-1 text-red-500">+65 66101170</p>
    </div>
  );
};

export default OfferPromotion;
