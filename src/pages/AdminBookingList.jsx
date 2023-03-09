import React from 'react'
import SideBar from '../components/AdminSideBar/adminSideBar'
import AdminHeader from '../components/Home/adminHeader'
import AdminProgramView from '../components/AdminProgramView/adminProgramView'
function AdminBookingList() {
  return (
    <div className='relative'>
    <div className='fixed top-0 left-0 right-0'>
    <AdminHeader  />
    </div>
    <SideBar/>
    <AdminProgramView/>

    </div>
  )
}

export default AdminBookingList