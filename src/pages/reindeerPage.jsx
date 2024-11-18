import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useReindeers,
  useAddReindeer,
  useUpdateReindeer,
} from "@/services/reindeer/reindeerapi";
import SantaChristmasSpinner from "@/components/global/spinner";
import SleightCard from "@/components/reindeer/SleightCard";
import { WeatherCard } from "@/components/reindeer/WeatherCard";
import ReindeerList from "@/components/reindeer/ReindeerList";
import OrganizationList from "@/components/reindeer/OrganizationList ";
import { useReindeersOrganizations } from "../services/reindeer/reindeerapi";

export const ReindeerPage = () => {
  const {
    data: reindeers,
    isLoading: isLoadingReindeers,
    isError: isErrorReindeers,
  } = useReindeers();
  const {
    data: reindeersOrganizations,
    isLoading: isLoadingOrganizations,
    isError: isErrorOrganizations,
  } = useReindeersOrganizations();
  const addReindeerMutation = useAddReindeer();
  const updateReindeerMutation = useUpdateReindeer();

  const addNewReindeer = async (newReindeer) => {
    await addReindeerMutation.mutateAsync(newReindeer);
  };

  const updateReindeer = async (reindeerUpdated) => {
    await updateReindeerMutation.mutateAsync(reindeerUpdated);
  };

  if (isLoadingReindeers || isLoadingOrganizations) {
    return (
      <div className="grid place-items-center h-full">
        <SantaChristmasSpinner />
      </div>
    );
  }

  if (isErrorReindeers || isErrorOrganizations)
    return <div>Error fetching</div>;

  return (
    <div className="min-h-screen w-auto text-green-900 sm:p-8 relative overflow-hidden">
      <div className="min-w-7xl mx-auto space-y-8 relative z-10">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
          Santa&apos;s Reindeer Dashboard
        </h1>
        {/* <WeatherCard /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SleightCard data={reindeers} />
          <Tabs defaultValue="organization">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="organization">Organization List</TabsTrigger>
              <TabsTrigger value="reindeers">Reindeers List</TabsTrigger>
            </TabsList>
            <TabsContent value="organization">
              <OrganizationList data={reindeersOrganizations} />
            </TabsContent>
            <TabsContent value="reindeers">
              <ReindeerList
                data={reindeers}
                addNewReindeer={addNewReindeer}
                updateReindeer={updateReindeer}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
