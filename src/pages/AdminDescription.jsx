import React from 'react'
import SideBar from '../components/AdminSideBar/adminSideBar'
import AdminHeader from '../components/Home/adminHeader'
import AdminDesc from '../components/AdminDescription/adminDescription'
function AdminDescription() {
  return (
    <div className='relative'>
    <div className='fixed top-0 left-0 right-0'>
    <AdminHeader  />
    </div>
    <SideBar/>
    <AdminDesc/>
    </div>
  )
}

export default AdminDescription