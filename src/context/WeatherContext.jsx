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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch current weather and forecast based on coordinates
  const fetchWeatherByCoords = async () => {
    try {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setError(null);
          setSelectedCity("");
          const weatherData = await getCurrentWeather(lat, lon);
          const forecastData = await getForecast(lat, lon);
          setCurrentWeather(weatherData);
          setForecast(forecastData);
        },
        (err) => {
          setError(err.message);
        },
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch weather based on city name
  const fetchWeatherByCity = async (city) => {
    try {
      setError(null);
      setLoading(true);
      const weatherData = await searchCityWeather(city);
      setCurrentWeather(weatherData);
      setSelectedCity(city);
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

  // fetch weather when city changes
  useEffect(() => {
    if (selectedCity) {
      fetchWeatherByCity(selectedCity);
    } else {
      fetchWeatherByCoords();
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
