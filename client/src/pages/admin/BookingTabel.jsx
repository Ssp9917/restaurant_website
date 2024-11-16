import React from 'react'
import TableSearch from '../../components/TableSearch'
import { FaEdit, FaFilter, FaPlusCircle, FaSortAmountDown } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useGetAllTableQuery } from '../../api/tableSlice'
import Table from '../../components/Table'
import { MdDeleteForever } from 'react-icons/md'

const BookingTabel = () => {

  const navigate = useNavigate()

  const {data} = useGetAllTableQuery()

  const tables = data?.tables || []

  console.log(tables)


  const columns = [
    { header: "S.no", accessor: "S.no", className: "hidden md:table-cell" },
    { header: "Table Number", accessor: "table_number", className: "hidden md:table-cell" },
    { header: "Capicity", accessor: "capicity", className: "hidden md:table-cell" },
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
          <h3 className="font-semibold">{booking.tableNumber}</h3>
        </div>
      </td>
      <td className=''>{booking.capacity}</td>
      <td onClick={() => handleUpdateStatus(booking._id)} className={`cursor-pointer`}><div className={`ml-2 me-2 text-center rounded-full ${booking.status === "available" ? 'bg-gray-600 text-white text-center' : booking.status === "booked" ? 'bg-green-700 text-center text-white':"bg-red-700 text-white"}`}>

        {booking.status}</div></td>
      <td>
        <div className="flex items-center">
          <Link to={`/admin/category/editCategory/${booking._id}`} className=" flex items-center rounded-full">
            <FaEdit size={16} />
          </Link>
          <button onClick={() => handleDelete(booking._id)} className="flex items-center rounded-full  w-full ">
            <MdDeleteForever size={16} />
          </button>
        </div>
      </td>
    </tr>
  );




  return (
   <>
    {/* TOP */}
    <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Tables</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaFilter size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaSortAmountDown size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaPlusCircle size={14} onClick={() => navigate('/admin/table/add')} />
            </button>
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={tables}/>
   </>
  )
}

export default BookingTabel