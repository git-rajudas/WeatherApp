import React from 'react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom';
import Home from './Home';
import InstallPWA from '../components/InstallPWA';

function Index() {
  return (
    <>
      <Nav />
      <div className='md:ml-[260px]'>
      <InstallPWA />
      <Outlet />
      </div>
    </>

  )
}

export default Index
