import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SelectAll({
  className = "",
  items = [],
  selectedItems = [],
  onSelectionChange = () => {},
  label = "Select all",
}) {
  // Determine if all items are selected
  const isAllSelected =
    selectedItems.length === items.length && items.length > 0;

  // Handle the change in selection state
  const handleSelectionChange = (checked) => {
    // If checked, select all item IDs; otherwise, clear the selection
    onSelectionChange(checked ? items.map((item) => item.id) : []);
  };

  return (
    <Card className={`flex items-center p-2 gap-3 rounded-sm ${className}`}>
      <Checkbox
        checked={isAllSelected}
        onCheckedChange={handleSelectionChange}
      />
      <Label>{label}</Label>
    </Card>
  );
}
