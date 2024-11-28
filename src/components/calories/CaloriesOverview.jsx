import * as React from "react";

import { CookiesContext } from "@/pages/caloriesPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChristmasSantaClaus } from "@/components/global/iconsChristmas";

export default function CaloriesOverview() {
  const { caloriesData } = React.useContext(CookiesContext);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Santa &apos;s calories</CardTitle>
        <CardDescription>
          View Santa&apos;s cookies eaten, total calories, and available cookies
          in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChristmasSantaClaus className="w-1/2 mx-auto" />
        <div className="flex flex-col gap-3 w-full">
          <Card className=" w-full text-center">
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
              <CardDescription>{`${caloriesData.totalCookies} Cookies`}</CardDescription>
            </CardHeader>
          </Card>
          <Card className=" w-full text-center">
            <CardHeader>
              <CardTitle>Cookies consumed</CardTitle>
              <CardDescription>{`${caloriesData.totalConsumed} Cookies`}</CardDescription>
            </CardHeader>
          </Card>
          <Card className=" w-full text-center">
            <CardHeader>
              <CardTitle>Total calories</CardTitle>
              <CardDescription>{`${caloriesData.totalCalories} Calories`}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
