import axios from 'axios';

const GPS_API_URL = import.meta.env.VITE_GPS_API_URL;
const ROUTE_API_URL = import.meta.env.VITE_ROUTE_API_URL;
const API_URL = import.meta.env.VITE_MOCK_API_URL;

export const searchLocation = async ({ query }) => {
  const response = await axios.get(`${GPS_API_URL}/search`, {
    params: {
      format: 'json',
      q: query,
      'accept-language': 'en'
    },
  });
  return response.data;
};

export const getRoute = async (start, end) => {
  const response = await axios.get(`${ROUTE_API_URL}/${start.lng},${start.lat};${end.lng},${end.lat}`);
  return response.data;
};


export const saveLocation = async (location) => {
  const response = await axios.post(`${API_URL}/api/address`,{
    display_name: location.display_name,
    lat: location.lat,
    lng: location.lon,
  });
  return response.data;
  }

  export const getSearchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/address`);
      return response.data;
    } catch (error) {
      console.error('Error fetching search history:', error);
      throw error;
    }
  };

export const deleteLocation = async (locationToDelete) => {
  const response = await axios.delete(`${API_URL}/api/address/${locationToDelete.id}`);
  return response.data;
};


