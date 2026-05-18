import React from "react";

import { RiCheckboxCircleFill, RiCloseCircleFill } from "@remixicon/react";

function Toast({ message, type, show }) {
  if (!show) return null;
  return (
    <div
      className=" fixed top-1/2 left-1/2 -transform -translate-x-1/2 -translate-y-1/2 z-50 px-5 py-4 rounded-2xl shadow-xl text-white flex items-center gap-3 backdrop-blur-md w-[90%] max-w-sm justify-center font-medium transition-all"
      style={{ background: type === "success" ? "#3b82f6" : "#ef4444" }}
    >
      {type === "success" ? (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-xl text-white">Saved Your Searched Location</div>
            <div className="text-green-400"><RiCheckboxCircleFill size={50} /></div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-xl text-white">Saved Your Searched Location</div>
            <div className="text-red-400"><RiCloseCircleFill size={50} /></div>
            
        </div>
      )}
    </div>
  );
}

export default Toast;
