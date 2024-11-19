import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
import { Pencil, CirclePlus, Trash2, Eye, EyeOff } from "lucide-react";

export default function OrganizationList({
  data: { organizationsData, reindeersData },
  previewOrganizationState: { previewOrganization, setPreviewOrganization },
  setModalState,
}) {
  const [checkedReindeer, setChecketReindeer] = React.useState([]);
  const [filter, setFilter] = useState("");

  return (
    <Card className="h-full flex flex-col justify-evenly">
      <CardHeader>
        <CardTitle>Organizations List</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Filter Organization names..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <Card
                className="flex items-center p-2 gap-3 rounded-sm"
                variant="outline"
              >
                <Checkbox
                  checked={
                    checkedReindeer.length === organizationsData.length &&
                    organizationsData.length > 0
                  }
                  onCheckedChange={(checked) => {
                    checked
                      ? setChecketReindeer(
                          organizationsData.map(
                            (organization) => organization.id
                          )
                        )
                      : setChecketReindeer([]);
                  }}
                />
                <Label>Select All</Label>
              </Card>
              <Select
                disabled={!checkedReindeer.length > 0}
                value={""}
                onValueChange={(selectedValue) => console.log(selectedValue)}
              >
                <SelectTrigger className="font-semibold">
                  <SelectValue placeholder="Settings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem
                      value="deactivate"
                      className="text-red-600 cursor-pointer"
                    >
                      Delete
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end w-full">
              <Button
                variant="outline"
                className="w-full lg:w-1/2"
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
                      checked={checkedReindeer.includes(organization.id)}
                      onCheckedChange={(checked) =>
                        setChecketReindeer((prev) =>
                          checked
                            ? [...prev, organization.id]
                            : prev.filter((id) => id !== organization.id)
                        )
                      }
                    />
                    <CardTitle>{organization.name}</CardTitle>
                  </div>
                  <div className=" flex justify-center capitalize">
                    {organization.isSelected ? (
                      <Badge variant="outline" className="bg-orange-300">
                        Selected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-300">
                        Available
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPreviewOrganization(organization)}
                      className={
                        previewOrganization &&
                        previewOrganization.id == organization.id &&
                        "text-orange-400"
                      }
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
                            Santa's Workshop.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
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
