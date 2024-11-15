import { useState } from "react";
import {
  useReindeers,
  useAddReindeer,
  useUpdateReindeers,
} from "@/services/reindeer/reindeerapi";
import SantaChristmasSpinner from "@/components/global/spinner";
import ReindeersTable from "@/components/reindeer/ReindeerTable";
import SleightCard from "@/components/reindeer/SleightCard";
import OrderCard from "@/components/reindeer/OrderCard";
import { SunIcon, Snowflake } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ReindeerPage = () => {
  const { data, isLoading, isError } = useReindeers();
  const addReindeerMutation = useAddReindeer();
  const updateReindeerMutation = useUpdateReindeers();

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

  if (isError) return <div>Error fetching elves</div>;

  return (
    <div className="min-h-screen  text-green-900 p-4 sm:p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
          Santas Reindeer Dashboard
        </h1>
        <Card className="flex flex-col gap-5 w-7/8 bg-gray-500 p-4 text-white h-32">
          <section className="gap-3 font-semibold flex">
            <Snowflake />
            <h2 className="whitespace-nowrap">North Pole Weather</h2>
          </section>
          <section className="flex gap-2">
            <SunIcon />
            <h2>0°C</h2>
          </section>
        </Card>
        <div className="flex items-start gap-3">
          <div className="w-3/5">
            <SleightCard data={data} />
          </div>
          <div className="w-2/5">
            <OrderCard data={data} />
          </div>
        </div>
        <ReindeersTable
          data={data}
          addNewReindeer={addNewReindeer}
          updateReindeer={updateReindeer}
        />
      </div>
    </div>
  );
};
