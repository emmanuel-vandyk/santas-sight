import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const URL = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_PROD_API_URL;

// fetch santa calories
export const useSantaCalories = () => {
  return useQuery({
    queryKey: ["calories"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}api/cookie/stats`);
      return data.data;
    },
  });
};

// fetch all cookiess
export const useCookiesForSanta = () => {
  return useQuery({
    queryKey: ["cookies"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}api/cookie`);
      return data.data;
    },
  });
};

// add new cookie
export const useAddCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCookiesForSanta) =>
      axios.post(`${API_URL}api/cookie`, newCookiesForSanta),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
      queryClient.refetchQueries(["calories"]);
    },
  });
};

// add the consumption of a cookie.
export const useAddConsumption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newConsumption) =>
      axios.post(`${API_URL}api/cookie/consume`, newConsumption),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
      queryClient.refetchQueries(["calories"]);
    },
  });
};

// add the consumption of cookies.
export const useAddMultipleConsumption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newMultipleConsumption) =>
      axios.all(
        newMultipleConsumption.map((cookies) =>
          axios.post(`${API_URL}api/cookie/consume`, cookies)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
      queryClient.refetchQueries(["calories"]);
    },
  });
};

// update cookie
export const useUpdateCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCookiesForSanta) =>
      axios.put(
        `${API_URL}api/cookie/${updatedCookiesForSanta.id}`,
        updatedCookiesForSanta
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};

// delete cookies
export const useDeleteCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCookiesForSanta) =>
      axios.delete(
        `${API_URL}api/cookie/${deletedCookiesForSanta.id}`,
        deletedCookiesForSanta
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};

// delete checked cookies
export const useDeleteCheckedCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCheckedCookiesForSanta) =>
      axios.all(
        deletedCheckedCookiesForSanta.map((cookies) =>
          axios.delete(`${API_URL}api/cookie/${cookies.id}`, cookies)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};
