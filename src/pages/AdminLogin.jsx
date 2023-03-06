import React, { useState, useEffect } from 'react'
import SideBar from '../components/AdminSideBar/adminSideBar'
import AdminHeader from '../components/Home/adminHeader'
import AdminLoginHere from '../components/LoginPage/loginPage'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UARL } from '../../API/apiCall';
import AdminLanding from './AdminLanding';
function adminLoding() {
  const navigate = useNavigate()
  const [login, setLogin] = useState(false)

  useEffect(() => {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `admin ${token}` };

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