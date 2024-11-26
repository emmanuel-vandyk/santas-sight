import * as React from "react";
import { cn } from "@/lib/utils";
import { ModalContext } from "@/components/calories/CookiesTracker";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Pencil, PlusSquare } from "lucide-react";
import CookiesCarousel from "@/components/calories/CookiesCarousel";
import CookieSelector from "@/components/calories/CookieSelector";

export default function CookiesOverview({ data: cookiesData }) {
  // Use the context to access the state and its updater function
  const { setModalState } = React.useContext(ModalContext);
  // Determines if there is available cookie data. If cookiesData has elements, isDataAvailable will be true.
  const isDataAvailable = cookiesData.length > 0;

  return (
    <Card className="flex flex-col justify-between gap-2 box-border ">
      {isDataAvailable ? (
        <CookiesCarousel data={cookiesData} />
      ) : (
        <CookieSelector />
      )}
      <CardFooter className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <Button
          variant="outline"
          className={cn({
            hidden: !isDataAvailable || cookiesData.length >= 2,
          })}
          onClick={() =>
            setModalState({ isOpen: true, cookieData: cookiesData[0] })
          }
        >
          <Pencil /> Edit
        </Button>
        <Button
          variant="outline"
          className={cn({
            hidden: !isDataAvailable,
            "col-span-2": cookiesData.length > 1,
          })}
        >
          <PlusSquare />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
