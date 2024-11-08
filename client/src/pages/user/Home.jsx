import React from 'react'
import Banner from '../../components/Banner'
import Menu from '../../components/Menu'
import HomeProduct from './HomeProduct'
import AllProduct from '../../components/AllProduct'

const Home = () => {
  return (
    <>
      <Banner/>
      {/* <About/> */}
      {/* <Menu heading="Our Manus"/> */}
      {/* Vegitable */}
      <HomeProduct headings={"Fresh Vegitable"} vegitable={true}/>

      {/* Recipe */}
      <HomeProduct headings={"Recipes"} vegitable={false}/>

      <AllProduct  heading={"Shop By Category"} />
    </>
  )
}

export default Home