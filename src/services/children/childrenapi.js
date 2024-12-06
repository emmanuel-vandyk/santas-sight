import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// Variables backend data
// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_PROD_API_URL;

// fetch all children
export const useChildren = () => {
  return useQuery({
    queryKey: ["children"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/children`); // /api/children
      return data;
    },
  });
};

// update child
export const useUpdateChild = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedChild) => {
      try {
        const response = await axios.patch(`${MOCKURL}/children/${updatedChild.id}`, updatedChild);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating child');
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries(['children'])
    },
    onError: () => {
      console.log('Error updating child');
    }
  });
};