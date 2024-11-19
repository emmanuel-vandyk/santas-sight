import * as React from "react";
import { Check, ScrollText } from "lucide-react";

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

export default function OrganizationComboBox({
  data,
  setVisualizerOrganization,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (selectedValue) => {
    setValue(selectedValue.id === value ? "" : selectedValue.id);
    setVisualizerOrganization((prevState) => ({
      ...prevState,
      previewOrganization: selectedValue,
    }));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between bg-transparent"
        >
          <ScrollText />
          {value ? (
            data.find((reindeer) => reindeer.id === value)?.name || (
              <>Organization</>
            )
          ) : (
            <>Organization</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search organization..." className="h-9" />
          <CommandList>
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup>
              {data.map((organization) => (
                <CommandItem
                  key={organization.id}
                  value={organization.name}
                  onSelect={() => handleSelect(organization)}
                >
                  {organization.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === organization.id ? "opacity-100" : "opacity-0"
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
