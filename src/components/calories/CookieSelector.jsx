import * as React from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChristmasCookies } from "@/components/global/iconsChristmas";

export default function CookieSelector() {
  return (
    <>
      <CardHeader>
        <CardTitle>Choose Your Cookie</CardTitle>
        <CardDescription>
          Explore and manage cookies for Santa. Select one or multiple cookies
          from the list, get detailed information about each, or add more
          cookies for Santa. You can also create a new cookie or select an
          existing one below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <ChristmasCookies className="w-1/2" />
        </div>
      </CardContent>
    </>
  );
}
