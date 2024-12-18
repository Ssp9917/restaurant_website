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
import { useDeleteBannerMutation, useGetAllBannersQuery } from '../../api/bannerSlice';
import Swal from 'sweetalert2';

const Banners = () => {
  const navigate = useNavigate();

  const { data,refetch } = useGetAllBannersQuery();
  const [deleteBanner] = useDeleteBannerMutation();

  console.log(data)

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

  // console.log(homeProductCartList)


  const columns = [
    {
      header: "S.no",
      accessor: "S.no",
    },
    {
      header: "Banner Image",
      accessor: "bannerName",
      className: "hidden md:table-cell",
    },
    {
      header: "Banner Name",
      accessor: "bannerImage",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

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
      if (result.isConfirmed) {
        try {
          await deleteBanner(id).unwrap();
          refetch()
          Swal.fire("Deleted!", "The item has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", error?.data?.message || "Failed to delete the item.", "error");
        }
      }
    });
  };


  const renderRow = (data, index) => (
    <tr
      key={data._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="hidden md:table-cell pl-3">{index + 1}</td>
      <td className="flex items-center gap-4 p-4">
        <img
          src={backendUrl + '/' + data.bannerImage}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
      </td>
      <td className="hidden md:table-cell">{data.bannerName}</td>
      {/* <td className="hidden md:table-cell">₹ {homeProductCartList.price}</td> */}
      <td>
        <div className="flex items-center gap-2">
          <button className="h-7 gap-2 w-full flex items-center rounded-full bg-lamaSky">
            {/* <div><FaEye size={16} /></div> */}
            <Link to={`/admin/banner/editBanner/${data._id}`}><FaEdit size={16} /></Link>
            <div><MdDeleteForever size={16} onClick={() => handleDelete(data._id)} /></div>
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Banners</h1>
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
              <FaPlusCircle size={14} onClick={() => navigate('/admin/banner/addBanner')} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
    </>


  )
}

export default Banners