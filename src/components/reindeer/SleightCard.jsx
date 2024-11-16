import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import ChristmasSantaSleight from "@/assets/santasleigh.webp";
import ReindeerComboBox from "@/components/reindeer/ReindeerComboBox";

export default function SleightCard({ data }) {
  const listReindeers = data
    .filter((reindeer) => reindeer.available)
    .map((reindeer) => ({
      id: reindeer.id,
      name: reindeer.name,
      position: reindeer.position,
    }));

  const saveOrderReinnders = (event) => {
    event.preventDefault();
  };

  return (
    <Card className="h-1/2">
      <CardHeader>
        <CardTitle>Organize your reindeer</CardTitle>
        <CardDescription>
          Organize the reindeer for Santa's sleigh. Click each button to assign
          a different reindeer to its position. When you click a button, a menu
          will appear with a list of available reindeer for easy selection
        </CardDescription>
      </CardHeader>
      <form onSubmit={saveOrderReinnders}>
        <CardContent className="flex flex-col md:flex-row items-center justify-center p-5 w-full gap-3">
          <img src={ChristmasSantaSleight} className="object-cover w-56 md:w-56" />
          <div className="flex flex-col md:w-1/2 gap-5">
            <h3 className="ml-5 text-center font-semibold">
              Select Reindeers 🦌
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 place-items-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <ReindeerComboBox
                key={index + 1}
                reindeers={listReindeers}
                value={
                  listReindeers.find(
                    (reindeer) => reindeer.position === index + 1
                  )?.id ?? 0
                }
              />
            ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Check /> Mark all as read
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
