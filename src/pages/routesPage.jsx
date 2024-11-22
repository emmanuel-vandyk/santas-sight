import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MapRoute from '@/components/santaroutes/mapRoute';
import SearchAddress from '@/components/santaroutes/searchAddress';
import AddressHistory from '@/components/santaroutes/addressHistory';
import { searchLocation, saveLocation, getSearchHistory, getRoute, deleteLocation } from '@/services/santaroutes/santaroutes';
import { UnderlineTitle } from '@/components/global/underlineTitle';

// North Pole, Yukon, Canada (approximate coordinates)
const NORTH_POLE = { lat: 68.5788, lng: -135.9375, name: "North Pole, Yukon, Canada" };

export const RoutesPage = () => {
  const queryClient = useQueryClient();

  const { data: searchHistory } = useQuery({
    queryKey: ['searchHistory'],
    queryFn: getSearchHistory
  });

  const searchMutation = useMutation({
    mutationFn: searchLocation,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const location = {
          name: data[0].display_name,
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
        if (!isNaN(location.lat) && !isNaN(location.lng)) {
          saveMutation.mutate(location);
          routeMutation.mutate({ start: NORTH_POLE, end: location });
        }
      }
    }
  });

  const saveMutation = useMutation({
    mutationFn: saveLocation,
    onSuccess: () => {
      queryClient.invalidateQueries('searchHistory');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries('searchHistory');
    }
  });

  const routeMutation = useMutation({
    mutationFn: ({ start, end }) => getRoute(start, end),
    onSuccess: (data, variables) => {
      if (data && data.routes && data.routes[0]) {
        const coordinates = decodePolyline(data.routes[0].geometry);
        queryClient.setQueryData(['currentRoute'], { 
          coordinates,
          start: variables.start,
          end: variables.end
        });
      }
    }
  });

  const handleSearch = (query) => {
    searchMutation.mutate({ query });
  };

  const handleRestore = (location) => {
    const parsedLocation = {
      ...location,
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng)
    };
    if (!isNaN(parsedLocation.lat) && !isNaN(parsedLocation.lng)) {
      routeMutation.mutate({ start: NORTH_POLE, end: parsedLocation });
    }
  };

  const handleDelete = (location) => {
    deleteMutation.mutate(location);
  };

  function decodePolyline(encoded) {
    const poly = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;
      poly.push([lat / 1e5, lng / 1e5]);
    }
    return poly;
  }

  const currentRoute = queryClient.getQueryData(['currentRoute']);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h1 className="text-4xl font-bold text-red-700 mb-10 text-center">
          <UnderlineTitle text="Santa&apos;s Routes" />
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <MapRoute 
                currentRoute={currentRoute?.end} 
                routeCoordinates={currentRoute?.coordinates}
                northPole={NORTH_POLE}
              />
            </div>
            <div className="space-y-4">
              <SearchAddress onSearch={handleSearch} />
              <AddressHistory 
                locations={searchHistory || []} 
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

