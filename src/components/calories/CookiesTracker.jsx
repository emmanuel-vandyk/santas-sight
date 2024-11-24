import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CookiesList from "@/components/calories/CookiesList";
import CookiesOverview from "@/components/calories/CookiesOverview";

export default function CookiesTracker({ data: cookiesData }) {
  const [cookiesToSend, setCookiesToSend] = React.useState([]);

  // Function to generate the list of cookies to send, based on the provided cookie IDs
  const generateCookiesToSend = (cookieIds) => {
    // Map the cookie IDs and get the corresponding data for each cookie
    const selectedCookies = [].concat(cookieIds).map((id) => {
      // Find the cookie in the cookiesData array by matching the id
      return cookiesData.find((cookie) => cookie.id === id);
    });

    // Set the state with the selected cookies list
    setCookiesToSend(selectedCookies);
  };

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
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <CookiesList
            data={cookiesData}
            generateCookiesToSend={generateCookiesToSend}
          />
          <CookiesOverview data={cookiesToSend} />
        </div>
      </CardContent>
    </Card>
  );
}
