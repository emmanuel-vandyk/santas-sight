import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_MOCK_API_URL;

export const useReindeersOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/api/reindeerOrganizations`);
      return data.data;
    },
  });
};

export const useAddReindeersOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReindeersOrganization) => {
      const formattedData = {
        ...newReindeersOrganization,
        positions: newReindeersOrganization.positions.map((p) => ({
          ...p,
          position: Number(p.position),
          reindeerId: Number(p.reindeerId), // Change 'reindeer' to 'reindeerId'
        })),
      };
      return axios.post(`${MOCKURL}/api/reindeerOrganizations`, formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useUpdateReindeersOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedReindeersOrganization) => {
      const formattedData = {
        ...updatedReindeersOrganization,
        id: Number(updatedReindeersOrganization.id),
        positions: updatedReindeersOrganization.positions.map((p) => ({
          ...p,
          position: Number(p.position),
          reindeerId: Number(p.reindeerId),
        })),
      };
      return axios.put(
        `${MOCKURL}/api/reindeerOrganizations/${formattedData.id}`,
        formattedData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useUpdateReindeerOrganizations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedReindeerOrganization) => {
      axios.all(
        updatedReindeerOrganization.map((organization) => {
          const formattedData = {
            ...organization,
            id: Number(organization.id),
            positions: organization.positions.map((p) => ({
              position: Number(p.position),
              reindeerId: Number(p.reindeerId) || null,
            })),
          };

          return axios.put(
            `${MOCKURL}/api/reindeerOrganizations/${formattedData.id}`,
            formattedData
          );
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useDeleteReindeersOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedReindeersOrganization) =>
      axios.delete(
        `${MOCKURL}/api/reindeerOrganizations/${Number(
          deletedReindeersOrganization.id
        )}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useDeleteCheckedReindeerOrganizations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedCheckedReindeerOrganization) =>
      axios.all(
        deletedCheckedReindeerOrganization.map((organization) =>
          axios.delete(
            `${MOCKURL}/api/reindeerOrganizations/${Number(organization.id)}`
          )
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};
