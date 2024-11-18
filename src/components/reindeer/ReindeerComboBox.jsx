import * as React from "react";
import { Check, SquarePlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ReindeerComboBox(props) {
  const { reindeers, value: defaultValue } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    defaultValue > 0 ? defaultValue : ""
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between bg-transparent"
        >
          {value ? (
            reindeers.find((reindeer) => reindeer.id === value)?.name || (
              <SquarePlus className="text-amber-900" />
            )
          ) : (
            <SquarePlus className="text-amber-900" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search reindeer..." className="h-9" />
          <CommandList>
            <CommandEmpty>No reindeer found.</CommandEmpty>
            <CommandGroup>
              {reindeers.map((reindeer) => (
                <CommandItem
                  key={reindeer.id}
                  value={reindeer.name}
                  onSelect={() => {
                    setValue(reindeer.id === value ? "" : reindeer.id);
                    setOpen(false);
                  }}
                >
                  {reindeer.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === reindeer.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
