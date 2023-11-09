import React, { useContext } from 'react';
import useMenu from '../../../hooks/useMenu';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
    const { user, loading } = useContext(AuthContext)
    const [menu, isMenuLoading ,refetchMenu] = useMenu()
    const [axiosInstance] = useAxiosSecure()

    const handleMenuDelete = id => {
        Swal.fire({
            title: "Progress to delete?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/menu/${id}`)
                    .then(({ data }) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Item Deleted",
                                icon: "success"
                            });
                            refetchMenu()
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='text-black font-medium text-xl'>
            <h1 className='text-3xl text-center my-4'>Manage Items</h1>
            <div className="overflow-x-auto">
                <table className="table text-black">
                    <thead className='text-black text-xl'>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((menuItem, index) =>
                                <tr key={menuItem._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img className='w-[100px]' src={menuItem.image} />
                                    </td>
                                    <td>{menuItem.name}</td>
                                    <td>{menuItem.price}</td>
                                    <td className='space-x-3'>
                                        <button className='btn btn-accent'>Edit</button>
                                        <button onClick={() => handleMenuDelete(menuItem._id)} className='btn btn-error'>Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;