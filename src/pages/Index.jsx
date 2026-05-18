import React from 'react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom';
import Home from './Home';

function Index() {
  return (
    <>
      <Nav />
      <div className='md:ml-[260px]'>

      <Outlet />
      </div>
    </>

  )
}

export default Index
