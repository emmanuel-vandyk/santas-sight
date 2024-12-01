import * as React from "react";

import { CookiesContext } from "@/pages/caloriesPage";
import {
  useAddCookiesForSanta,
  useUpdateCookiesForSanta,
} from "@/services/calories/cookiesapi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import CookieModal from "@/components/calories/CookieModal";
import CookiesList from "@/components/calories/CookiesList";
import CaloriesManager from "@/components/calories/CaloriesManager";
import CaloriesGuide from "@/components/calories/CaloriesGuide";

// Create a context to store and provide the modal state
export const ModalContext = React.createContext();

export default function CookiesManager() {
  const { cookiesData } = React.useContext(CookiesContext);
  const toast = useToast();
  // Mutations for adding and updating cookies data.
  const addCookiesMutation = useAddCookiesForSanta();
  const updateCookiesMutation = useUpdateCookiesForSanta();

  // State for controlling the modal's visibility and content.
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    cookieData: null,
  });

  const [cookiesToSend, setCookiesToSend] = React.useState([]);

  // Generic function to handle async mutation calls.
  const hadleMutation = async (
    mutation,
    data,
    success = "Operation successful",
    error = "Failed to complete the operation. Please verify the information."
  ) => {
    try {
      await mutation.mutateAsync(data);
      toast.success(success);
    } catch {
      toast.error(error);
    }
  };

  // Function to generate the list of cookies to send, based on the provided cookie IDs
  const generateCookiesToSend = (cookieIds) => {
    // Map the cookie IDs and get the corresponding data for each cookie
    const selectedCookies = Array.prototype.concat(cookieIds).map((id) => {
      // Find the cookie in the cookiesData array by matching the id
      return cookiesData.find((cookie) => cookie.id === id);
    });

    // Set the state with the selected cookies list
    setCookiesToSend(selectedCookies);
  };

  // Determines if there is available cookie data. If cookiesData has elements, isDataAvailable will be true.
  const isDataAvailable = cookiesToSend.length > 0;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Cookie Tracker</CardTitle>
          <CardDescription>
            Here, you can add new cookies, remove existing ones, and view
            detailed information about each type. You can also log the cookies
            Santa eats to monitor his calorie intake.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <ModalContext.Provider value={{ modalState, setModalState }}>
              <CookiesList generateCookiesToSend={generateCookiesToSend} />
              {isDataAvailable ? (
                <CaloriesManager data={cookiesToSend} />
              ) : (
                <CaloriesGuide setModalState />
              )}
            </ModalContext.Provider>
          </div>
        </CardContent>
      </Card>
      <CookieModal
        isOpen={modalState.isOpen}
        isClose={() => {
          setModalState({
            isOpen: false,
            cookieData: null,
          });
        }}
        onSubmit={(data) => {
          hadleMutation(
            modalState.cookieData ? updateCookiesMutation : addCookiesMutation,
            data,
            "Cookie saved successfully"
          );
          setCookiesToSend([data]);
        }}
        data={modalState.cookieData}
      />
    </>
  );
}
