import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export default function CustomCheckbox({ className, ...props }) {
  return (
    <Checkbox
      className={cn(
        "data-[state=checked]:bg-green-300 data-[state=checked]:text-black",
        className
      )}
      {...props}
    />
  );
}
