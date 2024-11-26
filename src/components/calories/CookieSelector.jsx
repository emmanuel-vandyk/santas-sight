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
          from the list, view detailed information about each, or add more
          cookies for Santa.
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
