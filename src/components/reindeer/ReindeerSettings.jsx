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
import { Settings, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReindeerSettings({
  data: reindeer,
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
          <Eye />
          View stats
        </DropdownMenuItem>
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
                  available: false,
                })
              }
              className="cursor-pointer text-red-600"
            >
              Deactivate
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
