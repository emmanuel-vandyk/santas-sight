import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_MOCK_API_URL;

// fetch all reindeers organizations
export const useReindeersOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/reindeerOrganizations`);
      return data;
    },
  });
};

// add new reindeer
export const useAddReindeersOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReindeersOrganization) =>
      axios.post(`${MOCKURL}/reindeerOrganizations`, newReindeersOrganization),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

// update reindeers organization
export const useUpdateReindeersOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedReindeersOrganization) =>
      axios.put(
        `${MOCKURL}/reindeerOrganizations/${updatedReindeersOrganization.id}`,
        updatedReindeersOrganization
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

// update reindeer organizations
export const useUpdateReindeerOrganizations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedReindeerOrganizations) =>
      axios.all(
        updatedReindeerOrganizations.map((organization) =>
          axios.put(
            `${MOCKURL}/reindeerOrganizations/${organization.id}`,
            organization
          )
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

// delete reindeers organization
export const useDeleteReindeersOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedReindeersOrganization) =>
      axios.delete(
        `${MOCKURL}/reindeerOrganizations/${deletedReindeersOrganization.id}`,
        deletedReindeersOrganization
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

// delete checked reindeer organizations
export const useDeleteCheckedReindeerOrganizations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCheckedReindeerOrganization) =>
      axios.all(
        deletedCheckedReindeerOrganization.map((organization) =>
          axios.delete(
            `${MOCKURL}/reindeerOrganizations/${organization.id}`,
            organization
          )
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};
