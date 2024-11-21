import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import ReindeerComboBox from "@/components/reindeer/ReindeerComboBox";
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
import { useToast } from "@/hooks/useToast";

export default function OrganizationModal({
  isOpen,
  isClose,
  onSubmit,
  data: { organizationData, reindeersData },
  setOrganizationView,
}) {
  const toast = useToast();
  const [addBestReindeer, setAddBestReindeer] = useState(false);
  const [bestReindeers, setBestReindeers] = useState(null);
  const [initialPositions, setInitialPositions] = useState([]);

  const defaultValues = organizationData || {
    name: "",
    positions: [
      { position: 1, reindeer: "" },
      { position: 2, reindeer: "" },
      { position: 3, reindeer: "" },
      { position: 4, reindeer: "" },
      { position: 5, reindeer: "" },
      { position: 6, reindeer: "" },
    ],
    isSelected: false,
    isAvailable: true,
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const positions = watch("positions");

  useEffect(() => {
    if (organizationData) {
      reset(organizationData);
      setInitialPositions(organizationData.positions);
    } else {
      reset(defaultValues);
      setInitialPositions(defaultValues.positions);
    }
  }, [organizationData, reset]);

  useEffect(() => {
    const sortedReindeers = [...reindeersData].sort((a, b) => {
      const aScore =
        a.skills.find((s) => s.skill === "Night vision").value +
        a.skills.find((s) => s.skill === "Climate adaptability").value;
      const bScore =
        b.skills.find((s) => s.skill === "Night vision").value +
        b.skills.find((s) => s.skill === "Climate adaptability").value;
      return bScore - aScore;
    });
    setBestReindeers(sortedReindeers.slice(0, 6));
  }, [reindeersData]);

  useEffect(() => {
    if (addBestReindeer) {
      bestReindeers.forEach((reindeer, index) => {
        if (index < 6) {
          setValue(`positions.${index}.reindeer`, reindeer.id);
        }
      });
    } else {
      initialPositions.forEach((position, index) => {
        setValue(`positions.${index}.reindeer`, position.reindeer);
      });
    }
  }, [addBestReindeer, bestReindeers, initialPositions, setValue]);

  const onSubmitForm = handleSubmit((data) => {
    const allPositionsHaveReindeer = data.positions.every(
      (position) => position.reindeer !== ""
    );

    onSubmit({
      id: organizationData
        ? organizationData.id
        : Math.round(Math.random() * 100).toString(),
      ...data,
      isSelected: organizationData
        ? allPositionsHaveReindeer
          ? organizationData.isSelected
          : false
        : false,
      isAvailable: organizationData
        ? allPositionsHaveReindeer
        : allPositionsHaveReindeer,
    });
    setOrganizationView(allPositionsHaveReindeer ? data : null);
    toast.success("Organization saved");
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={isClose}>
        <DialogContent className="sm:max-w-[450px] bg-gradient-to-b from-red-100 to-green-100">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-2xl font-bold text-red-600">
              <span className="relative">
                {organizationData ? "Edit organization" : "New organization"}
                <img
                  src={santahat}
                  alt="Santa hat"
                  className="absolute -top-11 -left-2 w-12 h-12"
                />
              </span>
            </DialogTitle>
            <DialogDescription className="text-center text-green-700">
              {organizationData
                ? "Edit the details of the organization"
                : "Add a new reindeer organization to Santa's workshop"}
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
              <div className="col-span-1 w-full h-max">
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
                  <p
                    role="alert"
                    className="text-xs font-bold text-red-500 mt-1"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="addBestReindeer"
                checked={addBestReindeer}
                onCheckedChange={setAddBestReindeer}
                className="border-red-400"
              />
              <Label
                htmlFor="addBestReindeer"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-700"
              >
                Suggested best reindeer for December 25th.
              </Label>
            </div>
            <Card className="bg-transparent">
              <div className="flex flex-col">
                <CardHeader>
                  <CardTitle>Organize your reindeer</CardTitle>
                  <CardDescription>
                    Organize the reindeer for Santa&apos;s sleigh. Click each
                    button to assign a different reindeer to its position. When
                    you click a button, a menu will appear with a list of
                    available reindeer for easy selection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5">
                    <h3 className="ml-5 text-center font-semibold">
                      Select reindeers 🦌
                    </h3>
                    <div className="grid grid-cols-2 gap-5 place-items-center md:grid-cols-3">
                      {positions.map((position, index) => (
                        <ReindeerComboBox
                          key={position.position}
                          data={listReindeers}
                          value={position.reindeer}
                          onChange={(value) =>
                            setValue(`positions.${index}.reindeer`, value)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <DialogFooter className="w-full">
                    <Button
                      type="submit"
                      className=" bg-green-600 hover:bg-green-700 w-full"
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

OrganizationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string, // This is a number, I use string because i can't query with ID number on json server
    name: PropTypes.string,
    positions: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.number,
        reindeer: PropTypes.string,
      })
    ),
    isAvailable: PropTypes.bool,
    isSelected: PropTypes.bool,
  }),
};
