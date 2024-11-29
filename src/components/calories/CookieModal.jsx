import * as React from "react";

import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import santahat from "@/assets/santahat.svg";
export default function CookieModal({
  isOpen,
  isClose,
  onSubmit,
  data: cookieData,
}) {
  const defaultValues = cookieData || {
    name: "",
    calories: null,
    quantity: null,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  React.useEffect(() => {
    if (cookieData) {
      reset(cookieData);
    } else {
      reset(defaultValues);
    }
  }, [cookieData, reset]);

  const onSubmitForm = handleSubmit((data) => {
    onSubmit({
      id: cookieData
        ? cookieData.id
        : Math.round(Math.random() * 100).toString(),
      ...data,
      calories: Number(data.calories),
      quantity: cookieData ? cookieData.quantity : Number(data.quantity),
      consumed: cookieData ? cookieData.consumed : 0,
      totalCalories: cookieData ? cookieData.totalCalories : 0,
    });
    isClose();
    reset();
  });

  return (
    <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent className="sm:max-w-[450px] bg-gradient-to-b from-red-100 to-green-100">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl font-bold text-red-600">
            <span className="relative">
              {cookieData ? "Edit cookie" : "+ New cookie"}
              <img
                src={santahat}
                alt="Santa hat"
                className="absolute -top-11 -left-2 w-12 h-12"
              />
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-green-700">
            {cookieData ? "Edit the details of the cookie" : "Add a new cookie"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitForm} className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Label
              htmlFor="name"
              className="text-center text-zinc-500 col-span-1 w-1/4"
            >
              Name
            </Label>
            <div className="col-span-1 w-full">
              <Input
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Z]/,
                    message: "First letter must be capital",
                  },
                })}
                className="w-full border border-red-400 rounded-md px-3 py-2"
              />
              {errors.name && (
                <p role="alert" className="text-xs font-bold text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Label
              htmlFor="calories"
              className="text-center text-zinc-500 col-span-1 w-1/4"
            >
              Calories
            </Label>
            <div className="col-span-1 w-full">
              <Input
                {...register("calories", {
                  required: "Calories is required",
                })}
                className="w-full border border-red-400 rounded-md px-3 py-2"
                type="number"
                min="1"
              />
              {errors.calories && (
                <p role="alert" className="text-xs font-bold text-red-500 mt-1">
                  {errors.calories.message}
                </p>
              )}
            </div>
          </div>
          <div
            className={cn({
              hidden: cookieData,
              "flex items-center justify-center gap-4": !cookieData,
            })}
          >
            <Label
              htmlFor="quantity"
              className="text-center text-zinc-500 col-span-1 w-1/4"
            >
              Quantity
            </Label>
            <div className="col-span-1 w-full">
              <Input
                {...register("quantity", {
                  required: "Quantity is required",
                })}
                className="w-full border border-red-400 rounded-md px-3 py-2"
                type="number"
                min={`${cookieData ? cookieData.consumed : 1}`}
              />
              {errors.quantity && (
                <p role="alert" className="text-xs font-bold text-red-500 mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              {cookieData ? "Save cookie" : "Add cookie"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

CookieModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cookieData: PropTypes.shape({
    id: PropTypes.string, // This is a number, I use string because i can't query with ID number on json server
    name: PropTypes.string,
    calories: PropTypes.number,
    quantity: PropTypes.number,
    consumed: PropTypes.number,
    totalCalories: PropTypes.number,
  }),
};
