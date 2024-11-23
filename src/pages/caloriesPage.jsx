import * as React from "react";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import CookiesList from "@/components/calories/CookiesList";

export const CaloriesPage = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
        <UnderlineTitle text="Santa's Calories Counter" />
      </h1>
      <div className="grid grid-cols-3">
        <CookiesList />
      </div>
    </section>
  );
};
