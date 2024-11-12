import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const items = [
  {
    id: "speed",
    label: "Speed",
  },
  {
    id: "stamina",
    label: "Stamina",
  },
  {
    id: "maneuverability",
    label: "Maneuverability",
  },
  {
    id: "nightVision",
    label: "Night Vision",
  },
  {
    id: "strength",
    label: "Strength",
  },
  {
    id: "climateAdaptability",
    label: "Climate Adaptability",
  },
  {
    id: "teamwork",
    label: "Teamwork",
  },
  {
    id: "navigationIntelligence",
    label: "Navigation Intelligence",
  },
];

export default function OrderCard({ data }) {
  const form = useForm({
    defaultValues: {
      items: [""],
    },
  });

  function generateAIAlignment() {
    // Here we have to generate a promt and send it
    console.log("Generating alignment with AI...");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Auto Organize</CardTitle>
        <CardDescription>
          Arrange the reindeer based on the selected preferences. The reindeer
          will be sorted according to the chosen options, making it easy to set
          up the team for Santa's sleigh.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(generateAIAlignment)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Organize
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
