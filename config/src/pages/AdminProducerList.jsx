import React from 'react'
import SideBar from '../components/AdminSideBar/adminSideBar'
import AdminHeader from '../components/Home/adminHeader'
import Producer from '../components/AdminProducerList/adminProducerList'

function AdminProducerList() {
  return (
    <div className='relative'>
    <div className='fixed top-0 left-0 right-0'>
    <AdminHeader  />
    </div>
    <SideBar/>
    <Producer/>
    </div>
  )
}

export default AdminProducerList