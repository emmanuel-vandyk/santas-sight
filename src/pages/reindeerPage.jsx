import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useReindeers,
  useAddReindeer,
  useUpdateReindeer,
} from "@/services/reindeer/reindeerapi";
import SantaChristmasSpinner from "@/components/global/spinner";
import SleightCard from "@/components/reindeer/SleightCard";
import SleightModal from "@/components/reindeer/SleightModal";
import { WeatherCard } from "@/components/reindeer/WeatherCard";
import ReindeerList from "@/components/reindeer/ReindeerList";
import OrganizationList from "@/components/reindeer/OrganizationList ";
import {
  useReindeersOrganizations,
  useUpdateReindeersOrganization,
  useAddReindeersOrganization,
  useUpdateCheckedReindeerOrganizations,
} from "@/services/reindeer/organizationapi";

export const ReindeerPage = () => {
  const {
    data: reindeersData,
    isLoading: isLoadingReindeers,
    isError: isErrorReindeers,
  } = useReindeers();
  const {
    data: organizationsData,
    isLoading: isLoadingOrganizations,
    isError: isErrorOrganizations,
  } = useReindeersOrganizations();
  const addReindeerMutation = useAddReindeer();
  const addReindeersOrganizationMutation = useAddReindeersOrganization();
  const updateReindeerMutation = useUpdateReindeer();
  const updateReindeersOrganizationMutation = useUpdateReindeersOrganization();
  const updateCheckedReindeerOrganizations =
    useUpdateCheckedReindeerOrganizations();
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    organizationData: null,
  });

  const [visualizerOrganization, setVisualizerOrganization] = React.useState({
    previewOrganization: null,
    selectedOrganization: null,
  });

  const addNewReindeer = async (newReindeer) => {
    await addReindeerMutation.mutateAsync(newReindeer);
  };

  const addNewReindeersOrganization = async (newOrganization) => {
    await addReindeersOrganizationMutation.mutateAsync(newOrganization);
  };

  const updateReindeer = async (reindeerUpdated) => {
    await updateReindeerMutation.mutateAsync(reindeerUpdated);
  };

  const updateReindeersOrganization = async (organizationUpdated) => {
    await updateReindeersOrganizationMutation.mutateAsync(organizationUpdated);
  };

  const updateCheckedReindeersOrganization = async (organizationsUpdated) => {
    await updateCheckedReindeerOrganizations.mutateAsync(organizationsUpdated);
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
    <>
      <div className="min-h-screen w-auto text-green-900 sm:p-8 relative overflow-hidden">
        <div className="min-w-7xl mx-auto space-y-8 relative z-10">
          <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
            Santa&apos;s Sleigh
          </h1>
          <WeatherCard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SleightCard
              data={{ organizationsData, reindeersData }}
              visualizerOrganizationState={{
                visualizerOrganization,
                setVisualizerOrganization,
              }}
              setModalState={setModalState}
              updateCheckedReindeersOrganization={
                updateCheckedReindeersOrganization
              }
            />
            <Tabs defaultValue="organization">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="organization">Organizations</TabsTrigger>
                <TabsTrigger value="reindeers">Reindeers</TabsTrigger>
              </TabsList>
              <TabsContent value="organization">
                <OrganizationList
                  data={{ organizationsData, reindeersData }}
                  visualizerOrganizationState={{
                    visualizerOrganization,
                    setVisualizerOrganization,
                  }}
                  setModalState={setModalState}
                />
              </TabsContent>
              <TabsContent value="reindeers">
                <ReindeerList
                  data={{ organizationsData, reindeersData }}
                  addNewReindeer={addNewReindeer}
                  updateReindeer={updateReindeer}
                  updateCheckedReindeersOrganization={
                    updateCheckedReindeersOrganization
                  }
                  setVisualizerOrganization={setVisualizerOrganization}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <SleightModal
        isOpen={modalState.isOpen}
        isClose={() => {
          setModalState({ isOpen: false, organizationData: null });
        }}
        onSubmit={
          modalState.organizationData
            ? updateReindeersOrganization
            : addNewReindeersOrganization
        }
        data={{ organizationData: modalState.organizationData, reindeersData }}
        setVisualizerOrganization={setVisualizerOrganization}
      />
    </>
  );
};
