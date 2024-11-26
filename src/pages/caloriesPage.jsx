import * as React from "react";
import { useCookiesForSanta } from "@/services/calories/cookiesapi";
import {
  LoadingScreen,
  ErrorScreen,
} from "@/components/global/santaDataLoader";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import CookiesTracker from "@/components/calories/CookiesTracker";
import CaloriesOverview from "@/components/calories/CaloriesOverview";

export const CaloriesPage = () => {
  // Fetching data for cookies.
  const { data: cookiesData, isLoading, isError } = useCookiesForSanta();

  // Display the loading screen if any data is still loading.
  if (isLoading) return <LoadingScreen />;
  // Display the error screen if there was an issue fetching data.
  if (isError) return <ErrorScreen />;

  return (
    <section>
      <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
        <UnderlineTitle text="Santa's Calories Counter" />
      </h1>
      <div className="grid grid-cols-1 gap-3 sm:p-8  lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CookiesTracker data={cookiesData} />
        </div>
        <CaloriesOverview />
      </div>
    </section>
  );
};
