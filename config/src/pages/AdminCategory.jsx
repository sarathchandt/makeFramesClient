import React from 'react'
import SideBar from '../components/AdminSideBar/adminSideBar'
import AdminHeader from '../components/Home/adminHeader'
import AdminCate from '../components/AdminCategory/adminCategory'

function AdminCategory() {
  return (
    <div className='relative'>
    <div className='fixed top-0 left-0 right-0'>
    <AdminHeader  />
    </div>
    <SideBar/>
    <AdminCate/>

    </div>
  )
}

export default AdminCategory