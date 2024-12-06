import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_PROD_API_URL;

export const useReindeers = () => {
  return useQuery({
    queryKey: ["reindeers"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/api/reindeer`);
      return data.data;
    },
  });
};

export const useAddReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReindeer) => {
      const formattedData = {
        ...newReindeer,
        skills: newReindeer.skills.map(s => ({
          ...s,
          value: Number(s.value)
        }))
      };
      return axios.post(`${MOCKURL}/api/reindeer`, formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

export const useUpdateReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedReindeer) => {
      const { id, skills, ...reindeerData } = updatedReindeer;
      const formattedData = {
        ...reindeerData,
        id: Number(id),
        skills: skills.map(s => ({
          skill: s.skill,
          value: Number(s.value)
        }))
      };
      return axios.put(`${MOCKURL}/api/reindeer/${formattedData.id}`, formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

export const useUpdateCheckedReindeers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCheckedReindeers) =>
      axios.all(
        updatedCheckedReindeers.map((reindeer) => {
          const formattedData = {
            ...reindeer,
            id: Number(reindeer.id),
            skills: reindeer.skills.map(s => ({
              ...s,
              value: Number(s.value)
            }))
          };
          return axios.put(`${MOCKURL}/api/reindeer/${formattedData.id}`, formattedData);
        })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

export const useDeleteReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedReindeer) =>
      axios.delete(`${MOCKURL}/api/reindeer/${Number(deletedReindeer.id)}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

export const useDeleteCheckedReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCheckedReindeer) =>
      axios.all(
        deletedCheckedReindeer.map((reindeer) =>
          axios.delete(`${MOCKURL}/api/reindeer/${Number(reindeer.id)}`)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};
