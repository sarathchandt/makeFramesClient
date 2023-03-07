import React from 'react'
import SideBar from '../components/AdminSideBar/AdminSideBar'
import AdminHeader from '../components/Home/AdminHeader'
import AdminCate from '../components/AdminCategory/AdminCategory'

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