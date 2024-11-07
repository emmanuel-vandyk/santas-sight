import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_MOCK_API_URL;
const URL2 = "http://localhost:3000";

// fetch all elves

export const useElves = () => {
  return useQuery({
    queryKey: ["elves"],
    queryFn: async () => {
      const { data } = await axios.get(`${URL2}/allElves`);
      return data;
    },
  });
};

// add new elve

export const useAddElves = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newElve) => axios.post(`${URL2}/allElves`, newElve),
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
      axios.put(`${URL2}/allElves/${updatedElve.id}`, updatedElve),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elves"] });
    },
  });
};

// delete elve

export const useDeleteElves = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (elvesId) => axios.delete(`${URL2}/allElves/${elvesId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elves"] });
    },
  });
};
