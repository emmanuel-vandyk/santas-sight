import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Snowflake } from "lucide-react";
import { fetchWeather } from "@/services/weather/weather";
import SantaChristmasSpinner from "@/components/global/spinner";
import fondoweather from "@/assets/nortpole.webp";
import { Button } from "@/components/ui/button";

export const WeatherCard = () => {
  const [isWeatherRequested, setIsWeatherRequested] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  // Configuración de useQuery con enabled: false para que no se ejecute automáticamente
  const {
    data,
    isLoading,
    isError,
    refetch, // Método para volver a ejecutar la consulta
  } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    enabled: false, // Desactiva la ejecución automática
    staleTime: Infinity,
    cacheTime: 0,
    retry: false,
  });

  const handleWeatherRequest = async () => {
    setIsWeatherRequested(true);
    const result = await refetch();
    if (result.isSuccess) {
      setIsVisible(true);
    }
  }

  return (
    <Card className="flex flex-col md:flex-row w-full md:w-auto justify-center md:justify-start items-center sm:p-4 text-white border-none relative mb-6 sm:mb-0 mt-4">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-xl flex flex-col w-full h-48 items-center md:items-start justify-center md:px-20"
        style={{
          backgroundImage: `url(${fondoweather})`,
          backgroundSize: "cover",
        }}
      >
        <Button
        className="bg-gradient-to-b from-green-800 to-emerald-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 rounded-md ring-0 text-white z-20 mt-16 flex md:justify-start"
        onClick={handleWeatherRequest}
        disabled={isWeatherRequested && isLoading} // Desactiva el botón mientras se carga
      >{isWeatherRequested && isLoading ? "Loading..." : "Show the weather"}
      </Button>
      </div>
      
      <section className="bg-zinc-950 w-64 md:w-72 h-36 mt-4 sm:mt-2 mb-10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 relative z-10 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-9">
        <section className="flex flex-col justify-center gap-2 p-2">
          <section className="gap-3 font-semibold flex text-white">
            <h2 className="whitespace-nowrap text-white">North pole weather</h2>
          </section>
          <section className="flex items-center gap-2 text-white">
          {isLoading && (
              <div className="flex items-center">
                <SantaChristmasSpinner />
              </div>
            )} 
            {isError && (
              <div className="text-red-500">Error loading weather data</div>
            )} 
            {isVisible && !isLoading && !isError && (
              <>
                <h3 className="text-white flex items-center gap-1">
                  <span>
                    <Snowflake />
                  </span>
                  <span>{data?.current.temperature || "--"}°C</span>
                </h3>
                <h2 className="text-white">
                  {data?.current.weather_descriptions?.[0] || "No description"}
                </h2>
              </>
            )}
          </section>
        </section>
      </section>        
    </Card>
  );
};
