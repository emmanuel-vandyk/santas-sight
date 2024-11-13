import { useEffect } from "react";
import PropTypes from "prop-types";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import santahat from "@/assets/santahat.svg";

export default function ElveModal({ isOpen, isClose, onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      name: "",
      height: "",
      age: "",
      address: "",
      mail: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        height: "",
        age: "",
        address: "",
        mail: "",
      });
    }
  }, [initialData, reset]);

  const onSubmitForm = (data) => {
    
    onSubmit({
      ...data,
      isDeleted: false,
    });
    isClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-red-100 to-green-100">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl font-bold text-red-600">
            <span className="relative">
              {initialData ? "Edit Elve" : "+ New Elve"}
              <img
                src={santahat}
                alt="Santa Hat"
                className="absolute -top-11 -left-2 w-12 h-12"
              />
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-green-700">
            {initialData ? "Edit the details of the Elve" : "Add a new Elve to Santa's workshop"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-zinc-500">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                {...register("name", {
                  required: "Name is required",
                  validate: (value) => {
                    if (!/^[A-Z]/.test(value)) {
                      return "First letter must be capital";
                    }
                    if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(value)) {
                      return "Must be full name (first and last name)";
                    }
                    return true;
                  },
                })}
                className="border border-red-400 rounded-md px-3 py-2"
              />
              {errors.name && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.name.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right text-zinc-500">
              Height
            </Label>
            <div className="col-span-3">
              <Input
                {...register("height", {
                  required: "Height is required",
                  validate: (value) => {
                    if (/[a-zA-Z]/.test(value)) {
                      return "Height must not contain letters";
                    }
                    return true;
                  },
                })}
                className="border border-red-400 rounded-md px-3 py-2"
              />
              {errors.height && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.height.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right text-zinc-500">
              Age
            </Label>
            <div className="col-span-3">
              <Input
                {...register("age", {
                  required: "Age is required",
                  validate: (value) => {
                    if (isNaN(Number(value))) {
                      return "Age must be a valid number";
                    }
                    return true;
                  },
                })}
                type="number"
                className="border border-red-400 rounded-md px-3 py-2"
              />
              {errors.age && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.age.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right text-zinc-500">
              Address
            </Label>
            <div className="col-span-3">
              <Input
                {...register("address", { required: "Address is required" })}
                className="border border-red-400 rounded-md px-3 py-2"
              />
              {errors.address && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.address.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right text-slate-200 text-bold">
              Email
            </Label>
            <div className="col-span-3">
              <Input
                {...register("mail", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Must be a valid email address",
                  },
                })}
                type="email"
                className="border border-red-400 rounded-md px-3 py-2"
              />
              {errors.email && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.email.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              {initialData ? "Save Elve" : "Add Elve"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

ElveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    height: PropTypes.string,
    age: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
  }),
};