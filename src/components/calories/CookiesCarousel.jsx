import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Cookie } from "lucide-react";
import { ChristmasCookies } from "@/components/global/iconsChristmas";

function CookieCard({ cookieData }) {
  return (
    <>
      <CardHeader>
        <div className="flex gap-2">
          <Cookie size={18} />
          <CardTitle>{cookieData.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-2">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-3 mt-0">
            <CardTitle>Cookies Consumed</CardTitle>
            <CardDescription className="flex gap-2 mt-0">
              {cookieData.quantity}
              <Cookie size={18} />
            </CardDescription>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Calories per cookie</CardTitle>
              <CardDescription className="flex gap-2">
                {`${cookieData.calories} Calories`}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex items-center justify-center">
            <ChristmasCookies className="w-1/2 h-1/2" />+ 0
          </Card>
        </div>
        <Input
          type="number"
          placeholder="Number of cookies for Santa"
          min="0"
        />
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle>Total Calories</CardTitle>
            <CardDescription>{`${cookieData.totalCalories} Calories`}</CardDescription>
          </CardHeader>
        </Card>
      </CardContent>
    </>
  );
}

export default function CookiesCarousel({ data: CookiesData }) {
  return (
    <Carousel>
      <CarouselContent>
        {CookiesData.map((cookie) => (
          <CarouselItem key={cookie.id}>
            <CookieCard cookieData={cookie} />
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
