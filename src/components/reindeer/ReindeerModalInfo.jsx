import { useState, useEffect } from "react";
import propTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import reno from "@/assets/reno.png";
import reindeerbackg from "@/assets/reindeerbackg.jpeg";
import { SnowDecoration } from "@/components/global/snowDecoration";

export default function ReindeerModalInfo({ data: reindeer, isOpen, onClose }) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  if (!reindeer) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-green-100 to-red-100">
        <SnowDecoration className="absolute top-0 left-0 w-full h-full" />
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600">
            {reindeer.name}
          </DialogTitle>
          <DialogDescription>Stadistics</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Card
            className="rounded-full w-56 flex justify-center items-center bg-transparent shadow-zinc-500 shadow-md"
            style={{
              backgroundImage: `url(${reindeerbackg})`,
              backgroundSize: "cover",
            }}
          >
            <div className="relative h-56 flex justify-center">
              <img
                src={reno}
                alt="reindeer"
                className="object-cover w-56 rounded-full "
              />
            </div>
          </Card>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {reindeer.skills.map((skill) => (
              <div key={skill.skill} className="flex flex-col space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-sm font-medium">{skill.value}/10</span>
                </div>
                <Progress
                  value={skill.value * 10}
                  className="h-2 bg-zinc-400 "
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ReindeerModalInfo.propTypes = {
  reindeer: propTypes.object,
  isOpen: propTypes.bool,
  onClose: propTypes.func,
};
