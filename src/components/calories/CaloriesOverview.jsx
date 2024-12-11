import * as React from "react";

import { CookiesContext } from "@/pages/caloriesPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CaloriesChart } from "@/components/calories/CaloriesChart";
import { SearchIcon } from "@/components/global/iconsChristmas";

export default function CaloriesOverview() {
  const { caloriesData, cookiesData } = React.useContext(CookiesContext);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Santa &apos;s calories</CardTitle>
        <CardDescription>
          View Santa&apos;s cookies eaten, total calories, and available cookies
          in one place
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 justify-between h-full">
        {cookiesData.length > 0 && caloriesData.consumedCookies > 0 ? (
          <CaloriesChart />
        ) : (
          <Card className="flex flex-col items-center h-full">
            <CardHeader>
              <CardTitle>No calories information</CardTitle>
              <CardDescription>
                There is currently no information available regarding the
                cookies Santa has consumed.
              </CardDescription>
            </CardHeader>
            <SearchIcon width={120} height={120} className="my-auto" />
          </Card>
        )}
        <Separator />
        <Card className="text-center bg-gradient-to-r from-red-100 to-green-100">
          <CardHeader>
            <CardTitle>Total calories</CardTitle>
            <CardDescription>{`${caloriesData.totalCalories} Calories`}</CardDescription>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  );
}
