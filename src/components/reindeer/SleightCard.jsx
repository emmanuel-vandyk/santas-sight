import { useState } from "react";
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

export default function SleightCard({
  data: { organizationsData, reindeersData },
  visualizerOrganizationState: {
    visualizerOrganization: { previewOrganization, selectedOrganization },
    setVisualizerOrganization,
  },
  setModalState,
  updateReindeersOrganization,
}) {
  // Select the reindeer organization with the isSelected property set to true.
  // Important: If none is found, return undefined.
  previewOrganization != null &&
    previewOrganization?.isSelected == undefined &&
    setVisualizerOrganization((prevState) => ({
      ...prevState,
      previewOrganization: organizationsData.find(
        (organization) => organization.isSelected == true
      ),
    }));

  return (
    <Card>
      <div className="h-full flex flex-col justify-evenly box-border">
        {previewOrganization ? (
          <>
            <CardHeader>
              <CardTitle>Santa&apos;s Sleigh Dashboard</CardTitle>
              <CardDescription>
                View the real-time organization of Santa&apos;s sleigh team. This
                dashboard displays the current positions of each reindeer,
                making it easy to plan and oversee the holiday crew. Ensure
                everyone is in the right spot for a flawless takeoff.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-5 w-full gap-3 lg:flex-row">
              <ChristmasSantaSleight />
              <div className="flex flex-col w-1/2 gap-5">
                <h3 className="ml-5 text-center font-semibold">
                  {`${previewOrganization.name} Reindeers 🦌`}
                </h3>
                <div className="grid grid-cols-3 gap-3 place-items-center">
                  {previewOrganization.positions.map(
                    ({ position, reindeer }) => (
                      <Card key={position} className="p-2 rounded-sm">
                        <CardTitle>
                          {reindeersData.find(({ id }) => id == reindeer).name}
                        </CardTitle>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {!organizationsData.find(
                (organization) => organization.id == previewOrganization.id
              ).isSelected ? (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    updateReindeersOrganization({
                      ...previewOrganization,
                      isSelected: true,
                    });
                  }}
                >
                  <Check /> Select Organization
                </Button>
              ) : (
                <Button
                  className="w-full bg-orange-400 hover:bg-orange-500"
                  onClick={() => {
                    updateReindeersOrganization({
                      ...previewOrganization,
                      isSelected: false,
                    });
                  }}
                >
                  <Check /> Unselect Organization
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Choose an Organization</CardTitle>
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
                <CirclePlus /> New Organization
              </Button>
              {organizationsData.length > 0 && (
                <OrganizationComboBox
                  data={organizationsData}
                  setVisualizerOrganization={setVisualizerOrganization}
                />
              )}
            </CardFooter>
          </>
        )}
      </div>
    </Card>
  );
}
