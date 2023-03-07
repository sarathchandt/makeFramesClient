import React, { useState, useEffect } from 'react'
import SideBar from '../components/AdminSideBar/AdminSideBar'
import AdminHeader from '../components/Home/AdminHeader'
import AdminLoginHere from '../components/LoginPage/LoginPage'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UARL } from '../../API/apiCall';
import AdminLanding from './AdminLanding';
function adminLoding() {
  const navigate = useNavigate()
  const [login, setLogin] = useState(false)

  useEffect(() => {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };

      axios.get(`${UARL}checkAdminToken`, { headers }).then(res => {
          
          if (!res.data.token) {
              setLogin(true)
              
          }else{
              navigate('/admin')
          }
      })
  }, [])
  return (
    <div  className='relative'>
          <div className='fixed top-0 left-0 right-0'>
        <AdminHeader  />
        </div>
        <div className='d-md-block d-none'>
        <SideBar/>
        </div>
        <AdminLoginHere />

    </div>
  )
}

export default adminLoding