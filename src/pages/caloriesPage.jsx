import * as React from "react";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import CookiesTracker from "@/components/calories/CookiesTracker";
import { Card } from "@/components/ui/card";

export const CaloriesPage = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
        <UnderlineTitle text="Santa's Calories Counter" />
      </h1>
      <div className="grid grid-cols-1 gap-3 sm:p-8  lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CookiesTracker />
        </div>
        <Card className="flex items-center justify-center">
          Preview Calories
        </Card>
      </div>
    </section>
  );
};
