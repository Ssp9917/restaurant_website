import React from 'react';
import Table from '../../components/Table';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaFilter, FaSortAmountDown, FaPlusCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import TableSearch from '../../components/TableSearch';
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../../api/categorySlice';
import Swal from 'sweetalert2'

const Categories = () => {

  const navigate = useNavigate();

  const { data: categoryList } = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

  const columns = [
    { header: "S.no", accessor: "S.no", className: "hidden md:table-cell" },
    { header: "Category Name", accessor: "categoryName", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action", className: "hidden md:table-cell" },
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
      // console.log(result)
      if (result.isConfirmed) {
        try {
          // Perform deletion via mutation
          await deleteCategory(id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "The item has been deleted.",
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

  const renderRow = (categoryList, index) => (
    <tr
      key={categoryList._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className=" pl-3">{index + 1}</td> {/* Serial Number */}
      <td className="flex items-center gap-4 p-4">
        <img
          src={backendUrl + '/' + categoryList.categoryImage}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">

          <h3 className="font-semibold">{categoryList.name}</h3>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <button className="h-7 gap-2 w-full flex items-center  rounded-full bg-lamaSky">
            <Link to={`/admin/category/editCategory/${categoryList._id}`}> <FaEdit size={16} /></Link>
            <Link onClick={() => handleDelete(categoryList._id)}><MdDeleteForever size={16} /></Link>
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Categories</h1>
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
              <FaPlusCircle size={14} onClick={() => navigate('/admin/category/addCategory')} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={categoryList} />

      {/* PAGINATION */}
    </>
  );
};

export default Categories
