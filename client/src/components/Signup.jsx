import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { AuthContext } from '../context/AuthContext';


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

      console.log(response);
      setIsSuccess(true);
      setErrorMessage('Registration successful! ');

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
    <div className='flex-col absolute top-0 left-0 w-full h-full bg-gray-400 flex justify-center items-center min-h-screen'>
      <div className='w-full relative max-w-sm bg-white m-auto flex flex-col p-4'>
        <h2 className='text-2xl font-bold mb-4 text-center'>
          Register
          <IoClose className='absolute top-3 right-3 cursor-pointer' onClick={() => navigate('/')} />
        </h2>

        {errorMessage && (
          <p className={`${isSuccess ? 'text-green-500' : 'text-red-500'} text-lg italic mb-4`}>
            {errorMessage}
          </p>
        )}

        <form className='w-full flex gap-4 flex-col' onSubmit={submitHandler}>
          <input
            type="text"
            placeholder='Username'
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
            required
          />
          <input
            type="email"
            placeholder='Email'
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
            required
          />
          <input
            type="password"
            placeholder='Password'
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
            required
          />
          <input
            type="password"
            placeholder='Confirm password'
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
            className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
            required
          />
          <button
            type="submit"
            className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
