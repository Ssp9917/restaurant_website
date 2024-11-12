import React from 'react'
import Banner from '../../components/Banner'
import Menu from '../../components/Menu'
import HomeProduct from './HomeProduct'
import AllProduct from '../../components/AllProduct'
import OfferSlider from '../../components/OfferSlider'
import TopSelling from './TopSelling'
import FeaturedProduct from './FeaturedProduct'
import Testimonial from './Testimonial'
import CustomPost from './CustomPost'
import Banner2 from '../../components/Banner2'

const Home = () => {
  return (
    <>
      <Banner/>
      {/* <About/> */}
      {/* <Menu heading="Our Manus"/> */}


      {/* all products */}
      <AllProduct  heading={"Food Category"} />

      {/* offers */}
      <OfferSlider/>
      

      {/* popular items */}
      <HomeProduct headings={"Popular Dishes"}/>

      {/* one more banner */}
      <Banner2/>


      {/* top selling items */}


      <TopSelling/>

      {/* featured items */}

      <FeaturedProduct/>

      {/* testimonial */}
      <Testimonial/>

      {/* custom post */}
      <CustomPost/>

      {/* Recipe */}
      {/* <HomeProduct headings={"Recipes"} vegitable={false}/> */}

    </>
  )
}

export default Home