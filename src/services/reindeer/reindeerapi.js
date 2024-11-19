import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { promise } from "zod";

// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_MOCK_API_URL;

// fetch all reindeers
export const useReindeers = () => {
  return useQuery({
    queryKey: ["reindeers"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/reindeers`);
      return data;
    },
  });
};

// add new reindeer
export const useAddReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReindeer) =>
      axios.post(`${MOCKURL}/reindeers`, newReindeer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

// update reindeer
export const useUpdateReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedreindeer) =>
      axios.put(`${MOCKURL}/reindeers/${updatedreindeer.id}`, updatedreindeer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

// update checked reindeers
export const useUpdateCheckedReindeers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCheckedReindeers) =>
      axios.all(
        updatedCheckedReindeers.map((reindeer) =>
          axios.put(`${MOCKURL}/reindeers/${reindeer.id}`, reindeer)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

// delete reindeer
export const useDeleteReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedReindeer) =>
      axios.delete(
        `${MOCKURL}/reindeers/${deletedReindeer.id}`,
        deletedReindeer
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

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

// update checked reindeer organizations
export const useUpdateCheckedReindeerOrganizations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCheckedReindeerOrganization) =>
      axios.all(
        updatedCheckedReindeerOrganization.map((organization) =>
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
