import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { useQuery } from "@tanstack/react-query"

const useMenu = () => {

    const { data: menu = [], isLoading: isMenuLoading, refetch: refetchMenu} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/menu')
            const data = res.json()
            return data
        }
    })

    return [menu, isMenuLoading, refetchMenu]
}

export default useMenu