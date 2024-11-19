import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReindeerComboBox from "@/components/reindeer/ReindeerComboBox";
import { ChristmasSantaSleight } from "@/components/global/iconsChristmas";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import santahat from "@/assets/santahat.svg";

export default function SleightModal({
  isOpen,
  isClose,
  onSubmit,
  data: { organizationData, reindeersData },
}) {
  const defaultValues = organizationData || {
    name: "",
    type: "",
    positions: [
      { position: 1, reindeer: "" },
      { position: 2, reindeer: "" },
      { position: 3, reindeer: "" },
      { position: 4, reindeer: "" },
      { position: 5, reindeer: "" },
      { position: 6, reindeer: "" },
    ],
    available: true,
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (organizationData) {
      reset(organizationData);
    } else {
      reset(defaultValues);
    }
  }, [organizationData, reset]);

  const onSubmitForm = handleSubmit((data) => {
    onSubmit({
      id: organizationData
        ? organizationData.id
        : Math.round(Math.random() * 100).toString(),
      ...data,
      available: organizationData ? organizationData.available : true,
    });
    isClose();
    reset();
  });

  const listReindeers = reindeersData
    .filter((reindeer) => reindeer.available)
    .map((reindeer) => ({
      id: reindeer.id,
      name: reindeer.name,
      position: reindeer.position,
    }));

  const saveOrderReinnders = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={isClose}>
        <DialogContent className="sm:max-w-[450px] bg-gradient-to-b from-red-100 to-green-100">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-2xl font-bold text-red-600">
              <span className="relative">
                {organizationData ? "Edit Organization" : "New Organization"}
                <img
                  src={santahat}
                  alt="Santa Hat"
                  className="absolute -top-11 -left-2 w-12 h-12"
                />
              </span>
            </DialogTitle>
            <DialogDescription className="text-center text-green-700">
              {organizationData
                ? "Edit the details of the Organization"
                : "Add a new Reindeer Organization to Santa's workshop"}
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
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.name.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <Card className="bg-transparent">
              <div className="flex flex-col">
                <CardHeader>
                  <CardTitle>Organize your reindeer</CardTitle>
                  <CardDescription>
                    Organize the reindeer for Santa's sleigh. Click each button
                    to assign a different reindeer to its position. When you
                    click a button, a menu will appear with a list of available
                    reindeer for easy selection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5">
                    <h3 className="ml-5 text-center font-semibold">
                      Select Reindeers 🦌
                    </h3>
                    <div className="grid grid-cols-2 gap-5 place-items-center md:grid-cols-3">
                      {organizationData
                        ? organizationData.positions.map(
                            ({ position, reindeer }) => (
                              <ReindeerComboBox
                                key={position}
                                data={listReindeers}
                                value={reindeer != "" ? reindeer : 0}
                              />
                            )
                          )
                        : Array.from({ length: 6 }).map((_, index) => (
                            <ReindeerComboBox
                              key={index}
                              data={listReindeers}
                            />
                          ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <DialogFooter>
                    <Button
                      type="submit"
                      className=" bg-green-600 hover:bg-green-700"
                    >
                      <Check /> Save
                    </Button>
                  </DialogFooter>
                </CardFooter>
              </div>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
