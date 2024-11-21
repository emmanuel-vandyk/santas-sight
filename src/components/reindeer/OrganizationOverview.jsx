import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CirclePlus } from "lucide-react";
import { ChristmasSantaSleight } from "@/components/global/iconsChristmas";
import OrganizationComboBox from "@/components/reindeer/OrganizationComboBox";

export default function OrganizationOverview({
  data: { organizationsData, reindeersData },
  organizationViewState: { organizationView, setOrganizationView },
  setModalState,
  updateCheckedReindeersOrganization,
}) {
  // Filter to get only available organizations
  const availableOrganizations = organizationsData.filter(
    (organization) => organization.isAvailable
  );

  // useEffect hook to set a selected organization in the preview on component load
  React.useEffect(() => {
    if (organizationView?.isSelected === undefined) {
      // Find the first selected organization and display it in the preview
      const organizationSelected = organizationsData.find(
        (organization) => organization.isSelected === true
      );
      organizationSelected && setOrganizationView(organizationSelected);
    }
  }, []);

  const handleSelectOrganization = () => {
    // Update the organizations to mark the selected one
    const updatedOrganizations = organizationsData.map((organization) => ({
      ...organization,
      isSelected: organization.id === organizationView.id, // Mark as selected if it matches the preview
    }));
    //  Find the newly selected organization
    const organizationSelected = updatedOrganizations.find(
      (organization) => organization.isSelected === true
    );
    // Update Organization data and display the new selection in the preview
    updateCheckedReindeersOrganization(updatedOrganizations);
    setOrganizationView(organizationSelected);
  };

  return (
    <Card>
      <div className="h-full flex flex-col justify-evenly box-border">
        {organizationView ? ( // Check if an organization is set in the preview
          <>
            <CardHeader>
              <CardTitle>Organization overview</CardTitle>
              <CardDescription>
                View the real-time organization of Santa&apos;s sleigh team.
                This dashboard displays the current positions of each reindeer,
                making it easy to plan and oversee the holiday crew. Ensure
                everyone is in the right spot for a flawless takeoff.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-5 w-full gap-3 lg:flex-row">
              <ChristmasSantaSleight />
              <div className="flex flex-col w-1/2 gap-5">
                <h3 className="ml-5 text-center font-semibold">
                  {`${organizationView.name} Reindeers 🦌`}
                </h3>
                <div className="grid grid-cols-3 gap-3 place-items-center">
                  {organizationView.positions.map(({ position, reindeer }) => {
                    // Get the name of the reindeer based on its ID in organization
                    const reindeerName = reindeersData.find(
                      ({ id }) => id === reindeer
                    ).name;
                    return (
                      <Card key={position} className="p-2 rounded-sm">
                        <CardTitle>{reindeerName}</CardTitle>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {!organizationView.isSelected && (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleSelectOrganization}
                >
                  <Check /> Select {organizationView.name}
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Choose an organization</CardTitle>
              <CardDescription>
                Select or create an organization to view its details and
                reindeer team arrangements. Once chosen, the team positions and
                availability will be displayed for your review
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-5 w-full gap-3 lg:flex-row">
              <ChristmasSantaSleight />
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center gap-3 lg:flex-row">
              <Button
                variant="outline"
                onClick={() =>
                  setModalState({ isOpen: true, organizationData: null })
                }
              >
                <CirclePlus /> New organization
              </Button>
              {organizationsData.length > 0 &&
                availableOrganizations.length > 0 && (
                  <OrganizationComboBox
                    data={availableOrganizations}
                    setOrganizationView={setOrganizationView}
                  />
                )}
            </CardFooter>
          </>
        )}
      </div>
    </Card>
  );
}
