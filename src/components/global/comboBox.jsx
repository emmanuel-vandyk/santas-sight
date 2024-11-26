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

export default function ComboBox({ data, tittle = "", onChange = () => {} }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (selectedValue) => {
    setValue(selectedValue.id === value ? "" : selectedValue.id);
    onChange(selectedValue);
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
          <>{tittle}</>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search organization..." className="h-9" />
          <CommandList>
            <CommandEmpty>No {tittle.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {data.map((element) => (
                <CommandItem
                  key={element.id}
                  value={element.name}
                  onSelect={() => handleSelect(element)}
                >
                  {element.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === element.id ? "opacity-100" : "opacity-0"
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
