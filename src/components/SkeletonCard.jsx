import React from "react";

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-[35px] p-6 shadow-xl">
      
      {/* top */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
      </div>

      {/* center */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-3">
          <div className="h-10 w-28 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
        </div>

        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
      </div>

      {/* bottom stats */}
      <div className="flex gap-3">
        <div className="flex-1 h-20 bg-gray-200 rounded-2xl"></div>
        <div className="flex-1 h-20 bg-gray-200 rounded-2xl"></div>
        <div className="flex-1 h-20 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;