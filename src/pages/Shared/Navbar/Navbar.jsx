import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useCart } from "../../../hooks/useCart";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext)
    const [cart, ,isCartLoading] = useCart()

    const handleLogout = () => {
        logOut()
            .then(() => console.log('user logged out'))
            .catch(err => console.log('logout error ', err.message))
    }

    if(isCartLoading || loading){
        return <p>123</p>
    }

    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/menu'>Menu</Link></li>
                    <li><Link to='/order'>Order</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Sign-up</Link></li>
                    {
                        user ?
                            <>
                                <button onClick={handleLogout} className="">Logout</button>
                            </>
                            : <></>
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/dashboard/mycart'>
                    <button className="btn btn-ghost">
                        Cart
                        <div className="badge badge-secondary">{cart.length}</div>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;