import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllBannersQuery } from '../api/bannerSlice';

const Banner = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const { data: banners = [] } = useGetAllBannersQuery();

    const [isMobileView, setIsMobileView] = useState(false);

    // Check screen width on mount and on resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768); // md breakpoint
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Determine which banners to show based on screen size
    const displayedBanners = isMobileView 
        ? banners.slice(-3)  // Last three banners for mobile
        : banners.slice(0, 3);  // First three banners for desktop

    return (
        <div className="w-full relative">
            <Slider {...sliderSettings}>
                {displayedBanners.map((slide, index) => (
                    <div key={index}>
                        <img src={`${backendUrl}/${slide.bannerImage}`} alt="" className="md:h-[70vh] h-[30vh] w-full object-fill" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
