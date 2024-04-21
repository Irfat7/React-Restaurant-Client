import { useQuery } from "@tanstack/react-query"

const useMenu = () => {

    const { data: menu = [], isLoading: isMenuLoading, refetch: refetchMenu} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch('https://react-restaurant-server-sable.vercel.app/menu')
            const data = res.json()
            return data
        }
    })

    return [menu, isMenuLoading, refetchMenu]
}

export default useMenu