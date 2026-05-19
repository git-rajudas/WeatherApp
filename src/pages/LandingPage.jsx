import React from 'react'
import { RiArrowRightLine } from '@remixicon/react'
import { NavLink } from 'react-router-dom'
import InstallPWA from '../components/InstallPWA'


function LandingPage() {
  return (
    
      <div className='h-screen w-full flex flex-col bg justify-between sm:justify-center items-center gap-5 sm:gap-2 bg-gradient-to-t from-white via-blue-200 to-blue-500'>
        <InstallPWA />
        <div className='flex flex-col items-center justify-center mt-30 sm:mt-20'>
            <img className='w-[50%]' src="/weatherLogo.png" alt="" />
        </div>
        <div className='flex flex-col items-center justify-center p-10 bg-amber-50 rounded-4xl gap-6 m-5 sm:w-[30%]'>
            <h1 className='text-2xl sm:text-4xl font-bold text-blue-400 pt-5 '>Weather App</h1>
            <h4 className='sm:text-xl text-base items-center text-center'>Stay ahead of the weather in your city and plan your day with confidence</h4>
            <NavLink to={"/app"} className='rounded-4xl text-white p-3 m-3 sm:p-4 outline-2 outline-black border cursor-pointer bg-blue-400'><RiArrowRightLine size={24}/></NavLink>
        </div>
      </div>
  )
}

export default LandingPage
