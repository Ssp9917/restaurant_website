import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import TableSearch from '../../components/TableSearch';
import { FaFilter } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { useGetAdminOrdersQuery } from '../../api/orderSlice'; // Updated import to fetch orders
import { Link } from 'react-router-dom';
import axios from '../../config/axiosConfig'
import Pagination from './Pagination';
import { paginateItems } from '../../utility/utils';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(
    () => {
      axios.get('/auth/getAllUser').then(
        (res) => {
          console.log(res)
          setUsers(res.data.users)
        }
      ).catch(
        (err) => {
          console.log(err)
        }
      )
    }, []
  )

  const columns = [
    {
      header: "S.no",
      accessor: "sNo", // updated accessor
    },
    {
      header: "User ID",
      accessor: "_id", // Updated to show Order ID
    },
    {
      header: "Name",
      accessor: "name", // Updated to show total amount
      className: "hidden md:table-cell",
    },
    {
      header: "Email",
      accessor: "email", // Updated to show payment status
      className: "hidden md:table-cell",
    },
    {
      header: "Status",
      accessor: "status", // Added to show date & time
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (user, index) => {
    // Define the styles for different statuses
    // const statusStyle = order.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-white';

    return (
      <tr
        key={user._id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="hidden md:table-cell pl-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td className="flex items-center gap-4 p-4">
          <h3 className="font-semibold">{user._id}</h3> {/* Displaying Order ID */}
        </td>
        <td className="hidden md:table-cell"> {user.userName}</td> {/* Displaying total amount */}
        <td className={`hidden md:table-cell`}><div className={`rounded-full ml-5 mr-5 cursor-pointer`}>{user.email}</div> </td> {/* Conditional styling for status */}
        <td className="hidden md:table-cell">Verified</td>
        <td>
          <div className="flex items-center gap-2">
            <button className="h-7 gap-2 w-full flex items-center  rounded-full bg-lamaSky">
              <Link
              //  to={`/admin/order/${user._id}`}
              ><div><FaEye size={16} /></div></Link>
              <div><MdDeleteForever size={16} /></div>
            </button>
          </div>
        </td>
      </tr>
    );
  };

  // pagination
  const paginatedData = paginateItems(users, currentPage, itemsPerPage);

  return (
    <>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Users</h1>
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
      <Table columns={columns} renderRow={renderRow} data={paginatedData} />


      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={users?.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Users;
