import * as React from "react"
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import santahat from "@/assets/santahat.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { DialogDescription } from '@radix-ui/react-dialog';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function ChildModal({ child, onSubmit }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const methods = useForm({
    defaultValues: {
      behavior: child.behavior,
      levelBehavior: child.levelBehavior,
    },
    mode: 'onChange', // This allows validation while the user is typing.
  });

  const handleFormSubmit = (data) => { 
    const updatedChild = {
      ...child,
      behavior: data.behavior,
      levelBehavior: data.levelBehavior,
    };
    onSubmit(updatedChild);
    setIsOpen(false);
  };

  const selectBehavior = ["Kind", "Respectful", "Lazy", "Helpful", "Curious"];
  const selectLevelBehavior = ['Good', 'Regular', 'Bad'];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-red-100 to-green-100">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl font-bold text-red-600">
            Edit Child
            <img
              src={santahat}
              alt="Santa Hat"
              className="absolute -top-11 -left-2 w-12 h-12"
            />
          </DialogTitle>
          <DialogDescription className="text-center text-green-700">
            Update the details of the Child
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormItem>
              <FormLabel className="text-right text-zinc-500">Behavior</FormLabel>
              {/* Campo Behavior */}
              <Controller
                control={methods.control}
                name="behavior"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-red-400 rounded-md px-3 py-2 ring-0 focus:ring-0"
                  onFoc>
                    <SelectValue placeholder="Select behavior" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectBehavior.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                )} />
            </FormItem>
            {/* Campo Level Behavior */}
            <FormItem>
              <FormLabel className="text-right text-zinc-500">Level Behavior</FormLabel><span className=' text-gray-500 text-xs'> (Good, Regular or Bad)</span>
              <Controller
                control={methods.control}
                name="levelBehavior"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-red-400 rounded-md px-3 py-2 ring-0 focus:ring-0">
                    <SelectValue placeholder="Select level behavior" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectLevelBehavior.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                )} />
            </FormItem>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Save changes
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}