import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MapRoute from "@/components/santaroutes/mapRoute";
import AddressHistory from "@/components/santaroutes/addressHistory";
import {
  searchLocation,
  saveLocation,
  getSearchHistory,
  getRoute,
  deleteLocation,
} from "@/services/santaroutes/santaroutes";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import { useToast } from "@/hooks/useToast";
import {
  LoadingScreen,
  ErrorScreen,
} from "@/components/global/santaDataLoader";

const NORTH_POLE = { lat: "25.7617", lng: "-80.1918", display_name: "Miami, Florida" };

export const RoutesPage = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: searchHistoryData, isLoading: isHistoryLoading, isError: isHistoryError, error: historyError } = useQuery({
    queryKey: ["searchHistory"],
    queryFn: getSearchHistory,
  });
  const searchHistory = searchHistoryData?.data || [];

  const searchMutation = useMutation({
    mutationFn: searchLocation,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const location = {
          display_name: data[0].display_name,
          lat: data[0].lat,
          lng: data[0].lng,
        };
        if (location) {
          routeMutation.mutate({
            start: NORTH_POLE,
            end: {
              lat: location.lat,
              lng: location.lng,
              name: location.display_name
            }
          });
        }
      } else {
        toast.error("No location found. Please try a more specific search.");
      }
    },
    onError: (error) => {
      console.error('Search error:', error);
      toast.error(error.message || "Error searching location. Please try again.");
    },
  });

  const saveMutation = useMutation({
    mutationFn: saveLocation,
    onSuccess: () => {
      queryClient.invalidateQueries("searchHistory");
      toast.success("Location saved successfully!");
    },
    onError: (error) => {
      console.error('Save error:', error);
      toast.error(error.message || "Error saving location.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries("searchHistory");
      toast.success("Location deleted successfully!");
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast.error(error.message || "Error deleting location.");
    },
  });

  const routeMutation = useMutation({
    mutationFn: ({ start, end }) => getRoute(start, end),
    onSuccess: (data, variables) => {
      if (data && data.routes && data.routes[0]) {
        const coordinates = decodePolyline(data.routes[0].geometry).map(coord => [coord[0].toString(), coord[1].toString()]);
        queryClient.setQueryData(["currentRoute"], {
          coordinates,
          start: variables.start,
          end: variables.end,
        });
        // Only save the location if the route was successfully calculated
        saveMutation.mutate({
          display_name: variables.end.name,
          lat: variables.end.lat,
          lng: variables.end.lng,
        });
        toast.success("Route found successfully!");
      } else {
        toast.error("No route found. The destination might be unreachable.");
      }
    },
    onError: (error) => {
      console.error("Route calculation error:", error);
      toast.error(error.message || "Error calculating route. The destination might be unreachable or there's no valid path.");
    },
  });

  const handleSearch = (query) => {
    searchMutation.mutate({ query });
  };

  const handleRestore = (location) => {
    const parsedLocation = {
      ...location,
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng),
    };
    if (parsedLocation) {
      routeMutation.mutate({
        start: NORTH_POLE,
        end: parsedLocation,
      });
    }
  };

  const handleDelete = (location) => {
    deleteMutation.mutate(location);
    resetCurrentRoute();
  };

  const resetCurrentRoute = () => {
    queryClient.setQueryData(["currentRoute"], null);
  };

  const handleDeleteAll = () => {
    searchHistory.forEach((location) => deleteMutation.mutate(location));
    resetCurrentRoute();
    toast.success("All locations deleted successfully");
  };

  function decodePolyline(encoded) {
    const poly = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      poly.push([lat / 1e5, lng / 1e5]);
    }
    return poly;
  }

  const currentRoute = queryClient.getQueryData(["currentRoute"]);

  if (
    searchMutation.isLoading ||
    saveMutation.isLoading ||
    deleteMutation.isLoading ||
    routeMutation.isLoading ||
    isHistoryLoading
  ) {
    return <LoadingScreen />;
  }

  if (isHistoryError) {
    console.error('History error:', historyError);
    return <ErrorScreen message={historyError.message || "Error loading search history"} />;
  }

  return (
    <div className="flex flex-col h-full md:h-screen md:overflow-y-hidden">
      <div className="px-4 w-full">
        <h1 className="text-4xl font-bold text-red-700 mb-10 text-center">
          <UnderlineTitle text="Santa's Routes" />
        </h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="w-full lg:w-3/5">
              <MapRoute
                currentRoute={currentRoute?.end || NORTH_POLE}
                routeCoordinates={currentRoute?.coordinates}
                northPole={NORTH_POLE}
                searchHistory={searchHistory}
                onSearch={handleSearch}
              />
            </div>
            <div className="w-full lg:w-2/5">
              <AddressHistory
                locations={searchHistory}
                onRestore={handleRestore}
                onDelete={handleDelete}
                onDeleteAll={handleDeleteAll}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

