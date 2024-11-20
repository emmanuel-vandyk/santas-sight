import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Snowflake } from "lucide-react";
import { fetchWeather } from "@/services/weather/weather";
import SantaChristmasSpinner from "@/components/global/spinner";

export const WeatherCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: Infinity, 
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center h-full">
        <SantaChristmasSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading weather data</div>;
  }

  return (
    <Card className="flex flex-col gap-5 w-full md:w-auto p-4 text-white h-32 border-none relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/src/assets/nortpole.avif)",
          backgroundSize: "cover",
        }}
      ></div>
      <section className="bg-zinc-950 h-full w-64 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 relative z-10 shadow-2xl flex items-center">
        <section className="flex flex-col justify-center gap-2 p-2">
          <section className="gap-3 font-semibold flex text-white">
            <h2 className="whitespace-nowrap text-white">North pole weather</h2>
          </section>
          <section className="flex items-center gap-2 text-white">
            <h3 className="text-white flex items-center gap-1">
              <span><Snowflake /></span>
              {data?.current.temperature || "No description available"}
              <span>°C</span>
            </h3>
            <h2 className="text-white">{data?.current.weather_descriptions || "No description available"}</h2>
          </section>
        </section>
      </section>
    </Card>
  );
};
