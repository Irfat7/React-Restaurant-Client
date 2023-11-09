import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useCart } from '../../hooks/useCart';

const FoodCard = ({ item }) => {
    const { _id, image, price, recipe, name } = item
    const [, refetch] = useCart()
    const { user } = useContext(AuthContext)

    const addToCart = item => {
        if (user) {
            const cartItem = { cartId: _id, image, price, recipe, name, email: user?.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()
                    }
                })
            return
        }
        alert('login')
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} /></figure>
            <p className='absolute right-0 mr-4 mt-4 p-2 rounded-md bg-slate-900 text-white'>${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => addToCart(item)} className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;