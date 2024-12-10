import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Cookie, BadgeInfo } from "lucide-react";

export function CookiesConsumedPanel({
  data: cookieData,
  addNewQuantity = () => {},
}) {
  const [newQuantity, setNewQuantity] = React.useState(0);

  const handleQuantityChange = () => {
    //console.log("Save :", { ...cookieData, quantity: newQuantity });
    addNewQuantity({ ...cookieData, quantity: newQuantity });
  };

  return (
    <>
      <CardHeader>
        <div className="flex gap-2">
          <Cookie size={18} />
          <CardTitle>{cookieData.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-3 mt-0">
            <CardTitle>Cookies consumed</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-0">
              {cookieData.consumed}
              <Cookie size={18} />
            </CardDescription>
          </CardContent>
          <div className=" flex items-center text-sm text-muted-foreground gap-2 p-2">
            <BadgeInfo size={16} />
            Santa devoured all the cookies! Got more to keep him going?
          </div>
        </Card>
        <Card className="flex flex-col justify-between gap-4 p-3">
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
            <CardDescription>
              {`${cookieData.totalCalories} Calories`}
            </CardDescription>
          </CardContent>
        </Card>
      </CardContent>
    </>
  );
}

export function RemainingCookiesPanel({
  data: cookieData,
  setCookiesConsumed,
}) {
  const [userConsume, setUserConsume] = React.useState({
    inputValue: "",
    consumed: 0,
    calories: 0,
  });

  React.useEffect(() => {
    setUserConsume({
      inputValue: "",
      consumed: 0,
      calories: 0,
    });
  }, [cookieData]);

  // Handle changes to the number of consumed cookies
  const handleConsumedChange = (e) => {
    // Make sure the entered value is between zero and the available quantity of cookies.
    const newConsumed = Math.round(
      Math.min(Math.max(0, e.target.value), cookieData.quantity)
    );

    // Update the state of consumed cookies
    setCookiesConsumed((prevState) => {
      // Update consumed count by adding the new cookies
      return prevState.map((cookie) =>
        cookie.cookieId === cookieData.id
          ? {
              ...cookie,
              amount: newConsumed,
            }
          : cookie
      );
    });

    setUserConsume({
      inputValue: e.target.value,
      consumed: newConsumed,
      calories: newConsumed * cookieData.calories,
    });
  };

  return (
    <>
      <CardHeader>
        <div className="flex gap-2">
          <Cookie size={18} />
          <CardTitle>{cookieData.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Card className="flex flex-col gap-4 p-3">
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
                  hidden: userConsume.consumed == 0,
                  "text-red-500 flex items-center gap-2":
                    userConsume.consumed > 0,
                })}
              >
                {`- ${userConsume.consumed}`}
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
            value={userConsume.inputValue}
          />
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-3 mt-0">
            <CardTitle>Cookies consumed</CardTitle>
            <CardDescription
              className={cn(
                {
                  "text-green-500": userConsume.calories > 0,
                },
                "flex items-center gap-2 mt-0"
              )}
            >
              {cookieData.consumed + userConsume.consumed}
              <Cookie size={18} />
            </CardDescription>
          </CardContent>
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
                "text-green-500": userConsume.calories > 0,
              })}
            >
              {`${cookieData.totalCalories + userConsume.calories} Calories`}
            </CardDescription>
          </CardContent>
        </Card>
      </CardContent>
    </>
  );
}
