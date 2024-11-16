import React from 'react'
import TopSellingItems from '../../components/TopSellingItems'
import OfferPromotion from '../../components/OfferPromotion'


const TopSelling = () => {
    return (
        <div className="flex flex-col lg:flex-row p-2  gap-6 mt-8 mb-8">
            <div className="flex-1">
                <TopSellingItems />
            </div>
            <div className="w-full lg:w-1/3 hidden md:block">
                <OfferPromotion />
            </div>
        </div>
    )
}

export default TopSelling