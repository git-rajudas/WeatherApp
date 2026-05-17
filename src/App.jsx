// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import { useEffect, useState } from 'react'

// import Nav from './components/Nav'
// import WeatherCard from './components/WeatherCard';
// import SearchBar from './components/SearchBar'
// import { DataContext } from "./context/datacontext";
// import useWeather from './hooks/useWeather'
// import Home from './pages/Home';



// function App() {

//   const [city, setCity] = useState("Kolkata");
//   // const [weather, setWeather] = useState(null);
//   // const [loading, setLoading] = useState(false);
//   const [input, setInput] = useState("")
//   // const [error, setError] = useState(null);



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim() !== "") {
//       setCity(input);
//       setInput("")
//     }
//   }

//   // useEffect(() => {
//   //   const fetchWeather = async () => {
//   //     try {
//   //       setLoading(true);
//   //       setError(null);

//   //       const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ae826743c7b03e70f752249740fc323&units=metric`);

//   //       if (!res.ok) {
//   //         throw new Error("City not found");
//   //       }

//   //       const data = await res.json();
//   //       setWeather(data);

//   //     } catch (err) {
//   //       setError(err.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchWeather();

//   // }, [city])

 

//   const { weather, loading, error, coords } = useWeather(city);


//   const getWeatherIcon = (condition) => {
//     if (condition === "Clear") return "☀️";
//     if (condition === "Clouds") return "☁️";
//     if (condition === "Rain") return "🌧️";
//     if (condition === "Haze") return "🌥️";
//     if (condition === "Thunderstorm") return "⛈️";
//     return "🌍";

//   }

//   const getbg = (condition) => {
//     if (condition === "Clear") return "bg-[url(https://images.unsplash.com/photo-1525490829609-d166ddb58678?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]";
//     if (condition === "Clouds") return "bg-[url(https://images.unsplash.com/photo-1469365556835-3da3db4c253b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]";
//     if (condition === "Rain") return "bg-[url(https://images.unsplash.com/photo-1692362385851-cf68a6d9604b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]";
//     if (condition === "Haze") return "bg-[url(https://images.unsplash.com/photo-1534358594138-6955f589fa24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]";
//     if (condition === "Thunderstorm") return "bg-[url(https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=751&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]";
//     return "bg-[url(https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D)]";

//   }

// const condition = weather?.weather?.[0]?.main;
// const bg = getbg(condition);





//   return (

//     <DataContext.Provider value={{handleSubmit,
//     getWeatherIcon,
//     getbg,
//     bg,
//     city,
//     setInput,
//     weather,
//     loading,
//     input,
//     error}}>
    
//       <div className='h-screen bg-gray-200'>
//       < Nav />
//       < Outlet />
//       </div>
  
//     </DataContext.Provider>
//   )
// }

// export default App


import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'

function App() {
  return (
    <div>
    <Home /> 
    </div>
  )
}

export default App
