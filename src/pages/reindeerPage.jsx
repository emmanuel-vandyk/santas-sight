import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useReindeers,
  useAddReindeer,
  useUpdateReindeer,
} from "@/services/reindeer/reindeerapi";
import SantaChristmasSpinner from "@/components/global/spinner";
import OrganizationOverview from "@/components/reindeer/OrganizationOverview";
import OrganizationModal from "@/components/reindeer/OrganizationModal";
// import { WeatherCard } from "@/components/reindeer/WeatherCard";
import ReindeerList from "@/components/reindeer/ReindeerList";
import OrganizationList from "@/components/reindeer/OrganizationList";
import {
  useReindeersOrganizations,
  useUpdateReindeersOrganization,
  useAddReindeersOrganization,
  useUpdateCheckedReindeerOrganizations,
} from "@/services/reindeer/organizationapi";
import { RoughNotation } from "react-rough-notation";

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
      <section>
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
        <div className="relative inline-block">
          <span className="relative z-10">Reindeer Setup</span>
          <RoughNotation
            type="underline"
            show={true}
            strokeWidth={3}
            iterations={2}
            animationDuration={5000}
            color="green"
            multiline={true}
            className="absolute left-0 right-0 bottom-0"
          >
            <span className="invisible">Reindeer Setup</span>
          </RoughNotation>
        </div>
        </h1>
        <div className="flex flex-col gap-5 sm:p-8">
          {/* <WeatherCard /> */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <OrganizationOverview
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
          </section>
        </div>
      </section>
      <OrganizationModal
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
