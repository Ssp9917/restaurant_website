import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaFilter, FaSortAmountDown, FaPlusCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import TableSearch from '../../components/TableSearch';
import Table from '../../components/Table';
import { useDeleteOfferMutation, useGetAllOffersQuery } from '../../api/offerSlice';
import Swal from 'sweetalert2';

const Offers = () => {
  const { data,refetch } = useGetAllOffersQuery();
  const offers = data?.offers || [];
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  const [deleteOffer] = useDeleteOfferMutation()

  const columns = [
    { header: "S.no", accessor: "S.no", className: "hidden md:table-cell" },
    { header: "Offer", accessor: "name" },
    { header: "Discount", accessor: "discount", className: "hidden md:table-cell" },
    { header: "Description", accessor: "description", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action" },
  ];

  const handleDelete = (id) => {
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
          await deleteOffer(id).unwrap();
          refetch()
          Swal.fire("Deleted!", "The item has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", error?.data?.message || "Failed to delete the item.", "error");
        }
      }
    });
  };


  const renderRow = (item, index) => (
    <tr key={item._id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="hidden md:table-cell pl-3">{index + 1}</td>
      <td className="flex items-center gap-4 p-4">
        <img src={`${backendUrl}/${item.offerImage}`} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        <h3 className="font-semibold">{item.title}</h3>
      </td>
      <td className="hidden md:table-cell">{item.discount} %</td>
      <td className="hidden md:table-cell">{item.description}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link to={`/admin/offer/editOffer/${item._id}`}><FaEdit size={16} /></Link>
          <MdDeleteForever size={16} onClick={() => handleDelete(item._id)} />
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Offers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaFilter size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <FaSortAmountDown size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow" onClick={() => navigate('/admin/offer/addOffer')}>
              <FaPlusCircle size={14} />
            </button>
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={offers} />
    </>
  );
};

export default Offers;
