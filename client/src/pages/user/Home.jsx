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
      <HomeProduct/>
      <AllProduct heading={"Your Recipe"} />
    </>
  )
}

export default Home