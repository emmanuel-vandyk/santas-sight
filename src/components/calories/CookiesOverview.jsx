import * as React from "react";
import { ModalContext } from "@/components/calories/CookiesTracker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { PlusSquare } from "lucide-react";
import CookiesCarousel from "@/components/calories/CookiesCarousel";
import CookieSelector from "@/components/calories/CookieSelector";

export default function CookiesOverview({
  generateCookiesToSend,
  generateCalories = () => {},
  data: cookiesToSend,
}) {
  // Use the context to access the state and its updater function
  const { setModalState } = React.useContext(ModalContext);
  const [cookies, setCookies] = React.useState([]);

  React.useEffect(() => {
    if (cookiesToSend) {
      setCookies(cookiesToSend);
    }
  }, [cookiesToSend]);

  // Determines if there is available cookie data. If cookiesData has elements, isDataAvailable will be true.
  const isDataAvailable = cookiesToSend.length > 0;

  return (
    <Card className="flex flex-col justify-between gap-2 box-border ">
      {isDataAvailable ? (
        <CookiesCarousel data={cookiesToSend} setCookies={setCookies} />
      ) : (
        <CookieSelector />
      )}
      <CardFooter className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setModalState({ isOpen: true, cookieData: null })}
          className={cn(
            {
              hidden: isDataAvailable,
            },
            "w-full"
          )}
        >
          <PlusSquare />
          New cookie
        </Button>
        <Button
          variant="outline"
          className={cn(
            {
              hidden: !isDataAvailable,
            },
            "w-full"
          )}
          onClick={() => {
            generateCookiesToSend([]);
            generateCalories(cookies);
          }}
          disabled={
            cookiesToSend.length == 1
              ? cookiesToSend[0].consumed === cookiesToSend[0].quantity
              : false
          }
        >
          <PlusSquare />
          Add calories
        </Button>
      </CardFooter>
    </Card>
  );
}
