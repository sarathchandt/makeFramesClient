import React,{useState, useEffect} from 'react'
import { Outlet } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import {checkTocken} from '../../slices/adminPrivateRouteCheck.mjs'

import Login from './AdminLogin'

function AdminPrivateRoutes() {
    const token = useSelector(state=>state.token)
    const dispatch = useDispatch()

    useEffect(()=>{
      
      dispatch(checkTocken())
     
          },[])
          console.log(token,"looo");

  return (<>
    {token?.token?.data?.token ? <Outlet/> : <Login/> }
    </>
  )
}

export default AdminPrivateRoutes