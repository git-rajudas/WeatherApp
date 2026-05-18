import React from 'react'
import { useWeather } from '../context/WeatherContext'

function LocationError() {

    const {fetchWeatherByCoords} = useWeather();

    return (


        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">

            <div className="bg-white w-full max-w-sm rounded-[35px] p-6 shadow-2xl flex flex-col items-center text-center gap-5">

                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl">
                    📍
                </div>

                {/* Title */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Enable Location
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm">
                        Please allow location access to get your current weather updates.
                    </p>
                </div>

                {/* Buttons */}
                <div className="w-full flex flex-col gap-3">

                    <button
                        onClick={fetchWeatherByCoords}
                        className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-4 rounded-2xl font-semibold"
                    >
                        Enable Location
                    </button>

                    <button
                        onClick={() => setError(null)}
                        className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-medium"
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>

    )
}

export default LocationError
