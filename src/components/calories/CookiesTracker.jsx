import * as React from "react";
import { useCookiesForSanta } from "@/services/calories/cookiesapi";
import {
  LoadingScreen,
  ErrorScreen,
} from "@/components/global/santaDataLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CookiesList from "@/components/calories/CookiesList";
import CookiesOverview from "@/components/calories/CookiesOverview";

export default function CookiesTracker() {
  // Fetching data for cookies.
  const { data: cookiesData, isLoading, isError } = useCookiesForSanta();

  // Generic function to handle async mutation calls.
  const hadleMutation = async (mutation, data) => {
    await mutation.mutateAsync(data);
  };

  // Display the loading screen if any data is still loading.
  if (isLoading) return <LoadingScreen />;
  // Display the error screen if there was an issue fetching data.
  if (isError) return <ErrorScreen />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Tracker</CardTitle>
        <CardDescription>
          Here, you can add new cookies, remove existing ones, and view detailed
          information about each type. You can also log the cookies Santa eats
          to monitor his calorie intake.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <CookiesList data={cookiesData} />
          <CookiesOverview />
        </div>
      </CardContent>
    </Card>
  );
}
