import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useGetAllOffersQuery } from '../api/offerSlice';

const OfferSlider = () => {
  const { data, isLoading, isError } = useGetAllOffersQuery();

  // Ensure data is available and has the 'offers' field
  const offers = data ? data.offers : [];

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <p>Loading offers...</p>;
  if (isError) return <p>Failed to load offers.</p>;

  return (
    <div className="w-full ">
      <Slider {...settings}>
        {offers.map((offer, index) => (
          <div key={index} className="p-4 pt-10 pb-10">
            <div className="bg-white shadow-all-sides md:rounded-[6px]  p-4 flex flex-col items-center">
              <img
                src={backendUrl + '/' + offer.offerImage} // Ensure offer.image is correctly accessed
                alt={offer.title}
                className="w-[390px] h-[200px] object-fill rounded-lg mb-2"
              />
              <h3 className="text-xl font-bold">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
              <span className="text-green-500 font-semibold">{offer.discount} Off</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OfferSlider;
