import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { UARL } from '../../../API/apiCall'

import './loginPage.css'



function loginPage() {

        const [adminId, setAdminId] = useState()
        const [password, setPassword]= useState()
        const navigate = useNavigate()

        function login(){
            axios.post(`${UARL}loginAdmin`,{password:password,adminId:adminId}).then(res=>{
                
                console.log(res.data);
                if(res.data.admin){
                    localStorage.setItem('adminToken', res.data.token);
                    navigate('/admin')
                }
            })
        }

    return (
        <div>
            <div className="container-fluid relative ">
                <div className="row ">
                    <div className="col-12 z-2 fixed d-flex justify-content-center ">
                        <div className='mt-5 pt-5' >
                            <input type="text" value={adminId} className=' m-3 email w-max border-darkGreen  border-4 rounded-lg bg-white text-black ' name="" id="" placeholder='Enter Admin ID' onChange={(e)=>{setAdminId(e.target.value)}} /><br />
                            <input type="text" value={password} className=' m-3 email w-max border-darkGreen  border-4 rounded-lg bg-white text-black ' name="" id="" placeholder='Enter Admin Password' onChange={(e)=>{setPassword(e.target.value)}}/><br />
                           <div className='d-flex justify-content-center'>
                             <button className='btn bg-green hover:bg-green text-white' onClick={login}>Login</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row ">
                    
                </div>
            </div>



        </div>
    )
}

export default loginPage