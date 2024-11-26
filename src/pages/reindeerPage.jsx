import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useReindeers,
  useAddReindeer,
  useUpdateReindeer,
} from "@/services/reindeer/reindeerapi";
import {
  LoadingScreen,
  ErrorScreen,
} from "@/components/global/santaDataLoader";
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
import { UnderlineTitle } from "@/components/global/underlineTitle";

export const ReindeerPage = () => {
  // Fetching data and states for reindeers.
  const {
    data: reindeersData,
    isLoading: isLoadingReindeers,
    isError: isErrorReindeers,
  } = useReindeers();
  // Fetching data and states for organizations.
  const {
    data: organizationsData,
    isLoading: isLoadingOrganizations,
    isError: isErrorOrganizations,
  } = useReindeersOrganizations();

  //State for tracking the currently selected organization view
  const [organizationView, setOrganizationView] = React.useState(null);

  // Mutations for adding and updating reindeer data.
  const addReindeerMutation = useAddReindeer();
  const updateReindeerMutation = useUpdateReindeer();

  // Mutations for managing organization data.
  const addOrganizationMutation = useAddReindeersOrganization();
  const updateOrganizationMutation = useUpdateReindeersOrganization();
  const updateCheckedOrganizations = useUpdateCheckedReindeerOrganizations();

  // State for controlling the modal's visibility and content.
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    organizationData: null,
  });

  console.log(modalState);

  // Generic function to handle async mutation calls.
  const hadleMutation = async (mutation, data) => {
    await mutation.mutateAsync(data);
  };

  // Display the loading screen if any data is still loading.
  if (isLoadingReindeers || isLoadingOrganizations) return <LoadingScreen />;
  // Display the error screen if there was an issue fetching data.
  if (isErrorReindeers || isErrorOrganizations) return <ErrorScreen />;

  return (
    <>
      <section>
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
          <UnderlineTitle text="Reindeer Setup" />
        </h1>
        <div className="flex flex-col gap-5 sm:p-8">
          {/* <WeatherCard /> */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <OrganizationOverview
              data={{ organizationsData, reindeersData }}
              organizationViewState={{
                organizationView,
                setOrganizationView,
              }}
              setModalState={setModalState}
              updateCheckedOrganization={(data) =>
                hadleMutation(updateCheckedOrganizations, data)
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
                  organizationViewState={{
                    organizationView,
                    setOrganizationView,
                  }}
                  setModalState={setModalState}
                />
              </TabsContent>
              <TabsContent value="reindeers">
                <ReindeerList
                  data={{ organizationsData, reindeersData }}
                  addNewReindeer={(data) =>
                    hadleMutation(addReindeerMutation, data)
                  }
                  updateReindeer={(data) =>
                    hadleMutation(updateReindeerMutation, data)
                  }
                  updateCheckedOrganization={(data) =>
                    hadleMutation(updateCheckedOrganizations, data)
                  }
                  setOrganizationView={setOrganizationView}
                />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </section>
      <OrganizationModal
        isOpen={modalState.isOpen}
        isClose={() => {
          setModalState({
            isOpen: false,
            organizationData: null,
          });
        }}
        onSubmit={(data) =>
          hadleMutation(
            modalState.organizationData
              ? updateOrganizationMutation
              : addOrganizationMutation,
            data
          )
        }
        data={{ organizationData: modalState.organizationData, reindeersData }}
        setOrganizationView={setOrganizationView}
      />
    </>
  );
};
