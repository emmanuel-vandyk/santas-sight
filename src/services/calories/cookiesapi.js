import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_MOCK_API_URL;

// fetch all reindeers cookiess
export const useCookiesForSanta = () => {
  return useQuery({
    queryKey: ["cookies"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/cookiesForSanta`);
      return data;
    },
  });
};

// add new reindeer
export const useAddCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCookiesForSanta) =>
      axios.post(`${MOCKURL}/cookiesForSanta`, newCookiesForSanta),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};

// update reindeers cookies
export const useUpdateCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCookiesForSanta) =>
      axios.put(
        `${MOCKURL}/cookiesForSanta/${updatedCookiesForSanta.id}`,
        updatedCookiesForSanta
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};

// update checked reindeer cookiess
export const useUpdateCheckedCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCheckedCookiesForSanta) =>
      axios.all(
        updatedCheckedCookiesForSanta.map((cookies) =>
          axios.put(`${MOCKURL}/cookiesForSanta/${cookies.id}`, cookies)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};

// delete reindeers cookies
export const useDeleteCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCookiesForSanta) =>
      axios.delete(
        `${MOCKURL}/cookiesForSanta/${deletedCookiesForSanta.id}`,
        deletedCookiesForSanta
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};

// delete checked reindeer cookiess
export const useDeleteCheckedCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCheckedCookiesForSanta) =>
      axios.all(
        deletedCheckedCookiesForSanta.map((cookies) =>
          axios.delete(`${MOCKURL}/cookiesForSanta/${cookies.id}`, cookies)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};
