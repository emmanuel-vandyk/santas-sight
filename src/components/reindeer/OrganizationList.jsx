import * as React from "react";

import { ModalContext } from "@/components/reindeer/OrganizationManager";
import {
  useDeleteReindeersOrganization,
  useDeleteCheckedReindeerOrganizations,
} from "@/services/reindeer/organizationapi";
import SelectAll from "@/components/global/selectAll";
import CustomCheckbox from "@/components/global/customCheckbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, PlusSquare, Trash2, Eye } from "lucide-react";
import { SantaSledge } from "@/components/global/iconsChristmas";
import { useToast } from "@/hooks/useToast";

export default function OrganizationList({
  data: organizationsData,
  generateOrganizationToView = () => {},
  organizationToView,
}) {
  // Use the context to access the state and its updater function
  const { setModalState } = React.useContext(ModalContext);

  const toast = useToast();
  const [checkedOrganization, setCheckedOrganization] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  // Filter organizations based on entered text
  const filteredOrganizations = organizationsData.filter((organization) =>
    organization.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Mutations for managing organization data.
  const deleteReindeersOrganizationMutation = useDeleteReindeersOrganization();
  const deleteCheckedReindeerOrganization =
    useDeleteCheckedReindeerOrganizations();

  // Function to handle deleting a organization
  const handleDeleteOrganization = async (organizationDeleted) => {
    try {
      await deleteReindeersOrganizationMutation.mutateAsync(
        organizationDeleted
      );
      toast.success("Organization deleted successfully");
      hadleOrganizationToView(organizationDeleted);
    } catch {
      toast.error("Failed to delete organization");
    }
  };

  // Function to handle deleting a organizations
  const handleDeleteCheckedOrganizations = async () => {
    const organizationsToDelete = checkedOrganization.map((id) =>
      organizationsData.find((organization) => organization.id === id)
    );
    try {
      await deleteCheckedReindeerOrganization.mutateAsync(
        organizationsToDelete
      );
      toast.success("Organizations deleted successfully");
      hadleOrganizationToView(organizationsToDelete);
      setCheckedOrganization([]);
    } catch {
      toast.error("Failed to delete selected organizations");
    }
  };

  // Function to handle the organization to see when any organization is deleted
  const hadleOrganizationToView = (organizationsDeleted) => {
    if (organizationToView != null) {
      const organizationList = Array.isArray(organizationsDeleted)
        ? organizationsDeleted
        : [organizationsDeleted];

      const overviewIsNull = organizationList.some(
        (organization) => organization.id === organizationToView.id
      );

      if (overviewIsNull) {
        generateOrganizationToView(null);
      }
    }
  };

  const toggleCheckedOrganization = (id, isChecked) => {
    setCheckedOrganization((prevState) =>
      isChecked
        ? [...prevState, id]
        : prevState.filter((organizationId) => organizationId !== id)
    );
  };

  return (
    <Card className="h-full flex flex-col justify-evenly">
      <CardHeader>
        <CardTitle>Organizations list</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-6">
          <SelectAll
            className="sm:col-span-2"
            items={filteredOrganizations}
            selectedItems={checkedOrganization}
            onSelectionChange={(newSelection) =>
              setCheckedOrganization(newSelection)
            }
          />
          <Input
            className="sm:col-span-3"
            type="text"
            placeholder="Filter organization names..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() =>
              setModalState((prevState) => ({
                ...prevState,
                OrganizationModal: {
                  isOpen: true,
                  data: null,
                },
              }))
            }
          >
            <PlusSquare />
            New
          </Button>
        </div>
        {filteredOrganizations.length > 0 ? (
          <ScrollArea className="h-72 rounded-md border p-2 box-border">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredOrganizations.map((organization) => (
                <div key={organization.id}>
                  <Card className="grid grid-cols-1 gap-5 items-center p-3 bg-gradient-to-r from-red-100 to-green-100">
                    <div className="flex flex-col gap-3 items-center justify-center lg:justify-normal sm:flex-row">
                      <CustomCheckbox
                        checked={checkedOrganization.includes(organization.id)}
                        onCheckedChange={(checked) =>
                          toggleCheckedOrganization(organization.id, checked)
                        }
                      />
                      <CardTitle className="flex items-center gap-1">
                        <SantaSledge
                          width="18px"
                          height="18px"
                          transform="scale(-1, 1)"
                        />
                        {organization.name}
                      </CardTitle>
                    </div>
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                      {organization.isSelected ? (
                        <Badge variant="outline" className="bg-orange-300">
                          Selected
                        </Badge>
                      ) : organization.isAvailable ? (
                        <Badge
                          variant="outline"
                          className="bg-green-600 text-white"
                        >
                          Available
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-600 text-white"
                        >
                          Incomplete
                        </Badge>
                      )}
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            generateOrganizationToView(organization)
                          }
                          disabled={!organization.isAvailable}
                        >
                          <Eye />
                        </Button>
                        <Button
                          onClick={() => {
                            setModalState((prevState) => ({
                              ...prevState,
                              OrganizationModal: {
                                isOpen: true,
                                data: organization,
                              },
                            }));
                          }}
                          variant="ghost"
                          size="icon"
                        >
                          <Pencil />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure you want to delete{" "}
                                {organization.name}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete {organization.name} and
                                remove it from Santa&apos;s workshop.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() =>
                                  handleDeleteOrganization(organization)
                                }
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <Card className="h-72 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Missing organization data
            </p>
          </Card>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={checkedOrganization.length < 2}>
              <Trash2 /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure you want to delete these organizations?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete these
                organizations and remove them from Santa&apos;s workshop
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteCheckedOrganizations}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
