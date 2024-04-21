import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const email = user?.email;

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ['isAdmin', email],
    queryFn: async () => {
      const res = await fetch(`https://react-restaurant-server-sable.vercel.app/users/admin-check/${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      });
      return res.json();
    },
  });
  return { isAdmin, isLoading };
};
