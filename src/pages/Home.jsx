import React, { useEffect, useState } from "react";
import {
  RiUserLine,
  RiResetRightFill,
  RiMapPin5Line,
  RiArrowDownLongLine,
  RiArrowUpLongLine,
  RiArrowRightUpLongLine,
  RiArrowRightUpLine,
} from "@remixicon/react";
import Nav from "../components/Nav";

import { useWeather } from "../context/WeatherContext.jsx";
import { useUser } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard.jsx";
import ErrorPopup from "../components/ErrorPopup.jsx";
import saveLocation from "../services/saveLocation.js";
import getSavedLocations from "../services/getSavedLocations.js";
import { searchCityWeather } from "../services/WeatherApi.js";
import InstallPWA from '../components/InstallPWA';

function Home() {
  const today = new Date().toDateString();
  const {
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
  } = useWeather();

  const { profile, setProfile, } = useUser();


  const [savedLocations , setSavedLocations] = useState([]);
  useEffect(()=>{
    getSavedLocations(setSavedLocations);
  },[]);
  const SavedCityName = savedLocations.map((item)=> (item.city))

  const [savedWeather, setSavedWeather] = useState([]);

  useEffect(()=>{
    const fetchSavedCityWeather = async () =>{
      const weatherData = await Promise.all(
        SavedCityName.map(async (city)=>{
          const response = searchCityWeather(city);
          return response;
        })
      );
      setSavedWeather(weatherData);
    }; 

    if(SavedCityName.length > 0){
      fetchSavedCityWeather();
    }


  },[savedLocations])

  
  if (error) return <ErrorPopup />

  if (loading || !currentWeather || !forecast) {
    return (
      <div className="min-h-screen relative bg-[#e9f1ff] p-6 flex flex-col gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }


  return (
    <div>
      <InstallPWA />
      <div className="min-h-screen bg-[#e9f1ff] pb-28 ">
        <div className="flex flex-col gap-10 px-6 py-8">
          {/* TOP BAR */}
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to={"/app/profile"} className="relative w-[60px] h-[60px]">

                <div className="w-full h-full bg-amber-200 rounded-full overflow-hidden">
                  <img
                    src={profile?.avatar_url || "https://ui-avatars.com/api/?name=User"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div>
                <h2 className="text-sm text-gray-500 sm:text-2xl">Hello 👋</h2>

                <h2 className="text-lg sm:text-3xl font-bold text-gray-800">{profile?.full_name || "User"} 😊</h2>
              </div>
            </div>

            <div onClick={refreshWeather} className={`${loading && "animate-spin"} p-3  bg-white rounded-2xl shadow-sm text-xl cursor-pointer`}>
              <RiResetRightFill />
            </div>
          </div>

          {/* LOCATION */}
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 font-semibold text-gray-800">
                <RiMapPin5Line size={20} />
                {currentWeather?.name}, {currentWeather?.sys?.country}
              </div>

              <div className="text-sm sm:text-xl text-gray-500">{today}</div>
            </div>

            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl shadow-sm">
              <div className="flex items-center text-red-500 font-medium sm:text-xl">
                <RiArrowUpLongLine />
                {Math.floor(currentWeather?.main?.temp_max)}°
              </div>

              <div className="flex items-center text-blue-500 font-medium sm:text-xl">
                <RiArrowDownLongLine />
                {Math.floor(currentWeather?.main?.temp_min)}°
              </div>
            </div>
          </div>

          {/* WEATHER CARD */}
          <div className="overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 text-white w-full rounded-[35px] p-6 flex flex-col gap-6 shadow-xl sm:w-[33%]">
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div className="w-[110px]">
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`}
                  alt="weather"
                  className="w-full object-contain"
                />
                <p></p>
              </div>

              <Link to={"/app/forecast"} className="bg-white/20 backdrop-blur-md p-3 rounded-2xl text-xl ">
                <RiArrowRightUpLongLine />
              </Link>
            </div>

            {/* TEMP */}
            <div>
              <h1 className="text-7xl font-bold tracking-tight">
                {Math.floor(currentWeather?.main.temp)}°C
              </h1>

              <p className="text-lg text-blue-100">
                {currentWeather?.weather[0].main} -{" "}
                {currentWeather?.weather[0].description}
              </p>
            </div>

            {/* BOTTOM */}
            <div className="flex flex-col gap-1">
              <div className="text-sm text-blue-100">
                Feels like {Math.floor(currentWeather?.main.temp)}°C
              </div>

              <div className="flex items-center gap-2 text-sm text-blue-200">
                <RiArrowRightUpLine size={18} />
                Humidity is {currentWeather?.main?.humidity} today
              </div>
            </div>

            {/* GLASS EFFECT */}
            {/* <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div> */}
          </div>

          <div className="text-2xl font-semibold ml-5">Saved Location</div>
          <div className="flex sm:flex-row flex-col gap-10 justify-between sm:justify-start sm:flex-wrap w-full">
            {savedWeather.map((weather) => (
            <div key={weather.id}>
              <div className=" overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-[35px] p-6 flex flex-col gap-6 shadow-xl sm:w-[350px]">
                {/* TOP */}
                
                <div className="flex justify-between items-start">
                  <div className="w-[110px]">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                      alt="weather"
                      className="w-full object-contain"
                    />
                  </div>

                  <Link to={`/app/search/${encodeURIComponent(weather?.name)}`}  className="bg-white/20 p-3 rounded-2xl text-xl">
                    <RiArrowRightUpLongLine />
                  </Link>
                </div>

                {/* TEMP */}
                <div>
                  <h1 className="text-7xl font-bold tracking-tight">
                    {Math.floor(weather?.main.temp)}°C
                  </h1>

                  <p className="text-lg text-blue-100">
                    {weather?.weather[0].main} -{" "}
                    {weather?.weather[0].description}
                  </p>
                </div>

                {/* BOTTOM */}
                <div className="flex flex-row justify-between gap-2 items-center">
                  <div className="flex flex-col gap-2">

                  <div className="text-sm text-blue-100">
                    Feels like {Math.floor(currentWeather?.main.temp)}°C
                  </div>

                  <div className="flex items-center gap-2 text-sm text-blue-200">
                    <RiArrowRightUpLine size={18} />
                    Humidity is {currentWeather?.main?.humidity} today
                  </div>
                  </div>
                <div className="bg-[#4883F7] w-fit px-2 py-1 rounded-2xl flex justify-center items-end gap-1"><div className="text-sm font-semibold">City : </div> <div className="text-sm">{weather?.name}</div></div>  
                </div>
                
                {/* GLASS EFFECT */}
                {/* <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div> */}
              </div>
            </div>
          ))}
          </div>

    

        </div>
      </div>
    </div>
  );
}

export default Home;
