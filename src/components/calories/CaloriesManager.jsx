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

export default function CaloriesManager({ data: cookiesData }) {
  // State to track updates to the calories data
  const [calories, setCalories] = React.useState([]);

  // useEffect to update the default state when the component reloads with different cookiesData
  React.useEffect(() => {
    if (cookiesData) {
      setCalories(
        cookiesData.length > 1
          ? cookiesData.filter((cookie) => cookie.quantity > 0)
          : cookiesData
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
                  setCalories={setCalories}
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
            console.log("Save calories: ", calories);
          }}
        >
          <Check /> Save
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <Card className="flex flex-col gap-2 box-border">
      {cookiesData[0].quantity == 0 ? (
        <CookiesConsumedPanel data={cookiesData[0]} />
      ) : (
        <>
          <RemainingCookiesPanel
            data={cookiesData[0]}
            setCalories={setCalories}
          />
          <CardFooter className="mt-auto">
            <Button
              variant="outline"
              className=" bg-green-600 text-white w-full hover:bg-green-700 hover:text-white"
              onClick={() => {
                console.log("Save calories: ", calories);
              }}
            >
              <Check /> Save
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
