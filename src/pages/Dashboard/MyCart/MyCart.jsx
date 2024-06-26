import { Link } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';

const MyCart = () => {
    const [cart, refetch, isCartLoading] = useCart()
    if (isCartLoading) {
        return <p>Your Cart Loading</p>
    }
    let price = cart.reduce((sum, item) => sum + item.price, 0)
    const handleDelete = (id) => {
        fetch(`https://react-restaurant-server-sable.vercel.app/carts/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result.deletedCount > 0) {
                    alert('Item Deleted')
                    refetch()
                }
                else {
                    alert('failed to delete')
                }
            })
    }
    return (
        <div className='text-black'>
            <div>
                <h3>Total items {cart.length}</h3>
                <h3>Total Price ${price}</h3>
                {cart.length > 0 && <Link to='/dashboard/payment' className='btn bg-[#D1A054] text-black text-white font-bold'>Proceed to Pay</Link>}
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-black'>
                        <tr>
                            <th></th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs">DELETE</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;