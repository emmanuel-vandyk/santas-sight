import React, { useState } from "react";
import {
  useUpdateCheckedReindeers,
  useDeleteReindeer,
} from "@/services/reindeer/reindeerapi";
import { ReindeerModalInfo } from "@/components/reindeer/ReindeerModalInfo";
import ReindeerModal from "@/components/reindeer/ReindeerModal";
import ReindeerSettings from "@/components/reindeer/ReindeerSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, CirclePlus } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useToast } from "@/hooks/useToast";

export default function ReindeerList({
  data: { organizationsData, reindeersData: reindeers },
  addNewReindeer,
  updateReindeer,
  updateCheckedReindeersOrganization,
  setVisualizerOrganization,
}) {
  const toast = useToast();

  const [editingReindeer, setEditingReindeer] = React.useState(null);
  const [selectedReindeer, setSelectedReindeer] = React.useState(null);
  const [checkedReindeer, setChecketReindeer] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState({
    ReindeerModal: false,
    ReindeerModalInfo: false,
  });
  const [filter, setFilter] = useState("");
  const updateCheckedReindeersMutation = useUpdateCheckedReindeers();
  const deleteReindeerMutation = useDeleteReindeer();

  const deleteReindeer = async (reindeerDeleted) => {
    try {
      await deleteReindeerMutation.mutateAsync(reindeerDeleted);
      toast.success(`${reindeerDeleted.name} has been deleted.`);
    } catch {
      toast.error(`Failed to delete ${reindeerDeleted.name}.`);
    }
  };

  const handleCheckedReindeers = async (action) => {
    const reindeersChecked = checkedReindeer.map((reindeerId) =>
      reindeers.find(({ id }) => id === reindeerId)
    );

    const reindeersToUpdate = reindeersChecked.map((reindeer) => {
      if (action === "activate") {
        return {
          ...reindeer,
          available: true,
        };
      } else if (action === "deactivate") {
        return {
          ...reindeer,
          available: false,
        };
      } else {
        return reindeer;
      }
    });

    setChecketReindeer([]);
    try {
      await updateCheckedReindeersMutation.mutateAsync(reindeersToUpdate);
      toast.success(`${action === "activate" ? "Activated" : "Deactivated"} ${reindeersChecked.length} reindeers.`);
    } catch {
      toast.error(`Failed to ${action === "activate" ? "activate" : "deactivate"} reindeers.`);
    }
  };

  const findOrganizationsWithReindeer = (reindeerId) => {
    return organizationsData.filter((organization) => {
      // Check if the organization contains the reindeer
      const containsReindeer = organization.positions.some(
        (position) => position.reindeer === reindeerId
      );

      // If it contains the reindeer, set isAvailable to false
      if (containsReindeer) {
        organization.isAvailable = false;
      }

      // Return only the organizations that contain the reindeer
      return containsReindeer;
    });
  };

  return (
    <>
      <Card className="h-full flex flex-col justify-evenly">
        <CardHeader>
          <CardTitle>Reindeer List</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Filter Reindeer names..."
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
                    checkedReindeer.length === reindeers.length &&
                    reindeers.length > 0
                  }
                  onCheckedChange={(checked) => {
                    checked
                      ? setChecketReindeer(
                          reindeers.map((reindeer) => reindeer.id)
                        )
                      : setChecketReindeer([]);
                  }}
                  disabled={reindeers.length <= 1}
                />
                <Label>Select All</Label>
              </Card>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <Select
                  disabled={checkedReindeer.length < 2}
                  value={""}
                  onValueChange={(selectedValue) =>
                    handleCheckedReindeers(selectedValue)
                  }
                >
                  <SelectTrigger className="font-semibold">
                    <SelectValue placeholder="Settings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem
                        value="deactivate"
                        className="text-red-600 cursor-pointer"
                      >
                        Deactivate
                      </SelectItem>
                      <SelectItem
                        value="activate"
                        className="text-green-600 cursor-pointer"
                      >
                        Activate
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() =>
                    setIsModalOpen((state) => ({
                      ...state,
                      ReindeerModal: true,
                    }))
                  }
                >
                  <CirclePlus /> New
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className="h-72 rounded-md border p-1 box-border">
            {reindeers
              .filter((reindeer) =>
                reindeer.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((reindeer) => (
                <div key={reindeer.id}>
                  <Card className="grid grid-cols-1 gap-3 items-center p-3 lg:grid-cols-3">
                    <div className="flex gap-3 items-center justify-center lg:justify-normal">
                      <Checkbox
                        checked={checkedReindeer.includes(reindeer.id)}
                        onCheckedChange={(checked) =>
                          setChecketReindeer((prev) =>
                            checked
                              ? [...prev, reindeer.id]
                              : prev.filter((id) => id !== reindeer.id)
                          )
                        }
                      />
                      <CardTitle>{reindeer.name}</CardTitle>
                    </div>
                    <div className=" flex justify-center capitalize">
                      {reindeer.available ? (
                        <>
                          <Badge variant="outline" className="bg-green-300">
                            Available
                          </Badge>
                          {(reindeer.type === "master" && (
                            <Badge variant="outline" className="bg-purple-300">
                              Master
                            </Badge>
                          )) ||
                            (reindeer.type === "trainee" && (
                              <Badge
                                variant="outline"
                                className="bg-yellow-300"
                              >
                                Trainee
                              </Badge>
                            )) ||
                            (reindeer.type === "junior" && (
                              <Badge
                                variant="outline"
                                className="bg-orange-300"
                              >
                                Junior
                              </Badge>
                            ))}
                        </>
                      ) : (
                        <Badge variant="destructive">Not Available</Badge>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <ReindeerSettings
                        data={reindeer}
                        setSelectedReindeer={setSelectedReindeer}
                        setIsModalOpen={setIsModalOpen}
                        updateReindeer={updateReindeer}
                      />
                      <Button
                        onClick={() => {
                          setEditingReindeer(reindeer);
                          setIsModalOpen((state) => ({
                            ...state,
                            ReindeerModal: true,
                          }));
                        }}
                        variant="ghost"
                        size="icon"
                      >
                        <Pencil />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={reindeer.available}
                          >
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure you want to delete{" "}
                              {reindeer.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete {reindeer.name} and remove it
                              from Santa&apos;s Workshop.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => {
                                updateCheckedReindeersOrganization(
                                  findOrganizationsWithReindeer(reindeer.id)
                                );
                                setVisualizerOrganization((prevState) => ({
                                  ...prevState,
                                  previewOrganization: null,
                                }));
                                deleteReindeer(reindeer);
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
      <ReindeerModalInfo
        reindeer={selectedReindeer}
        isOpen={isModalOpen.ReindeerModalInfo}
        onClose={() =>
          setIsModalOpen((state) => ({
            ...state,
            ReindeerModalInfo: false,
          }))
        }
      />
      <ReindeerModal
        isOpen={isModalOpen.ReindeerModal}
        isClose={() => {
          setIsModalOpen((state) => ({
            ...state,
            ReindeerModal: false,
          }));
          setEditingReindeer(null);
        }}
        onSubmit={editingReindeer ? updateReindeer : addNewReindeer}
        initialData={editingReindeer}
      />
    </>
  );
}
