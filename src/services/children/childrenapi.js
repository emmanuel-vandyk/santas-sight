import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from '@/hooks/useToast';

const toast = useToast();
// Variables backend data
// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_MOCK_API_URL;

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
      toast.success('Child updated successfully');
      queryClient.refetchQueries(['children'])
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};