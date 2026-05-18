import React from 'react'
import { useWeather } from '../context/WeatherContext'

function ErrorPopup() {

    const { error } = useWeather();
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-6">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-3xl">⚠️</span>
                </div>

                {/* Title */}
                <div className="text-xl font-bold text-gray-800">
                    Something Went Wrong
                </div>

                {/* Error Message */}
                <div className="text-gray-500 text-center text-sm">
                    {error}
                </div>

                {/* Button */}
                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-2xl font-semibold"
                >
                    Try Again
                </button>
            </div>
        </div>

    )
}

export default ErrorPopup
