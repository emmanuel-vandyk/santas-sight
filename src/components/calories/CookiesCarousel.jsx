import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Cookie } from "lucide-react";

export default function CookiesCarousel({ data: CookiesData }) {
  return (
    <Carousel>
      <CarouselContent className="-mt-1 h-[200px]">
        {CookiesData.map((cookie) => (
          <CarouselItem key={cookie.id}>
            <CardHeader className="flex items-center gap-1">
              <Cookie size={18} />
              <CardTitle>{cookie.name}</CardTitle>
            </CardHeader>
            <CardContent>{`Cookie Id: ${cookie.id}`}</CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full flex justify-around">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
}
