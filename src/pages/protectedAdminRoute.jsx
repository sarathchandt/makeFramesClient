import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, Outlet } from "react-router-dom";
import { UARL } from '../../API/apiCall';
import AdminLanding from './AdminLanding';


function protectedAdminRoute() {
    const navigate = useNavigate()
    const [login, setLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const headers = { Authorization: `admin ${token}` };

        axios.get(`${UARL}checkAdminToken`, { headers }).then(res => {
            debugger
            if (!res.data.token) {
                setLogin(true)
                
            }else{
                navigate('/admin')
            }
        })
    }, [])

    return (
        login && <Outlet /> 
    )
}

export default protectedAdminRoute