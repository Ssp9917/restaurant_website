import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert';


const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeInputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrorMessage('');
    setIsSuccess(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate password
    if (userData.password !== userData.password2) {
      setIsSuccess(false);
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await signup(userData);

      // Show success message
      swal({
        title: "Account Created!",
        text: "Your account has been created successfully.",
        icon: "success",
        buttons: false,
        timer: 2000, // Optional: auto-close after 2 seconds
      });

      setTimeout(() => {
        navigate('/');
      }, 4000);
    } catch (error) {
      setIsSuccess(false);
      setErrorMessage(error.response?.data?.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };





  return (
    <div className='flex-col absolute p-2 top-0 left-0 w-full h-full bg-gray-400 flex justify-center items-center min-h-screen'>
      <div className='w-full relative max-w-sm bg-white m-auto flex flex-col p-4'>
        <h2 className='text-2xl  mb-4 text-center'>
          Register
          <IoClose className='absolute top-3 right-3 cursor-pointer' onClick={() => navigate('/')} />
        </h2>

        {errorMessage && (
          <p className={`${isSuccess ? 'text-green-500' : 'text-red-500'} text-lg italic mb-4`}>
            {errorMessage}
          </p>
        )}

        <form className='w-full flex gap-4 flex-col' onSubmit={submitHandler}>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input
              type="text"
              placeholder='Username'
              name="name"
              value={userData.name}
              onChange={changeInputHandler}
              className='w-full bg-slate-200 border-none outline-none'
              required
            />
          </div>

          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input
              type="email"
              placeholder='Email'
              name="email"
              value={userData.email}
              onChange={changeInputHandler}
              className='w-full bg-slate-200 border-none outline-none'
              required
            />
          </div>

          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input
              type="password"
              placeholder='Password'
              name="password"
              value={userData.password}
              onChange={changeInputHandler}
              className='w-full bg-slate-200 border-none outline-none'
              required
            />
          </div>

          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input
              type="password"
              placeholder='Confirm password'
              name="password2"
              value={userData.password2}
              onChange={changeInputHandler}
              className='w-full bg-slate-200 border-none outline-none'
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className='mt-4 text-center'>Existing/Created Account?</p>
        <Link to="/login" className='text-blue-500 hover:text-blue-800 text-xl text-center'>Sign In</Link>
      </div>
    </div>
  );
}

export default Signup;
