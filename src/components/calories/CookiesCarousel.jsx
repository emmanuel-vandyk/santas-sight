import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Cookie, BadgeInfo } from "lucide-react";

function CookieCard({ data: cookieData, setCookies }) {
  const [userPreview, setUserPreview] = React.useState({
    consumed: 0,
    calories: 0,
  });
  // Check if all cookies have been consumed
  const isConsumptionAll = cookieData.quantity == 0;

  // Handle changes to the number of consumed cookies
  const handleConsumedChange = (e) => {
    // Make sure the entered value is between zero and the available quantity of cookies.
    const newConsumed = Math.min(
      Math.max(0, e.target.value),
      cookieData.quantity
    );

    // Update the state of cookies
    setCookies((prevState) => {
      // Update consumed count by adding the new cookies
      return prevState.map((cookie) =>
        cookie.id === cookieData.id
          ? { ...cookie, consumed: cookieData.consumed + newConsumed }
          : cookie
      );
    });

    setUserPreview({
      consumed: newConsumed,
      calories: newConsumed * cookieData.calories,
    });
  };

  return (
    <>
      <CardHeader>
        <div className="flex gap-2">
          <Cookie size={18} />
          <CardTitle>{cookieData.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-3 mt-0">
            <CardTitle>Cookies consumed</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-0">
              {cookieData.consumed}
              <Cookie size={18} />
            </CardDescription>
          </CardContent>
          <div
            className={cn({
              hidden: !isConsumptionAll,
              " flex text-sm text-muted-foreground gap-2 items-center p-2":
                isConsumptionAll,
            })}
          >
            <BadgeInfo size={16} />
            Santa ate all the cookies! Add more to give him.
          </div>
        </Card>
        <Card
          className={cn({
            hidden: isConsumptionAll,
            "flex flex-col gap-4 p-3": !isConsumptionAll,
          })}
        >
          <div className="flex justify-between">
            <Label htmlFor="consumed" className="text-zinc-500">
              Cookies to Santa
            </Label>
            <div className="flex gap-2">
              <Label className="text-green-500 flex items-center gap-2">
                {cookieData.quantity}
                <Cookie size={18} />
              </Label>
              <Label
                className={cn({
                  hidden: userPreview.consumed == 0,
                  "text-red-500 flex items-center gap-2":
                    userPreview.consumed > 0,
                })}
              >
                {`- ${userPreview.consumed}`}
                <Cookie size={18} />
              </Label>
            </div>
          </div>
          <Input
            className="bg-transparent border border-green-200 rounded-md px-3 py-2"
            id="consumed"
            type="number"
            placeholder="Enter how many cookies Santa will eat"
            min="0"
            max={cookieData.quantity}
            onChange={handleConsumedChange}
          />
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Calories per cookie</CardTitle>
              <CardDescription className="flex gap-2">
                {`${cookieData.calories} Calories`}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total calories</CardTitle>
              <CardDescription
                className={cn({
                  "text-green-500": userPreview.calories > 0,
                })}
              >{`${
                cookieData.totalCalories + userPreview.calories
              } Calories`}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </CardContent>
    </>
  );
}

export default function CookiesCarousel({ data: cookiesData, setCookies }) {
  return (
    <Carousel>
      <CarouselContent>
        {cookiesData.map((cookie) => (
          <CarouselItem key={cookie.id}>
            <CookieCard data={cookie} setCookies={setCookies} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full flex justify-around p-3">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
}
