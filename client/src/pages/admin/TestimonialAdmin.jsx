import React, { useEffect, useState } from 'react'
import TableSearch from '../../components/TableSearch'
import { FaEdit, FaFilter, FaPlusCircle, FaSortAmountDown } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import axios from '../../config/axiosConfig'
import Table from '../../components/Table'
import { useDeleteTestimonialMutation, useGetAllTestimonialQuery } from '../../api/testimonialSlice'
import Swal from 'sweetalert2'

const TestimonialAdmin = () => {


    const { data: testimonial } = useGetAllTestimonialQuery()

    const navigate = useNavigate();

    const [deleteTestimonial] = useDeleteTestimonialMutation();

    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

    const columns = [
        { header: "S.no", accessor: "S.no", className: "hidden md:table-cell" },
        { header: "Author Name", accessor: "authorName", className: "hidden md:table-cell" },
        {
            header: "Description", accessor: "description", className: "hidden md:table-cell"
        },
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
                    await deleteTestimonial(id).unwrap();

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

    const renderRow = (testimonial, index) => (
        <tr
            key={testimonial._id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className=" pl-3">{index + 1}</td>
            <td className="flex items-center gap-4 p-4">
                <img
                    src={backendUrl + '/' + testimonial.image}
                    alt=""
                    width={40}
                    height={40}
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                </div>
            </td>
            <td className='w-[500px] text-justify pr-10'>
                {testimonial.title}
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <button className="h-7 gap-2 w-full flex items-center  rounded-full bg-lamaSky">
                        <Link to={`/admin/testimonial/editTestimonial/${testimonial._id}`}> <FaEdit size={16} /></Link>
                        <Link onClick={() => handleDelete(testimonial._id)}><MdDeleteForever size={16} /></Link>
                    </button>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            {/* // Top */}
            < div className="flex items-center justify-between" >
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
                            <FaPlusCircle size={14} onClick={() => navigate('/admin/testimonial/addTestimonial')} />
                        </button>
                    </div>
                </div>
            </div >

            {/* // Table */}
            <Table columns={columns} renderRow={renderRow} data={testimonial} />
        </>
    )
}

export default TestimonialAdmin