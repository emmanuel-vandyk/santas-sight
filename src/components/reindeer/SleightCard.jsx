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
import { ChristmasSantaSleight } from "@/components/global/iconsChristmas";
import ReindeerComboBox from "@/components/reindeer/ReindeerComboBox";

export default function SleightCard({
  data: { organizationsData, reindeersData },
}) {
  return (
    <Card>
      <div className="h-full flex flex-col justify-evenly box-border">
        <CardHeader>
          <CardTitle>Organize your reindeer</CardTitle>
          <CardDescription>
            Organize the reindeer for Santa's sleigh. Click each button to
            assign a different reindeer to its position. When you click a
            button, a menu will appear with a list of available reindeer for
            easy selection
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-5 w-full gap-3 lg:flex-row">
          <ChristmasSantaSleight />
          <div className="flex flex-col w-1/2 gap-5">
            <h3 className="ml-5 text-center font-semibold">Reindeers 🦌</h3>
            <div className="grid grid-cols-3 gap-3 place-items-center">
              {/* {Array.from({ length: 6 }).map((_, index) => (
                  <ReindeerComboBox
                    key={index + 1}
                    reindeers={listReindeers}
                    value={
                      listReindeers.find(
                        (reindeer) => reindeer.position === index + 1
                      )?.id ?? 0
                    }
                  />
                ))} */}
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
      </div>
    </Card>
  );
}
