import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonialFirstImage from '../../assets/testimonialGroup1.png';

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    image: testimonialFirstImage,
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Web Developer",
    image:testimonialFirstImage,
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  },
  // Add more testimonials as needed
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="px-4 py-10">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="!flex flex-col md:flex-row items-center w-full">
            {/* Image Section */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0 flex justify-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-[450px] rounded-full"
              />
            </div>

            <div className="p-6 w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-red-500 font-medium">TESTIMONIALS</h3>
              <h1 className="text-2xl font-bold">What Our Client Says</h1>

              <div className="text-[15px] text-gray-500">
              {testimonial.testimonial}
              </div>

              <div className="mt-7 underline">{testimonial.name}</div>
            </div>

            {/* Testimonial Details */}
            {/* <div className="p-6 w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-500 mb-4">{testimonial.role}</p>
              <p className="text-lg text-gray-700">{testimonial.testimonial}</p>
            </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
