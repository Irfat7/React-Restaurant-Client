import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const UserHome = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className="w-full m-4 text-center">
            <h1 className='text-2xl text-black font-medium'>Welcome, {user?.displayName || 'User'}</h1>
        </div>
    );
};

export default UserHome;