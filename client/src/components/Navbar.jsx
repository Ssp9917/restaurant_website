import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2'

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);

  // const dispatch = useDispatch();
  const { user: userData, logout } = useContext(AuthContext)

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout = async () => {
    await logout()
    Swal.fire({
      position: "center",
      icon: "success",
      title: "logout successfully",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const cartItemNumber = useSelector((state) => state.cart.items);

  return (
    <header className="fixed z-[999999] shadow-md md:w-[1280px] w-full h-16 px-2 md:px-4  bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="flex items-center h-full">
            <img src={logo} className="h-8 w-20" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-8 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"food"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center flex justify-center items-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData?.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute top-full right-0 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">

                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  {/* <Link
                    to={"menu/646b5548acd0a88a674b9429"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link> */}
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
                {userData != null ? (
                  <div className='flex flex-col'>
                    <Link
                      to={"/order"}
                      className="whitespace-nowrap  cursor-pointer px-2"
                    >
                      Orders
                    </Link>
                    <Link
                      to={"/user-booking"}
                      className="whitespace-nowrap  cursor-pointer px-2"
                    >
                      Booking
                    </Link>
                    <Link
                      className="cursor-pointer whitespace-nowrap"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </div>

                ) : (
                  <div className='flex flex-col'>
                    <Link
                      to={"/login"}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      Login
                    </Link>
                    <Link
                      to={"/signup"}
                      className="whitespace-nowrap  cursor-pointer px-2"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  )
}

export default Navbar