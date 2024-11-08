import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../components'
import LoadingSpinner from '../components/LoadingSpinner'
import MobailFooter from '../components/MobailFooter'

const Main = () => {

    const [loading, setLoading] = useState(false)

    return (
        <div className="bg-white h-full ">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className='max-w-[1280px] mx-auto'>
                    <Navbar />
                    <div className="pt-16">
                        <Outlet />
                    </div>
                    <Footer />
                    <div className='fixed w-full bottom-0 left-0 bg-white'>
                        <MobailFooter />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main