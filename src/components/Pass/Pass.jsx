import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UURL } from '../../../API/apiCall';

function Pass() {
    const [email, setEmail] = useState("")
    const [sign, setSign]=useState(false)
    const navigate = useNavigate()

    function sentOtp(){
        axios.post(`${UURL}forgotPass`,{email:email}).then(res=>{
            if(!res?.data?.email){
                navigate('/forgotPass')
                toast.error('This email not registered, Please register')
                setSign(true)
            }else{
                navigate({
                    pathname: '/otpSubmit',
                    search: createSearchParams({
                      client: res?.data?.clientEmail
                    }).toString()
                  })

            }
            console.log(res.data);
        })
    }

  return (
    <div>

<Toaster/>
      <div className=' bg-darkGreen  p-5 mt-20  ' >
            <div className='flex justify-content-center text-green'><p  className=''>Forgot password ? </p></div>
      <div className='d-flex justify-content-center'>
      <div>
            <input type="email" name='email' className=' m-3  w-max   border-4 rounded-lg bg-black ' placeholder=' E-mail' required value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <br />
           
            

          <div className='d-flex justify-content-center'> <p type='' className=" btn bg-green hover:bg-red text-white " onClick={sentOtp}>
              sent otp
            </p> {sign && <p type='' className=" btn bg-green hover:bg-red text-white ml-1" onClick={()=>{navigate('/signup')}}>
              signup
            </p>}</div></div>
           
        
    
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default Pass