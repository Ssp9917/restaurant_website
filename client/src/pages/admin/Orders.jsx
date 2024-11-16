import React, { useState } from 'react';
import Table from '../../components/Table';
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import TableSearch from '../../components/TableSearch';
import { FaFilter } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { useGetAdminOrdersQuery, useUpdateStatusMutation } from '../../api/orderSlice'; // Updated import to fetch orders
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import Swal from 'sweetalert2';

const Orders = () => {

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: ordersList = [],refetch } = useGetAdminOrdersQuery();

  // Sort orders by date, most recent first
  const sortedOrders = [...ordersList].sort((a, b) => new Date(b.date) - new Date(a.date));

  const [updateStatus] = useUpdateStatusMutation()

  const handleUpdateStatus = async (id) => {
    Swal.fire({
      title: "Update Order Status",
      html: `
        <select id="status-select" class="swal2-select" style="; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
          <option value="" disabled selected>Select a status</option>
          <option value="in-progress">In-Progress</option>
          <option value="cancel">Cancel</option>
          <option value="delivered">Delivered</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Update Status",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const status = document.getElementById("status-select").value;
        if (!status) {
          Swal.showValidationMessage("Please select a status.");
          return false;
        }
        return status;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const status = result.value; // Get the selected status
        try {
          // Update booking status
          await updateStatus({ id, status }).unwrap();
          refetch(); // Refetch bookings list if needed
  
          Swal.fire({
            title: "Success!",
            text: `The order status has been updated to "${status}".`,
            icon: "success",
          });
        } catch (error) {
          console.log(error)
          Swal.fire({
            title: "Error!",
            text: error?.data?.message || "Failed to update the status.",
            icon: "error",
          });
        }
      }
    });
  };
  

  const columns = [
    {
      header: "S.no",
      accessor: "sNo", // updated accessor
      className: "hidden md:table-cell",
    },
    {
      header: "Order ID",
      accessor: "_id", // Updated to show Order ID
    },
    {
      header: "Total Amount",
      accessor: "totalAmount", // Updated to show total amount
      className: "hidden md:table-cell",
    },
    {
      header: "Payment Status",
      accessor: "status", // Updated to show payment status
      className: "hidden md:table-cell",
    },
    {
      header: "Order Status",
      accessor: "order_status"
    },
    {
      header: "Date & Time",
      accessor: "date", // Added to show date & time
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (order, index) => {
    // Define the styles for payment
    const statusStyle = order.paymentStatus === 'completed' ? 'bg-green-700 text-white' : 'bg-yellow-600 text-white';

    // order status style
    const orderStatusStyle = order.status === "pending" ? 'bg-yellow-700 text-white' : order.status === "in-progress" ? "bg-blue-700 text-white" : order.status === "cancel" ? "bg-red-700 text-white" : "bg-green-700 text-white"

    return (
      <tr
        key={order._id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="hidden md:table-cell pl-3">{index + 1}</td>
        <td className="flex items-center gap-4 p-4">
          <h3 className="font-semibold md:w-full w-[90px] overflow-scroll scrollbar-none scroll-smooth transition-all">{order._id}</h3> {/* Displaying Order ID */}
        </td>
        <td className="hidden md:table-cell">₹ {order.totalAmount}</td> {/* Displaying total amount */}
        <td className={`hidden md:table-cell`}><div className={`${statusStyle} text-center rounded-full ml-5 mr-5 cursor-pointer`}>{order.paymentStatus}</div> </td> {/* Conditional styling for status */}
        <td className={`hidden md:table-cell`}><div className={`${orderStatusStyle} text-center rounded-full ml-5 mr-5 cursor-pointer`} onClick={()=>handleUpdateStatus(order._id)}>{order.status}</div> </td> {/* Conditional styling for status */}

        <td className="hidden md:table-cell"> {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</td> {/* Displaying date & time */}
        <td>
          <div className="flex items-center gap-2">
            <button className="h-7 gap-2 w-full flex items-center  rounded-full bg-lamaSky">
              <Link to={`/admin/order/${order._id}`}><div><FaEye size={16} /></div></Link>
              <div><MdDeleteForever size={16} /></div>
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Orders</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaFilter size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaSortAmountDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={sortedOrders} />


      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={sortedOrders.length}
      />
    </>
  );
};

export default Orders;
