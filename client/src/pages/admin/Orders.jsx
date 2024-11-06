import React from 'react';
import Table from '../../components/Table';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import TableSearch from '../../components/TableSearch';
import { FaFilter } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { useGetAllOrdersQuery } from '../../api/orderSlice'; // Updated import to fetch orders

const Orders = () => {
  const navigate = useNavigate();

  // Fetching orders data instead of recipes
  const { data: ordersList = [] } = useGetAllOrdersQuery();

  // Sort orders by date, most recent first
  const sortedOrders = [...ordersList].sort((a, b) => new Date(b.date) - new Date(a.date));

  const columns = [
    {
      header: "S.no",
      accessor: "sNo", // updated accessor
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
      header: "Date & Time",
      accessor: "date", // Added to show date & time
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (order, index) => (
    <tr
      key={order._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="hidden md:table-cell pl-3">{index + 1}</td>
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{order._id}</h3> {/* Displaying Order ID */}
      </td>
      <td className="hidden md:table-cell">₹ {order.totalAmount}</td> {/* Displaying total amount */}
      <td className="hidden md:table-cell">{order.status}</td> {/* Displaying payment status */}
      <td className="hidden md:table-cell"> {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</td> {/* Displaying date & time */}
      <td>
        <div className="flex items-center gap-2">
          <button className="h-7 gap-2 w-full flex items-center justify-center rounded-full bg-lamaSky">
            <div><FaEye size={16} /></div>
            <div><FaEdit size={16} /></div>
            <div><MdDeleteForever size={16} /></div>
          </button>
        </div>
      </td>
    </tr>
  );

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
            {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow" onClick={() => navigate('/admin/orders/addOrder')}>
              <FaPlusCircle size={14} />
            </button> */}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={sortedOrders} />

      {/* PAGINATION */}
    </>
  );
}

export default Orders;
