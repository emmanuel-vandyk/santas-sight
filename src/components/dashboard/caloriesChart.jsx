import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import PropTypes from "prop-types";

export const CaloriesChart = ({ data }) => {
  const chartData = [
    { name: "Consumed", value: data.totalCalories },
    {
      name: "Available",
      value: (data.totalCookies - data.consumedCookies) * 100,
    },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Calories overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-2">{data.totalCalories}</p>
        <p className="text-sm text-gray-500 mb-4">Total calories consumed</p>
        <Badge variant="secondary" className="mb-2">
          Cookies: {data.consumedCookies} / {data.totalCookies}
        </Badge>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "gray" : "#4d7c0f"}
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

CaloriesChart.propTypes = {
  data: PropTypes.shape({
    totalCalories: PropTypes.number.isRequired,
    consumedCookies: PropTypes.number.isRequired,
    totalCookies: PropTypes.number.isRequired,
  }).isRequired,
};
