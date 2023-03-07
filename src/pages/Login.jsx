import React,{useEffect,useState} from 'react'
// import store from '../../app/store.mjs';
// import {checkActions} from '../../slices/checkLogin.mjs'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UURL } from '../../API/apiCall';
import Header from '../components/Home/Header'
import LoginForm from "../components/Login/LoginForm";
import LandingHome from '../components/LandingHome/LandingHome'

function Login() {

    const[isLogin,setIsLogin] = useState(false)
      const navigate = useNavigate();
    


    useEffect(()=>{
        const token = localStorage.getItem('usertoken')
        async function  datafetch  (){
             await axios.post(`${UURL}loginCheck`,{token:token}).then((response)=>{
                  setIsLogin(response.data.user)
                  response.data.user?navigate('/'):navigate('/login')
              })
          }
          datafetch();
        },[])

  return (
    <>
       <Header/>
      { isLogin ? <LandingHome/>: <LoginForm/>}
        
    </>
  )
}

export default Login