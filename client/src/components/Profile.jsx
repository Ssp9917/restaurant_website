import React, { useContext } from 'react';
import { FaUser, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import BackButton from './BackIcon';

const Profile = () => {
  const { user } = useContext(AuthContext); // Assuming user data is in context

  return (
    <div className="h-screen bg-gray-50 p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6"> <span><BackButton/></span>Profile</h1>

      {/* Profile Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {/* Profile Image */}
          <div className="flex items-center space-x-3">
            {/* Conditional rendering for image or user icon */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {user === null ? (
                <img
                  src={user.image}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-gray-500 w-full h-full" />
              )}
            </div>

            {/* User Name */}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Name</span>
              <span className="text-gray-600">{user?.userName}</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-gray-500" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Email</span>
              <span className="text-gray-600">{user?.email}</span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="text-gray-500" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Phone</span>
              <span className="text-gray-600">{user == null ? user.phone : "+91 9918789399"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
