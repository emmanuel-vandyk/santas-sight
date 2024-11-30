import * as React from "react";

import { cn } from "@/lib/utils";
import { ModalContext } from "@/components/calories/CookiesManager";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlusSquare, Cookie, BadgeInfo } from "lucide-react";
import { ChristmasCookies } from "@/components/global/iconsChristmas";

function CookiesGuide() {
  // Use the context to access the state and its updater function
  const { setModalState } = React.useContext(ModalContext);

  return (
    <>
      <CardHeader>
        <CardTitle>Choose Your Cookie</CardTitle>
        <CardDescription>
          Explore and manage cookies for Santa. Select one or multiple cookies
          from the list, view detailed information about each, or add more
          cookies for Santa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <ChristmasCookies className="w-1/2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={() => setModalState({ isOpen: true, cookieData: null })}
          className="w-full"
        >
          <PlusSquare />
          New cookie
        </Button>
      </CardFooter>
    </>
  );
}

function CookieCard({ data: cookieData, setCookies }) {
  const [userPreview, setUserPreview] = React.useState({
    consumed: 0,
    calories: 0,
  });

  const [newQuantity, setNewQuantity] = React.useState(0);

  // Check if all cookies have been consumed
  const isConsumptionAll = cookieData.quantity == 0;

  // Handle changes to the number of consumed cookies
  const handleConsumedChange = (e) => {
    // Make sure the entered value is between zero and the available quantity of cookies.
    const newConsumed = Math.round(
      Math.min(Math.max(0, e.target.value), cookieData.quantity)
    );

    // Update the state of cookies
    setCookies((prevState) => {
      // Update consumed count by adding the new cookies
      return prevState.map((cookie) =>
        cookie.id === cookieData.id
          ? { ...cookie, consumed: cookieData.consumed + newConsumed }
          : cookie
      );
    });

    setUserPreview({
      consumed: newConsumed,
      calories: newConsumed * cookieData.calories,
    });
  };

  const handleQuantityChange = () => {
    //console.log(newQuantity);
  };

  return (
    <>
      <CardContent className="flex flex-col gap-3">
        <Card
          className={cn({
            hidden: isConsumptionAll,
            "flex flex-col gap-4 p-3": !isConsumptionAll,
          })}
        >
          <div className="flex justify-between">
            <Label htmlFor="consumed" className="text-zinc-500">
              Cookies to Santa
            </Label>
            <div className="flex gap-2">
              <Label className="text-green-500 flex items-center gap-2">
                {cookieData.quantity}
                <Cookie size={18} />
              </Label>
              <Label
                className={cn({
                  hidden: userPreview.consumed == 0,
                  "text-red-500 flex items-center gap-2":
                    userPreview.consumed > 0,
                })}
              >
                {`- ${userPreview.consumed}`}
                <Cookie size={18} />
              </Label>
            </div>
          </div>
          <Input
            className="bg-transparent border border-green-200 rounded-md text-sm text-muted-foreground px-3 py-2"
            id="consumed"
            type="number"
            placeholder="Enter how many cookies Santa will eat"
            min="0"
            max={cookieData.quantity}
            onChange={handleConsumedChange}
          />
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-3 mt-0">
            <CardTitle>Cookies consumed</CardTitle>
            <CardDescription
              className={cn(
                {
                  "text-green-500": userPreview.calories > 0,
                },
                "flex items-center gap-2 mt-0"
              )}
            >
              {cookieData.consumed + userPreview.consumed}
              <Cookie size={18} />
            </CardDescription>
          </CardContent>
          <div
            className={cn({
              hidden: !isConsumptionAll,
              " flex items-center text-sm text-muted-foreground gap-2 p-2":
                isConsumptionAll,
            })}
          >
            <BadgeInfo size={16} />
            Santa devoured all the cookies! Got more to keep him going?
          </div>
        </Card>
        <Card
          className={cn({
            hidden: !isConsumptionAll,
            "flex flex-col justify-between gap-4 p-3": isConsumptionAll,
          })}
        >
          <Label htmlFor="quantity" className="text-zinc-500">
            Cookies to Save
          </Label>
          <div className="flex gap-2">
            <Input
              className="bg-transparent border border-green-200 rounded-md text-sm text-muted-foreground px-3 py-2"
              id="quantity"
              type="number"
              placeholder="Enter number of cookies"
              min="1"
              onChange={(e) => {
                setNewQuantity(Math.round(Math.max(0, e.target.value)));
              }}
            />
            <Button variant="outline" onClick={handleQuantityChange}>
              Add
            </Button>
          </div>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-3 mt-0">
            <CardTitle>Calories per cookie</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-0">
              {`${cookieData.calories} Calories`}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-3 mt-0">
            <CardTitle>Total calories</CardTitle>
            <CardDescription
              className={cn({
                "text-green-500": userPreview.calories > 0,
              })}
            >
              {`${cookieData.totalCalories + userPreview.calories} Calories`}
            </CardDescription>
          </CardContent>
        </Card>
      </CardContent>
    </>
  );
}

function CookiesDetails({ data: cookiesData, setCookies }) {
  return (
    <Carousel>
      <CarouselContent>
        {cookiesData.map((cookie) => (
          <CarouselItem key={cookie.id}>
            <CardHeader>
              <div className="flex gap-2">
                <Cookie size={18} />
                <CardTitle>{cookie.name}</CardTitle>
              </div>
            </CardHeader>
            <CookieCard data={cookie} setCookies={setCookies} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full flex justify-around p-3">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
}

export default function CookiesOverview({
  generateCalories = () => {},
  data: cookiesToSend,
}) {
  const [cookies, setCookies] = React.useState([]);

  React.useEffect(() => {
    if (cookiesToSend) {
      setCookies(cookiesToSend);
    }
  }, [cookiesToSend]);

  // Determines if there is available cookie data. If cookiesData has elements, isDataAvailable will be true.
  const isDataAvailable = cookiesToSend.length > 0;

  return (
    <Card className="flex flex-col justify-between gap-2 box-border">
      {isDataAvailable ? (
        <>
          <CookiesDetails data={cookiesToSend} setCookies={setCookies} />
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                generateCalories(cookies);
              }}
              disabled={
                cookiesToSend.length == 1
                  ? cookiesToSend[0].quantity == 0
                  : false
              }
            >
              <PlusSquare />
              Add calories
            </Button>
          </CardFooter>
        </>
      ) : (
        <CookiesGuide />
      )}
    </Card>
  );
}
