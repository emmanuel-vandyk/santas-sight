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

export default function CaloriesOverview() {
  const { caloriesData } = React.useContext(CookiesContext);

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
        <CaloriesChart />
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
