import { MapPin, Gift, Users, Cookie } from 'lucide-react';
import { StatCard } from "@/components/dashboard/statCard";
import { ReindeerChart } from "@/components/dashboard/reindeerChart";
import { ChildrenChart } from "@/components/dashboard/childrenChart";
import { ElvesChart } from "@/components/dashboard/elvesChart";
import { OrganizationChart } from "@/components/dashboard/organizationChart";
import { Countdown } from "@/components/dashboard/countDown";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import { ChartContainer } from "@/components/ui/chart";

// Mock data (replace with actual TanStack Query hooks in production)
const mockData = {
  searches: 1234,
  reindeerStats: { master: 5, junior: 8, trainee: 3 },
  organizations: 12,
  selectedOrganization: "North Pole HQ",
  children: 1000000,
  letters: 500000,
  elves: 10000,
  elvesAvailable: 9500,
  behaviorData: [
    { month: "Jan", good: 80, naughty: 20 },
    { month: "Feb", good: 82, naughty: 18 },
    { month: "Mar", good: 85, naughty: 15 },
    { month: "Apr", good: 87, naughty: 13 },
    { month: "May", good: 85, naughty: 15 },
    { month: "Jun", good: 88, naughty: 12 },
  ],
  calories: {
    totalCookies: 1431,
    consumedCookies: 200,
    totalCalories: 22000
  }
};

export const DashboardPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-8">
        <UnderlineTitle text="Santa's Dashboard" />
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="col-span-1 lg:col-start-2 lg:col-span-2 flex justify-center items-center">
          <Countdown />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<MapPin className="h-4 w-4" />}
          title="Searches"
          value={mockData.searches}
        />
        <StatCard
          icon={<Gift className="h-4 w-4" />}
          title="Letters"
          value={mockData.letters}
        />
        <StatCard
          icon={<Users className="h-4 w-4" />}
          title="Children"
          value={mockData.children}
        />
        <StatCard
          icon={<Cookie className="h-4 w-4" />}
          title="Calories Consumed"
          value={mockData.calories.totalCalories}
          subtitle={`${mockData.calories.consumedCookies} of ${mockData.calories.totalCookies} cookies`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <ChartContainer
          config={{
            master: { label: "Master", color: "#D32F2F" },
            junior: { label: "Junior", color: "#4d7c0f" },
            trainee: { label: "Trainee", color: "#ffc658" },
          }}
        >
          <ReindeerChart
            data={[
              {
                name: "Master",
                value: mockData.reindeerStats.master,
                color: "#D32F2F",
              },
              {
                name: "Junior",
                value: mockData.reindeerStats.junior,
                color: "#4d7c0f",
              },
              {
                name: "Trainee",
                value: mockData.reindeerStats.trainee,
                color: "#ffc658",
              },
            ]}
          />
        </ChartContainer>
        <ChartContainer
          config={{
            good: { label: "Good", color: "#D32F2F" },
            naughty: { label: "Naughty", color: "#4d7c0f" },
          }}
        >
          <ChildrenChart data={mockData.behaviorData} />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2">
          <ChartContainer
            config={{
              totalElves: { label: "Total Elves", color: "#D32F2F" },
              availableElves: { label: "Available Elves", color: "#4d7c0f" },
            }}
          >
            <ElvesChart
              data={[
                { name: "Total Elves", value: mockData.elves, color: "#D32F2F" },
                { name: "Available Elves", value: mockData.elvesAvailable, color: "#4d7c0f" },
              ]}
            />
          </ChartContainer>
        </div>
        <ChartContainer
          config={{
            selected: { label: "Selected", color: "#4d7c0f" },
            others: { label: "Others", color: "#CCCCCC" },
          }}
        >
          <OrganizationChart
            organizations={mockData.organizations}
            selectedOrganization={mockData.selectedOrganization}
          />
        </ChartContainer>
      </div>
    </div>
  );
}
