import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_PROD_API_URL;

// fetch santa calories
export const useSantaCalories = () => {
  return useQuery({
    queryKey: ["calories"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/api/santaCalories`);
      return data;
    },
  });
};

// fetch all cookiess
export const useCookiesForSanta = () => {
  return useQuery({
    queryKey: ["cookies"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/api/cookiesForSanta`);
      return data;
    },
  });
};

// add new cookie
export const useAddCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCookiesForSanta) =>
      axios.post(`${MOCKURL}/api/cookiesForSanta`, newCookiesForSanta),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};

/** ¡INFO!
 *
 * Update calories info:
 * This is just for the mock. This section will not be used once calculations are handled by the backend.
 *
 */
export const useUpdateCaloriesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCaloriesForSanta) =>
      axios.put(`${MOCKURL}/api/santaCalories`, updatedCaloriesForSanta),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calories"] });
    },
  });
};

// update cookie
export const useUpdateCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCookiesForSanta) =>
      axios.put(
        `${MOCKURL}/api/cookiesForSanta/${updatedCookiesForSanta.id}`,
        updatedCookiesForSanta
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};

// update checked cookiess
export const useUpdateCheckedCookiesForSanta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCheckedCookiesForSanta) =>
      axios.all(
        updatedCheckedCookiesForSanta.map((cookies) =>
          axios.put(`${MOCKURL}/api/cookiesForSanta/${cookies.id}`, cookies)
        )
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
        `${MOCKURL}/api/cookiesForSanta/${deletedCookiesForSanta.id}`,
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
          axios.delete(`${MOCKURL}/api/cookiesForSanta/${cookies.id}`, cookies)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cookies"] });
    },
  });
};
