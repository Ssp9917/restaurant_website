import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonialFirstImage from '../../assets/testimonialGroup1.png';
import { useGetAllTestimonialQuery } from "../../api/testimonialSlice";

const Testimonial = () => {
  const { data: testimonials = [] } = useGetAllTestimonialQuery();

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

  const settings = {
    dots: true,
    infinite: false, // Set to false to avoid looping
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="px-4 py-10 md:block hidden">
      <Slider {...settings}>
        {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="!flex flex-col md:flex-row items-center w-full">
              {/* Image Section */}
              <div className="w-full md:w-1/2 mb-4 md:mb-0 flex justify-center">
                <img
                  src={ backendUrl + '/' +  testimonial.image || testimonialFirstImage}
                  alt={testimonial.name || "Client"}
                  className="w-[450px] rounded-full"
                />
              </div>

              <div className="p-6 w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-red-500 font-medium">TESTIMONIALS</h3>
                <h1 className="text-2xl font-bold">What Our Client Says</h1>

                <div className="text-[15px] text-gray-500">
                  {testimonial.title || "No testimonial provided"}
                </div>

                <div className="mt-7 font-semibold">{testimonial.name || "Anonymous"}</div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading testimonials...</div>
        )}
      </Slider>
    </div>
  );
};

export default Testimonial;
