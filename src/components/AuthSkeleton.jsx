import React from 'react'

function AuthSkeleton() {
  return (
      <div className="h-screen bg-[#e9f1ff] px-6 py-8 animate-pulse">

      <div className="h-full flex flex-col justify-center gap-6">

        {/* Logo */}
        <div className="flex flex-col items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-blue-200"></div>

          <div className="h-8 w-48 bg-white rounded-xl"></div>

          <div className="h-4 w-64 bg-white rounded-xl"></div>

        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 mt-6">

          <div className="h-14 bg-white rounded-full"></div>

          <div className="h-14 bg-white rounded-full"></div>

          <div className="h-14 bg-white rounded-full"></div>

        </div>

        {/* Button */}
        <div className="h-14 bg-blue-300 rounded-full mt-4"></div>

        {/* Bottom text */}
        <div className="flex justify-center mt-2">
          <div className="h-4 w-48 bg-white rounded-xl"></div>
        </div>

      </div>

    </div>
  )
}

export default AuthSkeleton
