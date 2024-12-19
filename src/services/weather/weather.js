
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL =  import.meta.env.VITE_BASE_URL;

export const fetchWeather = async () => {
  console.log("Fetching weather data...");
  const url = `${BASE_URL}?access_key=${API_KEY}&query=North+Pole&units=m&lang=en`;

    /* disable fetch with tanstack query */
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};