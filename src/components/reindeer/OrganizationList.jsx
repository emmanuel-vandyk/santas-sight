import * as React from "react";
import {
  useDeleteReindeersOrganization,
  useDeleteCheckedReindeerOrganizations,
} from "@/services/reindeer/organizationapi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
import { Pencil, CirclePlus, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function OrganizationList({
  data: { organizationsData },
  organizationViewState: { organizationView, setOrganizationView },
  setModalState,
}) {
  const toast = useToast();
  const [checkedOrganization, setCheckedOrganization] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const deleteReindeersOrganizationMutation = useDeleteReindeersOrganization();
  const deleteCheckedReindeerOrganization =
    useDeleteCheckedReindeerOrganizations();

  const handleDeleteOrganization = async (organizationDeleted) => {
    try {
      await deleteReindeersOrganizationMutation.mutateAsync(
        organizationDeleted
      );
      toast.success("Organization deleted successfully");
      setOrganizationView(null);
    } catch {
      toast.error("Failed to delete organization");
    }
  };

  const handleDeleteCheckedOrganizations = async () => {
    const organizationsToDelete = checkedOrganization.map((id) =>
      organizationsData.find((organization) => organization.id === id)
    );
    try {
      await deleteCheckedReindeerOrganization.mutateAsync(
        organizationsToDelete
      );
      toast.success("Organizations deleted successfully");
      setCheckedOrganization([]);
    } catch {
      toast.error("Failed to delete selected organizations");
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
        <CardTitle>Organizations management</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Filter organization names..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <Card
              className="flex items-center p-2 gap-3 rounded-sml lg:w-4/5"
              variant="outline"
            >
              <Checkbox
                checked={
                  checkedOrganization.length === organizationsData.length &&
                  organizationsData.length > 0
                }
                onCheckedChange={(checked) =>
                  setCheckedOrganization(
                    checked
                      ? organizationsData.map((organization) => organization.id)
                      : []
                  )
                }
                disabled={organizationsData.length <= 1}
              />
              <Label>Select all</Label>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap 2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={checkedOrganization.length < 2}
                  >
                    <Trash2 /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure you want to delete these
                      organizations?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      these organizations and remove them from Santa&apos;s
                      workshop
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
              <Button
                variant="outline"
                onClick={() =>
                  setModalState({ isOpen: true, organizationData: null })
                }
              >
                <CirclePlus />
                New
              </Button>
            </div>
          </div>
        </div>
        <ScrollArea className="h-72 rounded-md border p-1 box-border">
          {organizationsData
            .filter((organization) =>
              organization.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((organization) => (
              <div key={organization.id}>
                <Card className="grid grid-cols-1 gap-3 items-center p-3 lg:grid-cols-3">
                  <div className="flex gap-3 items-center justify-center lg:justify-normal">
                    <Checkbox
                      checked={checkedOrganization.includes(organization.id)}
                      onCheckedChange={(checked) =>
                        toggleCheckedOrganization(organization.id, checked)
                      }
                    />
                    <CardTitle>{organization.name}</CardTitle>
                  </div>
                  <div className=" flex justify-center capitalize">
                    {organization.isSelected ? (
                      <Badge variant="outline" className="bg-orange-300">
                        Selected
                      </Badge>
                    ) : organization.isAvailable ? (
                      <Badge variant="outline" className="bg-green-300">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-300">
                        Incomplete
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOrganizationView(organization)}
                      disabled={!organization.isAvailable}
                    >
                      <Eye />
                    </Button>
                    <Button
                      onClick={() => {
                        setModalState({
                          isOpen: true,
                          organizationData: organization,
                        });
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
                            This action cannot be undone. This will permanently
                            delete {organization.name} and remove it from
                            Santa&apos;s workshop.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              handleDeleteOrganization(organization);
                              setOrganizationView(null);
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
                <Separator className="my-3" />
              </div>
            ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
