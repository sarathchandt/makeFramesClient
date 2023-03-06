import { Outlet } from "react-router-dom";
import axios from "axios";
import { UURL } from "../../API/apiCall";
import React, { useEffect, useState } from 'react';
import Home from "./Home";


function privateRoutes() {
    const [isLogin, setIsLogin] = useState(false)


    useEffect(() => {
        const token = document.cookie
             axios.post(`${UURL}loginCheck`, { token: token }).then((response) => {
                setIsLogin(response.data.user)
            })
    }, [])
    return (
       isLogin ? <Outlet/> : <Home/>
    )
}

export default privateRoutes