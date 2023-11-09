import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (user) {
        return children
    }
    if (loading) {
        return <p>Loading</p>
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRoutes;