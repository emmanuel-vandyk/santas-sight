import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const URL = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_PROD_API_URL;

// fetch all elves
export const useElves = (page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', filter = {}) => {
  return useQuery({
    queryKey: ["elves", page, limit, sortBy, sortOrder, filter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
        ...(filter.name ? { name: filter.name } : {})
      });
      const { data } = await axios.get(`${API_URL}/api/elfo?${params.toString()}`);
      return data;
    },
    keepPreviousData: true,
    staleTime: 5000,
  });
};

// add new elve
export const useAddElves = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newElve) => axios.post(`${API_URL}/api/elfo`, newElve), // /api/elve
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elves"] });
    },
  });
};

// update elve
export const useUpdateElves = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedElve) =>
      axios.put(`${API_URL}/api/elfo/${updatedElve.id}`, updatedElve), // /api/elve
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elves"] });
    },
  });
};

// logical delete elve
export function useLogicalDeleteElves() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (elveId) => {
      const response = await axios.patch(`${API_URL}/api/elfo/${elveId}`, {
        isDeleted: true,
      }); // /api/elve/delete/
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elves"] });
    },
  });
}

// restore elve
export function useRestoreElves() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (elveId) => {
      const response = await axios.patch(`${API_URL}/api/elfo/${elveId}`, {
        isDeleted: false,
      }); // /api/elve/delete/
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elves"] });
    },
  });
}
