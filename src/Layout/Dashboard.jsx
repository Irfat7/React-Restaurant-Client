import { NavLink, Outlet } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";

const Dashboard = () => {
    const { isAdmin, isLoading } = useAdmin();

    if(isLoading){
        return <p>loading</p>
    }

    return (
        <div>
            <div className="drawer black lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="font-medium text-lg menu p-4 w-80 min-h-full bg-[#D1A054] text-black">
                        {/* Sidebar content here */}
                        {
                            isAdmin.admin ? <>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/adminhome'>Admin Home</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/additems'>Add Items</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/manageitems'>Manage Items</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/mycart'>Manage Bookings</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/allusers'>All Users</NavLink></li>
                            </> : <>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/userhome'>User Home</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/mycart2'>Reservation</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/mycart1'>Payment History</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/dashboard/mycart'>My Cart</NavLink></li>
                            </>
                        }
                        <div className="divider"></div>
                        <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/'>Home</NavLink></li>
                        <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/menu'>Menu</NavLink></li>
                        <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/order'>Shop</NavLink></li>
                        <li><NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to='/'>Contact</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;