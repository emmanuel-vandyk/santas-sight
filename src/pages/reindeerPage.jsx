import * as React from "react";

import { useReindeers } from "@/services/reindeer/reindeerapi";
import { useReindeersOrganizations } from "@/services/reindeer/organizationapi";
import {
  LoadingScreen,
  ErrorScreen,
} from "@/components/global/santaDataLoader";
import OrganizationManager from "@/components/reindeer/OrganizationManager";
// import { WeatherCard } from "@/components/reindeer/WeatherCard";
import { UnderlineTitle } from "@/components/global/underlineTitle";

export const ReindeerPage = () => {
  // Fetching data and states for reindeers.
  const {
    data: reindeersData,
    isLoading: isLoadingReindeers,
    isError: isErrorReindeers,
  } = useReindeers();
  // Fetching data and states for organizations.
  const {
    data: organizationsData,
    isLoading: isLoadingOrganizations,
    isError: isErrorOrganizations,
  } = useReindeersOrganizations();

  // Display the loading screen if any data is still loading.
  if (isLoadingReindeers || isLoadingOrganizations) return <LoadingScreen />;
  // Display the error screen if there was an issue fetching data.
  if (isErrorReindeers || isErrorOrganizations) return <ErrorScreen />;

  return (
    <>
      <section>
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
          <UnderlineTitle text="Reindeer Setup" />
        </h1>
        <div className="flex flex-col gap-5 sm:p-8">
          {/* <WeatherCard /> */}
          <OrganizationManager data={{ reindeersData, organizationsData }} />
        </div>
      </section>
    </>
  );
};
