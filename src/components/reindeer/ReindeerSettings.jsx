import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReindeerSettings({
  reindeer,
  setSelectedReindeer,
  setIsModalOpen,
  updateReindeer,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setSelectedReindeer(reindeer);
            setIsModalOpen((state) => ({
              ...state,
              ReindeerModalInfo: true,
            }));
          }}
          className="cursor-pointer"
        >
          View Stats
        </DropdownMenuItem>
        {reindeer.available && (
          <>
            {reindeer.assignedToSanta ? (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    updateReindeer({
                      ...reindeer,
                      assignedToSanta: false,
                      position: 0,
                    })
                  }
                  className="cursor-pointer text-red-600"
                >
                  Unequip
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem className="cursor-pointer">
                  Assign to Santa
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuLabel>Select a status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!reindeer.available ? (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      updateReindeer({
                        ...reindeer,
                        available: true,
                      })
                    }
                    className="cursor-pointer text-green-600"
                  >
                    Active
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      updateReindeer({
                        ...reindeer,
                        assignedToSanta: false,
                        position: 0,
                        available: false,
                      })
                    }
                    className="cursor-pointer text-red-600"
                  >
                    Deactivate
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {!reindeer.available && (
          <>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-red-600 border-none border-transparent w-full px-2 py-2 justify-start hover:bg-none"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure you want to delete {reindeer.name}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete{" "}
                    {reindeer.name} and remove it from Santa's Workshop.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
