
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchWeather = async () => {
  const url = `${BASE_URL}?access_key=${API_KEY}&query=North+Pole&units=m&lang=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Weather data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};