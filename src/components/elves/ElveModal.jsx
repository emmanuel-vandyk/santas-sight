import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

export default function ElveModal({ isOpen, isClose, onSubmit, initialData }) {
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [height, setHeight] = useState(
    initialData ? initialData.height.toString() : ""
  );
  const [age, setAge] = useState(initialData ? initialData.age : "");
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [email, setEmail] = useState(initialData ? initialData.email : "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setHeight(initialData.height);
      setAge(initialData.age);
      setAddress(initialData.address);
      setEmail(initialData.email);
    } else {
      setName("");
      setHeight("");
      setAge("");
      setAddress("");
      setEmail("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.round(Math.random() * 100);
    onSubmit({
      id,
      name,
      height,
      age: parseInt(age),
      address,
      email,
    });
    isClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Elve" : "+ New Elve"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Edit the details of the Elve" : "Add a new Elve"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex flex-row items-center space-x-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                className="flex-grow"
                value={name}
                type="text"
                required
              />
            </div>
            <div className="flex flex-row items-center space-x-4">
              <Label htmlFor="height" className="text-right">
                Height
              </Label>
              <Input
                onChange={(e) => setHeight(e.target.value)}
                id="height"
                name="height"
                className="flex-grow"
                value={height}
                type="text"
                required
              />
            </div>
            <div className="flex flex-row items-center space-x-4">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <Input
                onChange={(e) => setAge(e.target.value)}
                id="age"
                name="age"
                className="flex-grow"
                value={age}
                type="number"
                required
              />
            </div>
            <div className="flex flex-row items-center space-x-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                name="address"
                className="flex-grow"
                value={address}
                type="text"
                required
              />
            </div>
            <div className="flex flex-row items-center space-x-4">
              <Label htmlFor="email" className="text-right">
                Emails
              </Label>
              <Input
                id="email"
                name="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {initialData ? "Save data" : "Add Elve"}
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
    name: PropTypes.string,
    height: PropTypes.string,
    age: PropTypes.number,
    address: PropTypes.string,
    email: PropTypes.string,
  }),
};
