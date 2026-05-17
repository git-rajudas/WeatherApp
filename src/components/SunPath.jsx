import React from "react";
import { RiSunLine } from "@remixicon/react";
import { useWeather } from "../context/WeatherContext";

function SunPath() {
  const { currentWeather } = useWeather();

  const sunrise = new Date(currentWeather?.sys?.sunrise * 1000);
  const sunset = new Date(currentWeather?.sys?.sunset * 1000);
  const now = new Date();

  const totalDayTime = sunset - sunrise;
  const passedTime = now - sunrise;

  const progress = Math.min(
    Math.max((passedTime / totalDayTime) * 100, 0),
    100,
  );

  return (
    <div className="bg-white rounded-4xl p-6 flex flex-col gap-6">
      <div className="relative w-full h-24 flex items-center">
        {/* line */}
        <div className="w-full h-2 bg-orange-200 rounded-full"></div>

        {/* moving sun */}
        <div
          className="absolute transition-all duration-1000"
          style={{ left: `${progress}%` }}
        >
          <div className="-translate-x-1/2 -translate-y-6 text-4xl">☀️</div>
        </div>
      </div>
    </div>
  );
}

export default SunPath;
