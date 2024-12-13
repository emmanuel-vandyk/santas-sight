import { MapPin, Users, MailOpen, Cookie } from "lucide-react";
import { StatCard } from "@/components/dashboard/statCard";
import { ReindeerChart } from "@/components/dashboard/reindeerChart";
import { ElvesChart } from "@/components/dashboard/elvesChart";
import { OrganizationChart } from "@/components/dashboard/organizationChart";
import { CaloriesChart } from "@/components/dashboard/caloriesChart";
import { Countdown } from "@/components/dashboard/countDown";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import { ChartContainer } from "@/components/ui/chart";
import { useChildren } from "@/services/children/childrenapi";
import {
  useCookiesForSanta,
  useSantaCalories,
} from "@/services/calories/cookiesapi";
import { useElves } from "@/services/elvescrud/elvesapi";
import { useReindeersOrganizations } from "@/services/reindeer/organizationapi";
import { useReindeers } from "@/services/reindeer/reindeerapi";
import { getSearchHistory } from "@/services/santaroutes/santaroutes";
import { fetchLetters } from "@/services/navcards/navcards";
import { PieChart } from "@/components/dashboard/PieChart";
import { useQuery } from "@tanstack/react-query";

export const DashboardPage = () => {
  const { data: childrenData } = useChildren();
  const { data: cookiesData } = useCookiesForSanta();
  const { data: caloriesData } = useSantaCalories();
  const { data: elvesData } = useElves();
  const { data: organizationsData } = useReindeersOrganizations();
  const { data: reindeersData } = useReindeers();
  const { data: searchHistoryData } = useQuery({
    queryKey: ["searchHistory"],
    queryFn: getSearchHistory,
  });
  const { data: lettersData } = useQuery({
    queryKey: ["letters"],
    queryFn: fetchLetters,
  });

  // Calculate statistics
  const totalChildren = childrenData?.length || 0;
  const letters = Array.isArray(lettersData?.data) ? lettersData.data : [];
  const totalLetters = letters.length;
  const readLetters = letters.filter((letter) => letter.isRead).length;
  const unreadLetters = totalLetters - readLetters;
  const totalSearches = searchHistoryData?.data?.length || 0;
  const totalElves = elvesData?.data?.length || 0;
  const availableElves =
    elvesData?.data?.filter((elf) => !elf.isDeleted).length || 0;
  const unavailableElves = totalElves - availableElves;

  const reindeerStats = {
    master: reindeersData?.filter((r) => r.type === "master").length || 0,
    junior: reindeersData?.filter((r) => r.type === "junior").length || 0,
    trainee: reindeersData?.filter((r) => r.type === "trainee").length || 0,
  };

  const calories = {
    totalCookies: cookiesData?.length || 0,
    consumedCookies: caloriesData?.consumedCookies || 0,
    totalCalories: caloriesData?.totalCalories || 0,
  };

  // Prepare behavior data
  const behaviorSummary = childrenData?.reduce((acc, child) => {
    acc[child.behavior] = (acc[child.behavior] || 0) + 1;
    return acc;
  }, {});

  const behaviorColors = {
    Kind: "#4299E1",
    Respectful: "#48BB78",
    Lazy: "#ED8936",
    Helpful: "#ECC94B",
    Curious: "#ED64A6",
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-[100vw] overflow-x-hidden">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-8">
        <UnderlineTitle text="Santa's Dashboard" />
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="col-span-1 lg:col-start-2 lg:col-span-2 flex justify-center items-center">
          <Countdown />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<MapPin className="h-4 w-4" />}
          title="Searches"
          value={totalSearches}
          subtitle={`Total address searches`}
        />
        <StatCard
          icon={<MailOpen className="h-4 w-4" />}
          title="Letters"
          value={totalLetters}
          subtitle={`${readLetters} read, ${unreadLetters} unread`}
        />
        <StatCard
          icon={<Users className="h-4 w-4" />}
          title="Children"
          value={totalChildren}
        />
        <StatCard
          icon={<Cookie className="h-4 w-4" />}
          title="Calories consumed"
          value={calories.totalCalories}
          subtitle={`${calories.consumedCookies} of ${calories.totalCookies} cookies`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer
          config={{
            master: { label: "Master", color: "#D32F2F" },
            junior: { label: "Junior", color: "#4d7c0f" },
            trainee: { label: "Trainee", color: "#ffc658" },
          }}
          className="min-h-[300px] w-full"
        >
          <ReindeerChart
            data={[
              { name: "Master", value: reindeerStats.master, color: "#D32F2F" },
              { name: "Junior", value: reindeerStats.junior, color: "#4d7c0f" },
              {
                name: "Trainee",
                value: reindeerStats.trainee,
                color: "#ffc658",
              },
            ]}
          />
        </ChartContainer>

        <ChartContainer
          config={{
            consumed: { label: "consumed", color: "#ED8936" },
            available: { label: "available", color: "#48BB78" },
          }}
          className="min-h-[300px] w-full mt-20 md:mt-0"
        >
          <CaloriesChart data={calories} />
        </ChartContainer>

        <ChartContainer
          config={{
            Kind: { label: "Kind", color: behaviorColors.Kind },
            Respectful: {
              label: "Respectful",
              color: behaviorColors.Respectful,
            },
            Lazy: { label: "Lazy", color: behaviorColors.Lazy },
            Helpful: { label: "Helpful", color: behaviorColors.Helpful },
            Curious: { label: "Curious", color: behaviorColors.Curious },
          }}
          className="min-h-[300px] w-full mt-20 md:mt-0"
        >
          <PieChart
            data={
              behaviorSummary
                ? Object.entries(behaviorSummary).map(([behavior, count]) => ({
                    name: behavior,
                    value: count,
                    color: behaviorColors[behavior],
                  }))
                : []
            }
          />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-28">
        <ChartContainer
          config={{
            availableElves: { label: "Available elves", color: "#4d7c0f" },
            unavailableElves: { label: "Unavailable elves", color: "#D32F2F" },
          }}
          className="min-h-[300px] w-full"
        >
          <ElvesChart
            data={[
              {
                name: "Available elves",
                value: availableElves,
                color: "#4d7c0f",
              },
              {
                name: "Unavailable elves",
                value: unavailableElves,
                color: "#D32F2F",
              },
            ]}
          />
        </ChartContainer>

        <ChartContainer
          config={{
            selected: { label: "Selected", color: "#4d7c0f" },
            others: { label: "Others", color: "#CCCCCC" },
          }}
          className="min-h-[300px] w-full mt-20 md:mt-0"
        >
          <OrganizationChart
            organizations={organizationsData?.length || 0}
            selectedOrganization={organizationsData?.[0]?.name || "N/A"}
          />
        </ChartContainer>
      </div>
    </div>
  );
};
