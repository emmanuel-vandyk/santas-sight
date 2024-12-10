import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { CookiesContext } from "@/pages/caloriesPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartColors = ["#4299E1", "#48BB78", "#ED8936", "#ECC94B", "#ED64A6"];

export function CaloriesChart() {
  const { caloriesData, cookiesData } = React.useContext(CookiesContext);

  const chartData = cookiesData.map((cookie, index) => ({
    name: cookie.name.split(" ")[0],
    consumed: cookie.consumed,
    fill: chartColors[index % chartColors.length],
  }));

  const chartConfig = Object.fromEntries(
    chartData.map((cookie, index) => [
      cookie.name,
      {
        label: (
          <p className="flex flex-col">
            <span>{cookie.name}</span>
            <span>cookie</span>
          </p>
        ),
        color: chartColors[index % chartColors.length],
      },
    ])
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cookies consumed</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="consumed"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {caloriesData.consumedCookies.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Cookies
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <CardDescription>{`Santa has currently consumed ${caloriesData.consumedCookies} cookies,
          with ${caloriesData.availableCookies} cookies available for consumption at this time.`}</CardDescription>
      </CardFooter>
    </Card>
  );
}
