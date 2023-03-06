import AdminHeader from '../components/Home/adminHeader'
import AdminLanding from '../components/LandingHome/adminLanding'
import SideBar from '../components/AdminSideBar/adminSideBar'
import React from 'react'


function adminLanding() {
  return (
    <div className='relative'>
        <div className='fixed top-0 left-0 right-0'>
        <AdminHeader  />
        </div>
        <SideBar/>
        <AdminLanding/>
    </div>
  )
}

export default adminLanding