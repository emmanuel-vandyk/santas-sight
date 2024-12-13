import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CustomCheckbox from "@/components/global/customCheckbox";

export default function SelectAll({
  className = "",
  items = [],
  selectedItems = [],
  onSelectionChange = () => {},
  label = "Select all",
}) {
  // Determine if all items are selected
  const isAllSelected =
    items.length > 0 &&
    items.every((item) => selectedItems.includes(item.id)) &&
    selectedItems.length <= items.length;

  // Handle the change in selection state
  const handleSelectionChange = (checked) => {
    // If checked, select all item IDs; otherwise, clear the selection
    onSelectionChange(checked ? items.map((item) => item.id) : []);
  };

  return (
    <Card className={`flex items-center p-2 gap-3 rounded-sm ${className}`}>
      <CustomCheckbox
        checked={isAllSelected}
        onCheckedChange={handleSelectionChange}
      />
      <Label>{label}</Label>
    </Card>
  );
}
