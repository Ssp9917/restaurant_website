import React, { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const BackButton = () => {
  const handleBack = () => {
    window.history.back();
  };

  const {handleMenuClick} = useContext(AuthContext);


  return (
    <span
      onClick={()=>{handleBack(),handleMenuClick()}}
      className="inline-block md:hidden"
    >
      <FaArrowLeft fill='#000' className="mr-1 pt-1 md:hidden" />
    </span>
  );
};

export default BackButton;
