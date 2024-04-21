import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import useAxiosSecure from './useAxiosSecure'

export const useCart = () => {
    const { user } = useContext(AuthContext)
    const [axiosInstance] = useAxiosSecure()
    const email = user?.email
    const { data: cart = [], refetch, isLoading: isCartLoading } = useQuery({
        queryKey: ['cart', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/carts?email=${email}`)
            return res.data
        },
    })

    return [cart, refetch, isCartLoading]
}