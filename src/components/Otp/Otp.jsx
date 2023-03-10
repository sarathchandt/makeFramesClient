import React, { useState } from 'react'
import { useNavigate , useSearchParams, createSearchParams} from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { UURL } from '../../../API/apiCall';

function Otp() {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    function sentOtp() {
        if (otp.length == 0) {
            toast.error('Please enter the otp')
        } else {
            axios.post(`${UURL}verifyOtpForgot`, { otp: otp }).then(res => {
                console.log(res.data.otp);
                if (res.data.otp) {
                    navigate({
                        pathname: '/passWord',
                        search: createSearchParams({
                          client: searchParams.get('client')
                        }).toString()
                      })
                } else {
                    navigate('/otpSubmit')
                    toast.error('Invaid otp')
                }
            })
        }
    }

    return (
        <div>
            <div>

                <Toaster />
                <div className=' bg-darkGreen  p-5 mt-20  ' >
                    <div className='flex justify-content-center text-green'><p className=''>Enter the otp </p></div>
                    <div className='d-flex justify-content-center'>
                        <div>
                            <input type="number" name='email' className=' m-3  w-max   border-4 rounded-lg bg-black ' placeholder=' otp' required value={otp} onChange={(e) => {
                                setOtp(e.target.value)
                            }} />
                            <br />



                            <div className='d-flex justify-content-center'> <p type='' className=" btn bg-green hover:bg-red text-white " onClick={sentOtp}>
                                sent otp
                            </p></div></div>



                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otp