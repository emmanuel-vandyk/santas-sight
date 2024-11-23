import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MapRoute from "@/components/santaroutes/mapRoute";
import SearchAddress from "@/components/santaroutes/searchAddress";
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

const NORTH_POLE = { lat: 19.4326, lng: -99.1332, display_name: "Mexico City" };

export const RoutesPage = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: searchHistoryData, isLoading: isHistoryLoading, isError: isHistoryError } = useQuery({
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
          lon: data[0].lon,
        };
        if (location) {
          saveMutation.mutate(location);
          routeMutation.mutate({
            start: NORTH_POLE,
            end: {
              lat: parseFloat(location.lat),
              lng: parseFloat(location.lon),
              name: location.display_name
            }
          });
        }
      } else {
        toast.error("No location found.");
      }
    },
    onError: () => {
      toast.error("Error searching location.");
    },
  });

  const saveMutation = useMutation({
    mutationFn: saveLocation,
    onSuccess: () => {
      queryClient.invalidateQueries("searchHistory");
    },
    onError: () => {
      toast.error("Error saving location.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries("searchHistory");
    },
    onError: () => {
      toast.error("Error deleting location.");
    },
  });

  const routeMutation = useMutation({
    mutationFn: ({ start, end }) => getRoute(start, end),
    onSuccess: (data, variables) => {
      if (data && data.routes && data.routes[0]) {
        const coordinates = decodePolyline(data.routes[0].geometry);
        queryClient.setQueryData(["currentRoute"], {
          coordinates,
          start: variables.start,
          end: variables.end,
        });
        toast.success("Route found successfully!");
      } else {
        toast.error("No route found.");
      }
    },
    onError: () => {
      toast.error("Error getting route.");
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

  if (
    searchMutation.isError ||
    saveMutation.isError ||
    deleteMutation.isError ||
    routeMutation.isError ||
    isHistoryError
  ) {
    return <ErrorScreen />;
  }

  return (
    <div className="flex flex-col h-full md:h-screen md:overflow-y-hidden">
      <div className="px-4 w-full">
        <h1 className="text-4xl font-bold text-red-700 mb-10 text-center">
          <UnderlineTitle text="Santa's Routes" />
        </h1>
        <div className="flex flex-col space-y-4">
          <div className="w-full md:w-1/2 self-start">
            <SearchAddress onSearch={handleSearch} />
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="w-full lg:w-3/5">
              <MapRoute
                currentRoute={currentRoute?.end || NORTH_POLE}
                routeCoordinates={currentRoute?.coordinates}
                northPole={NORTH_POLE}
                searchHistory={searchHistory}
              />
            </div>
            <div className="w-full lg:w-2/5">
              <AddressHistory
                locations={searchHistory}
                onRestore={handleRestore}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

