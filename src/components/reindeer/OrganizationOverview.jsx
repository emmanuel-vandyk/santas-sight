import * as React from "react";

import { useUpdateReindeerOrganizations } from "@/services/reindeer/organizationapi";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import {
  ReindeerIcon,
  ChristmasSantaSleight,
} from "@/components/global/iconsChristmas";

export default function OrganizationOverview({
  data: { organizationToView, organizationsData, reindeersData },
  generateOrganizationToView = () => {},
}) {
  const toast = useToast();

  // Mutations for managing organization data.
  const updateOrganizationsMutation = useUpdateReindeerOrganizations();

  // Function to handle selecting a reindeer's organization
  const handleSelectOrganization = () => {
    // Update the organizations to mark the selected one
    const updatedOrganizations = organizationsData.map((organization) => ({
      ...organization,
      isSelected: organization.id === organizationToView.id, // Mark as selected if it matches the preview
    }));
    //  Find the newly selected organization
    const organizationSelected = updatedOrganizations.find(
      (organization) => organization.isSelected === true
    );

    // Update Organization data and display the new selection in the preview
    try {
      updateOrganizationsMutation.mutateAsync(updatedOrganizations);
      generateOrganizationToView(organizationSelected);
      toast.success(`${organizationSelected.name} has been selected.`);
    } catch {
      generateOrganizationToView(null);
      toast.error("Failed to select organization");
    }
  };

  return (
    <Card>
      <div className="h-full flex flex-col justify-between box-border">
        <CardContent className="flex flex-col items-center p-5 gap-3">
          <CardTitle>{`${organizationToView.name} organization`}</CardTitle>
          <ChristmasSantaSleight />
          <div className="grid grid-cols-3 gap-3 place-items-center">
            {organizationToView.positions.map(({ position, reindeer }) => {
              // Get the name of the reindeer based on its ID in organization
              const reindeerName = reindeersData.find(
                ({ id }) => id === reindeer
              ).name;
              return (
                <Card
                  key={position}
                  className="flex items-center justify-center p-2 rounded-sm"
                >
                  <ReindeerIcon width="18px" height="18px" />
                  <CardTitle>{reindeerName}</CardTitle>
                </Card>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          {!organizationToView.isSelected && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleSelectOrganization}
            >
              <Check /> Select {organizationToView.name}
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
