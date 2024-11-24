import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, PlusSquare } from "lucide-react";
import CookiesCarousel from "@/components/calories/CookiesCarousel";

export default function CookiesOverview({ data: cookiesData }) {
  // Determines if there is available cookie data. If cookiesData has elements, isDataAvailable will be true.
  const isDataAvailable = cookiesData.length > 0;

  return (
    <Card>
      {isDataAvailable ? (
        <CookiesCarousel data={cookiesData} />
      ) : (
        <Card>No data</Card>
      )}
      <CardFooter>
        <Button
          variant="outline"
          className={cn({
            hidden: !isDataAvailable || cookiesData.length >= 2,
          })}
        >
          <Pencil /> Edit
        </Button>
        <Button
          variant="outline"
          className={cn({
            hidden: !isDataAvailable,
            "w-full": isDataAvailable,
          })}
        >
          <PlusSquare />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
