import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MailOpenIcon } from 'lucide-react';
import propTypes from "prop-types";

export const LetterModal = ({ isOpen, onClose, letter }) => {
  if (!letter) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-r from-red-100 to-green-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-700 flex items-center">
            <MailOpenIcon className="mr-2 text-red-700" />
            Letter from {letter.children.name}
          </DialogTitle>
        </DialogHeader>
        <div className="relative mt-4 p-6 bg-transparent shadow-md shadow-zinc-800 rounded-lg ">
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-red-700 border-r-red-700" />
          <blockquote className="text-md whitespace-pre-wrap italic font-semibold  text-zinc-800 mt-4">
            &quot;{letter.content}&quot;
          </blockquote>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Date: {new Date(letter.create_at).toLocaleDateString()}
        </p>
        <DialogFooter>
          <Button 
            className="bg-green-700 text-white hover:bg-green-600"
            onClick={onClose}
          >
            Close Letter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

LetterModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  letter: propTypes.object,
};

