import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'

export const useCart = () => {
    const { user, loading } = useContext(AuthContext)
    const email = user?.email
    const { data: cart = [], refetch, isLoading: isCartLoading } = useQuery({
        queryKey: ['cart', email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/carts?email=${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.json()
        },
    })

    return [cart, refetch, isCartLoading]
}