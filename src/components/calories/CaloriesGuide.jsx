import * as React from "react";

import { ModalContext } from "@/components/calories/CookiesManager";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PlusSquare } from "lucide-react";
import { ChristmasCookies } from "@/components/global/iconsChristmas";

export default function CookiesGuide() {
  // Use the context to access the state and its updater function
  const { setModalState } = React.useContext(ModalContext);

  return (
    <Card className="flex flex-col justify-between gap-2 box-border">
      <CardHeader>
        <CardTitle>Choose Your Cookie</CardTitle>
        <CardDescription>
          Explore and manage cookies for Santa. Select one or multiple cookies
          from the list, view detailed information about each, or add more
          cookies for Santa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <ChristmasCookies className="w-1/2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={() => setModalState({ isOpen: true, cookieData: null })}
          className="w-full"
        >
          <PlusSquare />
          Create a cookie
        </Button>
      </CardFooter>
    </Card>
  );
}
