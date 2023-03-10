import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { UURL } from '../../../API/apiCall';


function Password() {

const [pass, setPass] = useState("")
    const navigate = useNavigate()
    const [searchParams]=useSearchParams()
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    function sentOtp() {
        if (!PWD_REGEX.test(pass)) {
            toast.error('Password must contain atlest 8 charactors, a letter(capital & small), a number and a symbol ')
        } else {
            axios.post(`${UURL}changePassword`, { pass: pass , email :searchParams.get('client') }).then(res => {
                if (res.data.pass) {
                    navigate('/login')
                } else{
                    navigate('/password')
                }
            })
        }
    }

    return (
        <div>
            <div>

                <Toaster />
                <div className=' bg-darkGreen  p-5 mt-20  ' >
                    <div className='flex justify-content-center text-green'><p className=''>Enter new password </p></div>
                    <div className='d-flex justify-content-center'>
                        <div>
                            <input type="text" name='email' className=' m-3  w-max   border-4 rounded-lg bg-black ' placeholder='password' required value={pass} onChange={(e) => {
                                setPass(e.target.value)
                            }} />
                            <br />



                            <div className='d-flex justify-content-center'> <p type='' className=" btn bg-green hover:bg-red text-white " onClick={sentOtp}>
                                set password
                            </p></div></div>



                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    
  )
}

export default Password