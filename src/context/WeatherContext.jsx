import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentWeather,
  getForecast,
  searchCityWeather,
} from "../services/WeatherApi";

export const WeatherContext = createContext("");

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch current weather and forecast based on coordinates
  const fetchWeatherByCoords = async () => {
  setLoading(true);
  setError(null);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude: lat, longitude: lon } = position.coords;

        const weatherData = await getCurrentWeather(lat, lon);
        const forecastData = await getForecast(lat, lon);

        setCurrentWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },

    (err) => {
      if (err.code === 1) {
        setError("Location access denied");
      } else {
        setError(err.message);
      }

      setLoading(false);
    }
  );
};

// fetch weather based on city name
const fetchWeatherByCity = async (city) => {
  setLoading(true);
  setError(null);

  try {
    const weatherData = await searchCityWeather(city);

    setCurrentWeather(weatherData);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
// fetch weather for current location on app load
useEffect(() => {
  fetchWeatherByCoords();
}, []);

useEffect(() => {
  if (selectedCity) {
    fetchWeatherByCity(selectedCity);
  }
}, [selectedCity]);

const refreshWeather = async () => {
  try {
    setLoading(true);

    await fetchWeatherByCoords();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

return (
  <WeatherContext.Provider
    value={{
      currentWeather,
      setCurrentWeather,
      forecast,
      setForecast,
      selectedCity,
      setSelectedCity,
      loading,
      setLoading,
      error,
      setError,
      refreshWeather
    }}
  >
    {children}
  </WeatherContext.Provider>
);
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
