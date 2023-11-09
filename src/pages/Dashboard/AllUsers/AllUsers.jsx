import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosInstance] = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosInstance.get('/users')
            return res.data
        }
    })

    const handleRole = (id, currentRole) => {
        let role = currentRole === undefined || currentRole === 'default' ? 'admin' : 'default'
        fetch(`http://localhost:5000/users/admin/${id}?role=${role}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    alert(`${role}  role assigned`)
                    refetch()
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-black">
                    <thead className='text-black'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><button className='btn btn-accent' onClick={() => handleRole(user._id, user.role)}>
                                        {
                                            user.role === 'admin' ? 'Make User' : 'Make Admin'
                                        }
                                    </button></td>
                                    <td><button className='btn btn-accent'>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;