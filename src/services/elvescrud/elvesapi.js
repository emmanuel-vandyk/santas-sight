import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
