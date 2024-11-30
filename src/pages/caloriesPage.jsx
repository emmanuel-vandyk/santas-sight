import * as React from "react";

import {
  useCookiesForSanta,
  useSantaCalories,
} from "@/services/calories/cookiesapi";
import {
  LoadingScreen,
  ErrorScreen,
} from "@/components/global/santaDataLoader";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import CookiesManager from "@/components/calories/CookiesManager";
import CaloriesOverview from "@/components/calories/CaloriesOverview";

export const CookiesContext = React.createContext();

export const CaloriesPage = () => {
  // Fetching data for cookies.
  const {
    data: cookiesData,
    isLoading: isLoadingCookies,
    isError: isErrorCookies,
  } = useCookiesForSanta();
  const {
    data: caloriesData,
    isLoading: isLoadingCalories,
    isError: isErrorCalories,
  } = useSantaCalories();

  // Display the loading screen if any data is still loading.
  if (isLoadingCookies || isLoadingCalories) return <LoadingScreen />;
  // Display the error screen if there was an issue fetching data.
  if (isErrorCookies || isErrorCalories) return <ErrorScreen />;

  return (
    <section>
      <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
        <UnderlineTitle text="Santa's Calories Counter" />
      </h1>
      <CookiesContext.Provider value={{ cookiesData, caloriesData }}>
        <div className="grid grid-cols-1 gap-3 sm:p-8  lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CookiesManager />
          </div>
          <CaloriesOverview />
        </div>
      </CookiesContext.Provider>
    </section>
  );
};
