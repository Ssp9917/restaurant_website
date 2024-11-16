import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TableSearch from '../../components/TableSearch';
import Table from '../../components/Table';
import { FaEdit, FaFilter, FaPlusCircle, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useDeleteBookingMutation, useGetAllBookingQuery, useUpdateStatusForTableMutation } from '../../api/bookingTable';
import Swal from 'sweetalert2';
import Pagination from './Pagination';
import { paginateItems } from '../../utility/utils';

const Booking = () => {
  const { data, isLoading, error, refetch } = useGetAllBookingQuery();
  const navigate = useNavigate();
  // pagination
  const [currentPage,setCurrentPage] = useState(1)
  const itemsPerPage = 10;

  const bookings = data?.bookings || []; // Fallback to an empty array if data or bookings is undefined

  const [deleteBooking] = useDeleteBookingMutation();
  const [updateStatusForTable] = useUpdateStatusForTableMutation();


  const paginatedData = paginateItems(bookings, currentPage, itemsPerPage);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // console.log(result)
      if (result.isConfirmed) {
        try {
          // Perform deletion via mutation
          await deleteBooking(id).unwrap();
          refetch()

          Swal.fire({
            title: "Deleted!",
            text: "The booking has been deleted.",
            icon: "success",
          });
        } catch (error) {
          // Handle error if deletion fails
          Swal.fire({
            title: "Error!",
            text: error?.data?.message || "Failed to delete the item.",
            icon: "error",
          });
        }
      }
    })
  }

  // const handleUpdateStatus = async (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "This will confirm the booking!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, confirm it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         // Update the status via RTK Query mutation
  //         await updateStatus({id,status:"confirm"}).unwrap();
  //         refetch(); // Refetch bookings list if needed

  //         Swal.fire({
  //           title: "Confirmed!",
  //           text: "The booking status has been updated.",
  //           icon: "success",
  //         });
  //       } catch (error) {
  //         // Handle error if update fails
  //         Swal.fire({
  //           title: "Error!",
  //           text: error?.data?.message || "Failed to update the status.",
  //           icon: "error",
  //         });
  //       }
  //     }
  //   });
  // };



  const handleUpdateStatus = async (id) => {
    Swal.fire({
      title: "What would you like to do?",
      text: "You can confirm or cancel this booking.",
      icon: "question",
      showCancelButton: true,
      showDenyButton: true, // Enable a second button
      confirmButtonColor: "#3085d6", // Confirm button color
      cancelButtonColor: "#d33", // Cancel button color
      denyButtonColor: "#f0ad4e", // Deny button color (optional)
      confirmButtonText: "Confirm Booking", // Confirm button text
      denyButtonText: "Cancel Booking", // Deny button text
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Confirm booking status update
          await updateStatusForTable({ id, status: "confirm" }).unwrap();
          refetch(); // Refetch bookings list if needed

          Swal.fire({
            title: "Confirmed!",
            text: "The booking status has been updated to confirmed.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.data?.message || "Failed to update the status.",
            icon: "error",
          });
        }
      } else if (result.isDenied) {
        try {
          // Cancel booking status update
          await updateStatusForTable({ id, status: "cancel" }).unwrap();
          refetch(); // Refetch bookings list if needed

          Swal.fire({
            title: "Cancelled!",
            text: "The booking status has been updated to cancelled.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.data?.message || "Failed to update the status.",
            icon: "error",
          });
        }
      }
    });
  };



  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  const columns = [
    { header: "S.no", accessor: "S.no", className: "hidden md:table-cell" },
    { header: "Name", accessor: "name", className: "hidden md:table-cell" },
    { header: "Phone Number", accessor: "phone", className: "hidden md:table-cell" },
    { header: "Person", accessor: "person", className: "hidden md:table-cell" },
    { header: "Message", accessor: "message", className: "hidden md:table-cell" },
    { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    { header: "Time", accessor: "time", className: "hidden md:table-cell" },
    { header: "Table No.", accessor: "tableNo", className: "hidden md:table-cell" },
    { header: "Status", accessor: "status", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action", className: "hidden md:table-cell" },
  ];

  const renderRow = (booking, index) => (
    <tr
      key={booking._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="pl-3">{index + 1}</td> {/* Serial Number */}
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{booking.name}</h3>
        </div>
      </td>
      <td>{booking.phone}</td>
      <td>{booking.person}</td>
      <td className='w-[200px]'>{booking.message}</td>
      <td>{formatDate(booking.date)}</td> {/* Convert date to readable format */}
      <td>{booking.time}</td>
      <td className='text-center'>{booking.tableNo}</td>
      <td onClick={() => handleUpdateStatus(booking._id)} className={`cursor-pointer`}><div className={`p-2 rounded-full ${booking.status === "pending" ? 'bg-yellow-600 text-white text-center' : booking.status === "cancel" ? 'bg-red-700 text-center text-white':"bg-green-700 text-white"}`}>

        {booking.status}</div></td>
      <td>
        <div className="flex items-center gap-2">
          {/* <Link to={`/admin/category/editCategory/${booking._id}`} className=" flex items-center rounded-full">
            <FaEdit size={16} />
          </Link> */}
          <button onClick={() => handleDelete(booking._id)} className="flex items-center rounded-full justify-center w-full ">
            <MdDeleteForever size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  return (
    <>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Bookings</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaFilter size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaSortAmountDown size={14} />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
              onClick={() => navigate('/admin/category/addCategory')}
            >
              <FaPlusCircle size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={paginatedData} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={bookings.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Booking;
