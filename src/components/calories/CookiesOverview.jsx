import * as React from "react";
import { ModalContext } from "@/components/calories/CookiesTracker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { PlusSquare } from "lucide-react";
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
      <CardFooter className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setModalState({ isOpen: true, cookieData: null })}
          className={cn(
            {
              hidden: isDataAvailable,
            },
            "w-full"
          )}
        >
          <PlusSquare />
          New cookie
        </Button>
        <Button
          variant="outline"
          className={cn(
            {
              hidden: !isDataAvailable,
            },
            "w-full"
          )}
        >
          <PlusSquare />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
