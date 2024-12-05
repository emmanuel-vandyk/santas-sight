import * as React from "react";

import { ModalContext } from "@/components/reindeer/OrganizationManager";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusSquare } from "lucide-react";
import { ChristmasSantaSleight } from "@/components/global/iconsChristmas";

export default function OrganizationGuide() {
  // Use the context to access the state and its updater function
  const { setModalState } = React.useContext(ModalContext);

  return (
    <Card>
      <div className="h-full flex flex-col justify-evenly box-border">
        <CardHeader>
          <CardTitle>Choose an organization</CardTitle>
          <CardDescription>
            Select or create an organization to view its details and reindeer
            team arrangements. Once chosen, the team positions and availability
            will be displayed for your review
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-5 w-full gap-3 lg:flex-row">
          <ChristmasSantaSleight />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-3 lg:flex-row">
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
            <PlusSquare /> New organization
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
