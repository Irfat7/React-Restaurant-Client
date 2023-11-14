import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomShapeBarChart from "./CustomShapeBarChart";

const AdminHome = () => {
    const { user, loading } = useContext(AuthContext)
    const [axiosInstance] = useAxiosSecure()

    const { data: stats = {} } = useQuery({
        queryKey: ['Admin-stats', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosInstance('/admin-stats')
            return res.data
        }
    })

    return (
        <div className="w-full m-4 text-center">
            <h1 className='text-5xl text-black font-medium mb-8'>Welcome, {user?.displayName || 'Admin'}</h1>

            <div className="stats">
                <div className="stat place-items-center">
                    <div className="text-2xl">Revenue</div>
                    <div className="stat-value text-secondary">${stats?.totalRevenue?.toFixed(2) || 0}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="text-2xl">Products</div>
                    <div className="stat-value">{stats?.products || 0}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="text-2xl">Users</div>
                    <div className="stat-value">{stats?.users || 0}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="text-2xl">Orders</div>
                    <div className="stat-value">{stats?.orders || 0}</div>
                </div>
            </div>

            <div>
                <CustomShapeBarChart>

                </CustomShapeBarChart>
            </div>

        </div>
    );
};

export default AdminHome;