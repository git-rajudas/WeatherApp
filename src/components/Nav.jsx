import { useState } from "react";
import {
  RiHome5Line,
  RiCloudyLine,
  RiRoadMapLine,
  RiSettings2Line,
  RiUserLine,
} from "@remixicon/react";
import { NavLink } from "react-router-dom";

function Nav() {
  const [active, setActive] = useState("home");

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: <RiHome5Line />,
    },
    {
      id: "forecast",
      label: "Forecast",
      icon: <RiCloudyLine />,
    },
    {
      id: "search",
      label: "Search",
      icon: <RiRoadMapLine />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <RiUserLine />,
    },
  ];

  return (
    <>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-md md:hidden">
        <div className="flex justify-between items-center bg-black text-white p-2 rounded-3xl shadow-lg">
          {tabs.map((tab) => (
            <NavLink key={tab.id} onClick={() => setActive(tab.id)} className={`flex items-center rounded-2xl transition-all duration-300 cursor-pointer ${active === tab.id ? "bg-blue-400" : "bg-transparent"}`} to={`${tab.id === "home" ? "" : tab.id}`} >
              <div className="p-3 bg-white rounded-2xl text-black text-xl">
                {tab.icon}
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${active === tab.id
                    ? "max-w-[120px] opacity-100 px-3"
                    : "max-w-0 opacity-0 px-0"
                  }`}
              >
                {tab.label}
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="hidden md:flex  fixed left-0 top-0 h-screen w-[260px] bg-white shadow-xl flex-col p-6 gap-6">
        <div className="text-3xl font-bold text-blue-500">Weather App</div>

        <div className="flex flex-col gap-3 mt-8">
          {tabs.map((tab) => (
            <NavLink key={tab.id} onClick={() => setActive(tab.id)} className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${active === tab.id ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"}`} to={`${tab.id === "home" ? "" : tab.id}`} >
              <div className="p-3 bg-white rounded-2xl text-black text-xl"> {tab.icon} </div>
           
              <div className="font-medium">{tab.label}</div>

              
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Nav;
