import React from "react";
import {
  RiArrowLeftWideLine,
  RiWindyLine,
  RiTempHotLine,
  RiContrastDrop2Line,
  RiSunLine,
  RiArrowUpLongLine,
  RiArrowDownLongLine,
  RiCompass2Line,
  RiEyeLine,
  RiArrowRightUpLine,
  RiResetRightFill
} from "@remixicon/react";


import {
  formatDay,
  formatTime,
  getWindDirection,
} from "../utils/formatWeather.js";

import { useWeather } from "../context/WeatherContext.jsx";
import SunPath from "../components/SunPath.jsx";
import { Link } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard.jsx";
import ErrorPopup from "../components/ErrorPopup.jsx";

function Forecast() {
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

  const dailyForecast = forecast?.list?.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  
  if (error) return <ErrorPopup />

  if (loading || !currentWeather || !forecast) {
    return (
      <div className="min-h-screen bg-[#e9f1ff] p-6 flex flex-col gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  
  return (
    <div>
      <div className="min-h-screen w-full bg-[#e9f1ff] pb-28">
        <div className="flex flex-col gap-8 px-6 py-8">
          {/* top bar */}
          <div className="w-full flex justify-between items-center">
            <Link to={"/app"} className="p-3 bg-white rounded-2xl shadow-sm text-black text-xl">
              <RiArrowLeftWideLine />
            </Link>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                {currentWeather?.name}
              </h2>
              <h2 className="text-sm text-gray-500">
                {formatDay(currentWeather?.dt)}
              </h2>
            </div>

            <div onClick={refreshWeather} className="p-3 bg-white rounded-2xl shadow-sm cursor-pointer text-xl">
              <RiResetRightFill />
            </div>
          </div>


          <div className="flex flex-col sm:flex-row gap-8">
            {/* Current Weather Card */}
            <div className="overflow-hidden bg-gradient-to-br from- bg-blue-100 to-blue-300 text-black w-full rounded-[35px] p-6 sm:p-10 flex flex-col gap-12 shadow-xl sm:w-[33%]">
              <div className="flex justify-between items-start">
                <div className="font-semibold">
                  {formatDay(currentWeather?.dt)}
                </div>
                <div>{formatTime(currentWeather?.dt)}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col justify-center items-start">
                  <div className="text-7xl font-bold tracking-tight">
                    {Math.floor(currentWeather?.main?.temp)}°C
                  </div>
                  <div className="text-lg text-gray-600">
                    Real feel {Math.floor(currentWeather?.main?.temp)}°C
                  </div>
                </div>

                <div className="w-[100px] flex flex-col justify-center items-center bg-blue-100 rounded-2xl p-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`}
                    alt="weather"
                    className="w-full object-contain"
                  />
                  <p>{currentWeather?.weather[0]?.main}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col w-[33%] text-sm items-start justify-between gap-2 p-3 rounded-2xl bg-blue-100">
                  <div className="text-gray-600">
                    <RiWindyLine size={18} />
                  </div>
                  <div>Wind</div>
                  <div className="text-gray-600">
                    {Math.floor(currentWeather?.wind?.speed)}km/h
                  </div>
                </div>
                <div className="flex flex-col w-[33%] text-sm items-start justify-between gap-2 p-3 rounded-2xl bg-blue-100">
                  <div className="text-gray-600">
                    <RiTempHotLine size={18} />
                  </div>
                  <div>Temperature</div>
                  <div className="text-gray-600">
                    {Math.floor(currentWeather?.main?.temp)}°C
                  </div>
                </div>
                <div className="flex flex-col w-[33%] text-sm items-start justify-between gap-2 p-3 rounded-2xl bg-blue-100">
                  <div className="text-gray-600">
                    <RiContrastDrop2Line size={18} />
                  </div>
                  <div>Humidity</div>
                  <div className="text-gray-600">
                    {currentWeather?.main?.humidity}%
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden bg-white text-black w-full rounded-[35px] p-6 sm:p-10 flex flex-col gap-5 sm:gap-10 shadow-xl sm:w-[66%]">
              {/* Hourly Forecast */}
              <div className="font-medium sm:text-2xl">Hourly Forecast</div>
              <div className="flex justify-between items-center">
                {forecast?.list?.slice(0, 4).map((item) => {
                  return (
                    <div
                      key={item.dt}
                      className="flex flex-col items-center text-sm gap-2 w-full"
                    >
                      <div className="bg-blue-200 p-3 rounded-full w-[60px]">
                        <img
                          className=""
                          src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
                          alt=""
                        />
                      </div>
                      <div className="text-gray-600 text-sm">
                        {formatTime(item?.dt)}
                      </div>
                      <div className="font-semibold">
                        {Math.floor(item?.main?.temp)}°
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>


          <div className="flex flex-col sm:flex-row gap-8 ">
            {/* others details */}
            <div className="absolue overflow-hidden bg-white text-black w-full rounded-[35px] p-6 sm:p-10 flex flex-col gap-5 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-gray-500">
                    <RiArrowRightUpLine />
                  </div>
                  <div className="font-medium">
                    {currentWeather?.wind?.gust} m/s
                  </div>
                  <div className="text-sm text-gray-500">Gust</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-gray-500">
                    <RiCompass2Line size={26} />
                  </div>
                  <div className="font-medium">
                    {currentWeather?.main?.pressure}
                  </div>
                  <div className="text-sm text-gray-500">Presure</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-gray-500">
                    <RiContrastDrop2Line size={26} />
                  </div>
                  <div className="font-medium">
                    {currentWeather?.main?.sea_level} m
                  </div>
                  <div className="text-sm text-gray-500">Sea level</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-gray-500">
                    <RiWindyLine size={26} />
                  </div>
                  <div className="font-medium">
                    {getWindDirection(currentWeather?.wind?.deg)}
                  </div>
                  <div className="text-sm text-gray-500">Direction</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-gray-500">
                    <RiWindyLine size={26} />
                  </div>
                  <div className="font-medium">
                    {Math.floor(currentWeather?.wind?.speed)} Km/h
                  </div>
                  <div className="text-sm text-gray-500">Wind</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-gray-500">
                    <RiEyeLine size={26} />
                  </div>
                  <div className="font-medium">
                    {currentWeather?.visibility} m
                  </div>
                  <div className="text-sm text-gray-500">Visibility</div>
                </div>
              </div>
            </div>

            {/* Sunrise Sunset */}
            <div className="absolue overflow-hidden bg-white text-black w-full rounded-[35px] p-6 sm:p-10 flex flex-col gap-5 shadow-xl">
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col items-center justify-center w-[25%]">
                  <div className="font-medium">
                    {formatTime(currentWeather?.sys?.sunrise)}
                  </div>
                  <div className="text-gray-500 text-sm">Sunrise</div>
                </div>
                <div className="w-[50%]"><SunPath /></div>
                <div className="flex flex-col items-center justify-center w-[25%]">
                  <div className="font-medium">
                    {formatTime(currentWeather?.sys?.sunset)}
                  </div>
                  <div className="text-gray-500 text-sm">Sunset</div>
                </div>
              </div>
            </div>


          </div>

          {/* dailyForecast */}

          <div className="overflow-hidden bg-white text-black w-full rounded-[35px] p-6 sm:p-10 flex flex-col gap-5 shadow-xl">

            <div className="font-medium sm:text-2xl">Daily Forecast</div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {dailyForecast?.map((item, index) => (
                <div
                  key={item.dt}
                  className="font-medium"
                >
                  <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-2xl w-full">

                    {/* LEFT */}
                    <div className="flex items-center gap-1">

                      <div className="bg-blue-200 p-2 rounded-full w-[50px]">
                        <img
                          src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
                          alt=""
                        />
                      </div>

                      <div className="flex flex-col items-start">
                        <div className="font-semibold">
                          {index === 0 ? "Tomorrow" : formatDay(item.dt)}
                        </div>

                        <div className="text-sm">
                          {item?.weather[0]?.main}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-1 bg-white p-2 rounded-2xl shadow-sm">

                      <div className="flex items-center text-red-500 font-medium">
                        <RiArrowUpLongLine />
                        {Math.floor(item?.main?.temp_max)}°
                      </div>

                      <div className="flex items-center text-blue-500 font-medium">
                        <RiArrowDownLongLine />
                        {Math.floor(item?.main?.temp_min)}°
                      </div>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
