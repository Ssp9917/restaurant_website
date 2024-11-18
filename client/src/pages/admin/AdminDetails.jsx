import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useGetAdminDetailQuery, useUpdateAdminDetailMutation } from "../../api/adminDetailsSlice";

const AdminDetails = () => {
  const { data, isLoading, isError } = useGetAdminDetailQuery(); // Fetch admin details
  const [updateAdminDetail] = useUpdateAdminDetailMutation(); // Update admin details
  const [logo, setLogo] = useState(null);
  const [newLogo, setNewLogo] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

  // Set the prefilled logo
  useEffect(() => {
    if (data && data.adminDetails) {
      setLogo(data.adminDetails.adminLogo);
    }
  }, [data]);

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewLogo(e.target.files[0]);
    }
  };

  // // Handle form submission to update the logo
  const handleUpdateLogo = async () => {
    if (!newLogo) {
      Swal.fire("Error", "Please select a logo to upload", "error");
      return;
    }

    const formData = new FormData();
    formData.append("adminLogo", newLogo);

    try {
      await updateAdminDetail(formData).unwrap();
      Swal.fire("Success", "Logo updated successfully", "success");
      setNewLogo(null); // Clear input
    } catch (error) {
      Swal.fire("Error", "Failed to update the logo", "error");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching admin details</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Logo Display */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg font-semibold">Logo</p>
        {logo ? (
          <img
            src={`${backendUrl}/uploads/${logo}`} // Adjust based on API path
            alt="Admin Logo"
            className="w-24 h-24 object-cover rounded-full border border-gray-300"
          />
        ) : (
          <p className="text-gray-500">No logo uploaded</p>
        )}
      </div>

      {/* File Input */}
      <div className="flex flex-col space-y-4">
        <label htmlFor="logoUpload" className="text-gray-700 font-medium">
          Upload New Logo
        </label>
        <input
          type="file"
          id="logoUpload"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
      </div>

      {/* Update Button */}
      <button
        onClick={handleUpdateLogo}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Update Logo
      </button>
    </div>
  );
};

export default AdminDetails;
