export const getCurrentWeather = async (lat, lon) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
    if(!res.ok){
        throw new Error("Failed to fetch weather");

    }

    return await res.json();
}

export const getForecast = async (lat, lon) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
    if(!res.ok){
        throw new Error("Failed to fetch forecast");

    }

    return await res.json();
}

export const searchCityWeather = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
    if(!res.ok){
        throw new Error("Failed to fetch weather for city");

    }

    return await res.json();
}