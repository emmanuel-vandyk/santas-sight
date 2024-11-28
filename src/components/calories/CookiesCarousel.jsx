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
  // Check if all cookies have been consumed
  const isConsumptionAll = cookieData.consumed === cookieData.quantity;

  // Handle changes to the number of consumed cookies
  const handleConsumedChange = (e) => {
    // Make sure the entered value is between zero and the available quantity of cookies.
    const newConsumed = Math.min(
      Math.max(0, e.target.value),
      cookieData.quantity - cookieData.consumed
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
              {`${cookieData.consumed} / ${cookieData.quantity}`}
              <Cookie size={18} />
            </CardDescription>
          </CardContent>
          <div
            className={cn(
              {
                hidden: !isConsumptionAll,
              },
              "p-2"
            )}
          >
            <div className="flex text-sm text-muted-foreground gap-2 items-center">
              <BadgeInfo size={16} />
              Santa ate all the cookies! Add more to give him.
            </div>
          </div>
        </Card>
        <Card
          className={cn({
            hidden: isConsumptionAll,
          })}
        >
          <div className="flex flex-col gap-4 p-3">
            <Label htmlFor="consumed" className="text-zinc-500">
              Cookies to Santa
            </Label>
            <Input
              className="bg-transparent border border-green-200 rounded-md px-3 py-2"
              id="consumed"
              type="number"
              placeholder="Enter a number of cookies for Santa"
              min="0"
              max={cookieData.quantity - cookieData.consumed}
              onChange={handleConsumedChange}
            />
          </div>
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
              <CardDescription>{`${cookieData.totalCalories} Calories`}</CardDescription>
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
