import * as React from "react";
import {
  useReindeers,
  useAddReindeer,
  useUpdateReindeer,
} from "@/services/reindeer/reindeerapi";
import SantaChristmasSpinner from "@/components/global/spinner";
import ReindeersTable from "@/components/reindeer/ReindeerTable";
import SleightCard from "@/components/reindeer/SleightCard";
import OrderCard from "@/components/reindeer/OrderCard";
import { WeatherCard } from "@/components/reindeer/WeatherCard";
import ReindeerList from "@/components/reindeer/ReindeerList";

export const ReindeerPage = () => {
  const { data, isLoading, isError } = useReindeers();
  const addReindeerMutation = useAddReindeer();
  const updateReindeerMutation = useUpdateReindeer();

  const addNewReindeer = async (newReindeer) => {
    await addReindeerMutation.mutateAsync(newReindeer);
  };

  const updateReindeer = async (reindeerUpdated) => {
    await updateReindeerMutation.mutateAsync(reindeerUpdated);
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center h-full">
        <SantaChristmasSpinner />
      </div>
    );
  }

  if (isError) return <div>Error fetching Reindeer</div>;

  return (
    <div className="min-h-screen w-auto text-green-900 sm:p-8 relative overflow-hidden">
      <div className="min-w-7xl mx-auto space-y-8 relative z-10">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
          Santas Reindeer Dashboard
        </h1>
        <WeatherCard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SleightCard data={data} />
          <ReindeerList
            reindeers={data}
            addNewReindeer={addNewReindeer}
            updateReindeer={updateReindeer}
          />
        </div>
        {/* <div className="flex items-start gap-3">
          <div className="w-3/5">
            <SleightCard data={data} />
          </div>
          <div className="md:w-2/5">
            <OrderCard data={data} />
          </div>
        </div>
        <ReindeersTable
          data={data}
          addNewReindeer={addNewReindeer}
          updateReindeer={updateReindeer}
        /> */}
      </div>
    </div>
  );
};
