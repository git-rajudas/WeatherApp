import React from 'react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom';
import Home from './Home';

function Index() {
  return (
    // <div className="min-h-screen bg-gray-200 flex justify-center">
    //   <div className="w-full max-w-[530px] min-h-screen bg-white relative overflow-hidden">

      
    //   </div>
    // </div>

    <>
      <Nav />
      <div className='md:ml-[260px]'>

      <Outlet />
      </div>
    </>

  )
}

export default Index
