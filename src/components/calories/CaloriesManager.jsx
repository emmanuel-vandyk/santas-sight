import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Check } from "lucide-react";
import {
  CookiesConsumedPanel,
  RemainingCookiesPanel,
} from "@/components/calories/CaloriesDetails";

export default function CaloriesManager({
  data: cookiesData,
  generateQuantity,
  genterateCalories,
  generateCookiesToSend,
}) {
  // State to track updates to the cookies consume data
  const [cookiesConsumed, setCookiesConsumed] = React.useState([]);

  // useEffect to update the default state when the component reloads with different cookiesData
  React.useEffect(() => {
    if (cookiesData) {
      setCookiesConsumed(
        cookiesData.length > 1
          ? cookiesData
              .filter((cookie) => cookie.quantity > 0)
              .map((cookie) => ({ cookieId: cookie.id, amount: 0 }))
          : cookiesData.map((cookie) => ({ cookieId: cookie.id, amount: 0 }))
      );
    }
  }, [cookiesData]);

  return cookiesData.length > 1 ? (
    <Card className="flex flex-col justify-between gap-2 box-border">
      <Carousel>
        <CarouselContent>
          {cookiesData
            .filter((cookie) => cookie.quantity > 0)
            .map((cookie) => (
              <CarouselItem key={cookie.id}>
                <RemainingCookiesPanel
                  data={cookie}
                  setCookiesConsumed={setCookiesConsumed}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="w-full flex justify-around p-3">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      </Carousel>
      <CardFooter>
        <Button
          variant="outline"
          className=" bg-green-600 text-white w-full hover:bg-green-700 hover:text-white"
          onClick={() => {
            genterateCalories(cookiesConsumed);
            generateCookiesToSend([]);
          }}
          disabled={cookiesConsumed.every((cookie) => cookie.amount == 0)}
        >
          <Check /> Save
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <Card className="flex flex-col gap-2 box-border">
      {cookiesData[0].quantity == 0 ? (
        <CookiesConsumedPanel
          data={cookiesData[0]}
          addNewQuantity={(cookieData) => {
            generateQuantity(cookieData);
            generateCookiesToSend([]);
          }}
        />
      ) : (
        <>
          <RemainingCookiesPanel
            data={cookiesData[0]}
            setCookiesConsumed={setCookiesConsumed}
          />
          <CardFooter className="mt-auto">
            <Button
              variant="outline"
              className=" bg-green-600 text-white w-full hover:bg-green-700 hover:text-white"
              onClick={() => {
                genterateCalories(cookiesConsumed);
                generateCookiesToSend([]);
              }}
              disabled={cookiesConsumed.some((cookie) => cookie.amount == 0)}
            >
              <Check /> Save
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
