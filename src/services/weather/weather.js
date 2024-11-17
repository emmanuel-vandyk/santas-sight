import axios from 'axios';

const API_KEY = 'e669c7232cmshf5ff741eba5a3c1p15cf06jsn878944ea49fa';
const BASE_URL = 'https://weatherbit-v1-mashape.p.rapidapi.com/current';

export const fetchWeather = async () => {
  const options = {
    method: 'GET',
    url: BASE_URL,
    params: {
      lon: '140',
      lat: '89',
      units: 'imperial',
      lang: 'en'
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log('Weather data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};
