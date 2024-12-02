import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import PropTypes from "prop-types";

export const ChildrenChart = ({ data }) => (
  <Card className="col-span-1">
    <CardHeader>
      <CardTitle>Children&apos;s Behavior</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="good" stroke="var(--color-good)" />
          <Line type="monotone" dataKey="naughty" stroke="var(--color-naughty)" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

ChildrenChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      good: PropTypes.number.isRequired,
      naughty: PropTypes.number.isRequired,
    })
  ).isRequired,
};

