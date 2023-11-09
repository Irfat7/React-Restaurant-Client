import { Navigate, useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";

const AdminRoutes = ({ children }) => {
    const { isAdmin, isLoading } = useAdmin()
    const navigate = useNavigate()

    if (isLoading) {
        return <p>Loading</p>
    }
    else if (isAdmin) {
        return children
    }
    return <Navigate to='/'></Navigate>
};

export default AdminRoutes;