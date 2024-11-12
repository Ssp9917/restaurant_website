import React, { useState } from 'react';
import Table from '../../components/Table';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaFilter, FaPlusCircle } from "react-icons/fa";
import TableSearch from '../../components/TableSearch';
import Pagination from './Pagination';
import { useDeleteRecipeMutation, useGetAllRecipeQuery } from '../../api/recipeSlice';
import Swal from 'sweetalert2';
import { searchItems, paginateItems, sortItems } from '../../utility/utils';
import SortDropdown from './ShortDropdown';
import { MdDeleteForever } from "react-icons/md";

const Recipe = () => {
  const navigate = useNavigate();
  const { data: homeProductCartList = [] } = useGetAllRecipeQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortKey, setSortKey] = useState('name');
  const itemsPerPage = 10;
  const [deleteRecipe] = useDeleteRecipeMutation();
  


  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

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
          await deleteRecipe(id).unwrap();
          Swal.fire("Deleted!", "The item has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", error?.data?.message || "Failed to delete the item.", "error");
        }
      }
    });
  };

  // Apply search, sort, and pagination
  const filteredData = searchItems(homeProductCartList, searchQuery, ['name', 'category.name']);
  const sortedData = sortItems(filteredData, sortKey, sortOrder);
  const paginatedData = paginateItems(sortedData, currentPage, itemsPerPage);

  const handleSortChange = (order, key) => {
    setSortOrder(order);
    setSortKey(key);
  };

  const columns = [
    { header: "S.no", accessor: "S.no", className: "hidden md:table-cell" },
    { header: "Recipe Name", accessor: "name" },
    { header: "Category", accessor: "category.name", className: "hidden md:table-cell" },
    { header: "Price", accessor: "price", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item, index) => (
    <tr key={item._id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="hidden md:table-cell pl-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td className="flex items-center gap-4 p-4">
        <img src={`${backendUrl}/${item.image}`} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">{item.category.name}</td>
      <td className="hidden md:table-cell">₹ {item.price}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link to={`/admin/recipe/editRecipe/${item._id}`}><FaEdit size={16} /></Link>
          <MdDeleteForever size={16} onClick={() => handleDelete(item._id)} />
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Search, Sort, and Action Buttons */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Recipe</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex items-center gap-4">
            <SortDropdown onSortChange={handleSortChange} />
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow" onClick={() => navigate('/admin/recipe/addRecipe')}><FaPlusCircle size={14} /></button>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} renderRow={renderRow} data={paginatedData} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={sortedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Recipe;
