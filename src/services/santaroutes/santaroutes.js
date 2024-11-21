import axios from 'axios';

const API_URL = 'https://nominatim.openstreetmap.org';
const ROUTE_API_URL = 'https://router.project-osrm.org/route/v1/driving';

export const searchLocation = async ({ query }) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      format: 'json',
      q: query,
      'accept-language': 'en'
    },
  });
  return response.data;
};

export const saveLocation = async (location) => {
  const locations = JSON.parse(localStorage.getItem('santaRoutes') || '[]');
  locations.unshift(location);
  localStorage.setItem('santaRoutes', JSON.stringify(locations));
  return { message: 'Location saved successfully' };
};

export const getSearchHistory = async () => {
  return JSON.parse(localStorage.getItem('santaRoutes') || '[]');
};

export const deleteLocation = async (locationToDelete) => {
  const locations = JSON.parse(localStorage.getItem('santaRoutes') || '[]');
  const updatedLocations = locations.filter(
    location => location.name !== locationToDelete.name
  );
  localStorage.setItem('santaRoutes', JSON.stringify(updatedLocations));
  return { message: 'Location deleted successfully' };
};

export const getRoute = async (start, end) => {
  const response = await axios.get(`${ROUTE_API_URL}/${start.lng},${start.lat};${end.lng},${end.lat}`);
  return response.data;
};

