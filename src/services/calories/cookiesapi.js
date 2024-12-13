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

// add quantity of cookies
export const useAddQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newQuantity) => {
      const formattedData = {
        quantity: newQuantity.quantity,
      };

      axios.post(
        `${API_URL}api/cookie/add-quantity/${newQuantity.id}`,
        formattedData
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries(["cookies"]);
      queryClient.refetchQueries(["calories"]);
    },
    onError: () => {
      console.log("Error updating cookies");
    },
  });
};

// update cookie
export const useUpdateCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cookie) => {
      const formattedData = {
        name: cookie.name,
        calories: cookie.calories,
      };

      axios.put(`${API_URL}api/cookie/${cookie.id}`, formattedData);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["cookies"]);
      queryClient.refetchQueries(["calories"]);
    },
  });
};

// delete cookies
export const useDeleteCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCookie) =>
      axios.delete(`${API_URL}api/cookie/${deletedCookie.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
      queryClient.refetchQueries(["calories"]);
    },
  });
};

// delete checked cookies
export const useDeleteCheckedCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCheckedCoookie) =>
      axios.all(
        deletedCheckedCoookie.map((deletedCookie) =>
          axios.delete(`${API_URL}api/cookie/${deletedCookie.id}`)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
      queryClient.refetchQueries(["calories"]);
    },
  });
};
