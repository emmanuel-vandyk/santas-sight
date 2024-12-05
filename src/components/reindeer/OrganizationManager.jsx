import * as React from "react";

import {
  useAddReindeer,
  useUpdateReindeer,
} from "@/services/reindeer/reindeerapi";
import {
  useAddReindeersOrganization,
  useUpdateReindeersOrganization,
} from "@/services/reindeer/organizationapi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/useToast";
import ReindeerModal from "@/components/reindeer/ReindeerModal";
import ReindeerModalInfo from "@/components/reindeer/ReindeerModalInfo";
import ReindeerList from "@/components/reindeer/ReindeerList";
import OrganizationModal from "@/components/reindeer/OrganizationModal";
import OrganizationOverview from "@/components/reindeer/OrganizationOverview";
import OrganizationGuide from "@/components/reindeer/OrganizationGuide";
import OrganizationList from "@/components/reindeer/OrganizationList";

// Create a context to store and provide the modal state
export const ModalContext = React.createContext();

export default function OrganizationManager({
  data: { reindeersData, organizationsData },
}) {
  const toast = useToast();

  // Mutations for adding and updating reindeer data.
  const addReindeerMutation = useAddReindeer();
  const updateReindeerMutation = useUpdateReindeer();

  // Mutations for managing organization data.
  const addOrganizationMutation = useAddReindeersOrganization();
  const updateOrganizationMutation = useUpdateReindeersOrganization();

  // State for controlling the modal's visibility and content.
  const [modalState, setModalState] = React.useState({
    OrganizationModal: {
      isOpen: false,
      data: null,
    },
    ReindeerModal: {
      isOpen: false,
      data: null,
    },
    ReindeerModalInfo: {
      isOpen: false,
      data: null,
    },
  });

  // Tracks the selected reindeer organization to view.
  const [organizationToView, setOrganizationToView] = React.useState(null);

  // Generic function to handle async mutation calls.
  const hadleMutation = async (
    mutation,
    data,
    success = "Operation successful",
    error = "Failed to complete the operation. Please verify the information."
  ) => {
    try {
      await mutation.mutateAsync(data);
      toast.success(success);
    } catch {
      toast.error(error);
    }
  };

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ModalContext.Provider value={{ modalState, setModalState }}>
          <Tabs defaultValue="organization">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="organization">Organizations</TabsTrigger>
              <TabsTrigger value="reindeers">Reindeers</TabsTrigger>
            </TabsList>
            <TabsContent value="organization">
              <OrganizationList
                data={organizationsData}
                generateOrganizationToView={(organization) => {
                  // Set the state with the organization
                  setOrganizationToView(organization);
                }}
              />
            </TabsContent>
            <TabsContent value="reindeers">
              <ReindeerList
                data={{ organizationsData, reindeersData }}
                generateOrganizationToView={(organization) => {
                  // Set the state with the organization
                  setOrganizationToView(organization);
                }}
              />
            </TabsContent>
          </Tabs>
          {organizationToView != null ? (
            <OrganizationOverview
              data={{ organizationToView, organizationsData, reindeersData }}
              generateOrganizationToView={(organization) => {
                // Set the state with the organization
                setOrganizationToView(organization);
              }}
            />
          ) : (
            <OrganizationGuide />
          )}
        </ModalContext.Provider>
      </section>
      <OrganizationModal
        isOpen={modalState.OrganizationModal.isOpen}
        isClose={() => {
          setModalState({
            ...modalState,
            OrganizationModal: {
              isOpen: false,
              data: null,
            },
          });
        }}
        onSubmit={(data) =>
          hadleMutation(
            modalState.OrganizationModal.data
              ? updateOrganizationMutation
              : addOrganizationMutation,
            data,
            "Organization saved"
          )
        }
        data={{
          organizationData: modalState.OrganizationModal.data,
          reindeersData: reindeersData,
        }}
        generateOrganizationToView={(organization) => {
          // Set the state with the organization
          setOrganizationToView(organization);
        }}
      />
      <ReindeerModalInfo
        isOpen={modalState.ReindeerModalInfo.isOpen}
        onClose={() =>
          setModalState({
            ...modalState,
            ReindeerModalInfo: {
              isOpen: false,
              data: null,
            },
          })
        }
        data={modalState.ReindeerModalInfo.data}
      />
      <ReindeerModal
        isOpen={modalState.ReindeerModal.isOpen}
        isClose={() => {
          setModalState({
            ...modalState,
            ReindeerModal: {
              isOpen: false,
              data: null,
            },
          });
        }}
        onSubmit={(data) =>
          hadleMutation(
            modalState.ReindeerModal.data
              ? updateReindeerMutation
              : addReindeerMutation,
            data,
            "Reindeer saved"
          )
        }
        data={modalState.ReindeerModal.data}
      />
    </>
  );
}
