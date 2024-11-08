import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import b1 from '../assets/b1.jpg'
import b2 from '../assets/b2.jpg'
import { useGetAllBannersQuery } from '../api/bannerSlice';
// import b3 from '../assets/b3.png'

const Banner = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const sliderData = [
        {
            image: b1,
        },
        {
            image: b2,
        },
        // {
        //     image: b3,
        // },
    ];

    const { data } = useGetAllBannersQuery();


    return (
        <div className="w-full relative ">
            <Slider {...sliderSettings}>
                {data?.map((slide, index) => (
                    <div key={index}>
                        <img src={backendUrl + '/' + slide.bannerImage} alt="" className='md:h-screen h-[50vh] w-full object-fill' />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Banner