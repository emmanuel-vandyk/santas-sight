import { useEffect } from "react"
import propTypes from "prop-types"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import santahat from "@/assets/santahat.svg"

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
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({
        name: "",
        height: "",
        age: "",
        address: "",
        mail: "",
      })
    }
  }, [initialData, reset])

  const onSubmitForm = (data) => {
    onSubmit({
      id: initialData ? initialData.id : Math.round(Math.random() * 100).toString(),
      ...data,
      isDeleted: false,
    })
    isClose()
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-red-100 to-green-100 p-6">
        <DialogHeader className="text-start mb-4">
          <DialogTitle className="text-2xl font-bold text-red-600 relative inline-block">
            {initialData ? "Edit Elve" : "+ New Elve"}
            <img
              src={santahat}
              alt=""
              className="absolute -top-10 -left-6 w-12 h-12"
              aria-hidden="true"
            />
          </DialogTitle>
          <DialogDescription className="text-green-700">
            {initialData
              ? "Edit the details of the Elve"
              : "Add a new Elve to Santa's workshop"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-500">
              Name
            </Label>
            <Input
              id="name"
              {...register("name", {
                required: "Name is required",
                validate: (value) => {
                  if (!/^[A-Z]/.test(value)) {
                    return "First letter must be capital"
                  }
                  if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(value)) {
                    return "Must be full name (first and last name)"
                  }
                  return true
                },
              })}
              aria-invalid={errors.name ? "true" : "false"}
              className="border border-red-400 rounded-md px-3 py-2"
            />
            {errors.name && (
              <p role="alert" className="text-xs font-bold text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="height" className="text-zinc-500">
              Height (m)
            </Label>
            <Input
              id="height"
              {...register("height", {
                required: "Height is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Height must be a number with up to 2 decimal places"
                }
              })}
              aria-invalid={errors.height ? "true" : "false"}
              className="border border-red-400 rounded-md px-3"
            />
            {errors.height && (
              <p role="alert" className="text-xs font-bold text-red-500">
                {errors.height.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="text-zinc-500">
              Age
            </Label>
            <Input
              id="age"
              {...register("age", {
                required: "Age is required",
                validate: (value) => {
                  if (!/^\d{1,3}$/.test(value)) {
                    return "Age must be a number with a maximum of 3 digits"
                  }
                  return true
                },
              })}
              aria-invalid={errors.age ? "true" : "false"}
              className="border border-red-400 rounded-md px-3"
            />
            {errors.age && (
              <p role="alert" className="text-xs font-bold text-red-500">
                {errors.age.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-zinc-500">
              Address
            </Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
              aria-invalid={errors.address ? "true" : "false"}
              className="border border-red-400 rounded-md px-3"
            />
            {errors.address && (
              <p role="alert" className="text-xs font-bold text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email" className="text-zinc-500">
              Email
            </Label>
            <Input
              id="email"
              {...register("mail", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Must be a valid email address",
                },
              })}
              type="email"
              aria-invalid={errors.mail ? "true" : "false"}
              className="border border-red-400 rounded-md px-3"
            />
            {errors.mail && (
              <p role="alert" className="text-xs font-bold text-red-500">
                {errors.mail.message}
              </p>
            )}
          </div>
        </form>
        <DialogFooter className="mt-6 flex justify-center">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmitForm)}
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            {initialData ? "Save Elve" : "Add Elve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

ElveModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  isClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  initialData: propTypes.object,
}