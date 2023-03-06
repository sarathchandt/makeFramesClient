import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


import { UURL } from '../../../API/apiCall'
import axios from 'axios'
import "./SignupForm.css"


function SignupForm() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [seePassword, setSeeRePassword] = useState('password')
  const [seeRePassword, setSeeReRePassword] = useState('password')
  const [check_here, setcheck_here] = useState(false)
  const [otp, setOtp] = useState(null)


  const navigate = useNavigate();
  





  useEffect(()=>{
    
    const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (firstName.length > 4 && lastName.length > 4 && EMAIL_REGEX.test(email) && PWD_REGEX.test(password) && PWD_REGEX.test(rePassword) ) {
      setcheck_here(true)
    } else {
      setcheck_here(false)
    }
  },[lastName,firstName,email,password,rePassword])





  const validation = () => {

    const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


    return new Promise((resolve, reject) => {

      if (firstName.length < 4) {
     
        resolve({
          firstname: false,
          lastName: true,
          email: true,
          password: true,
          rePassword: true
        })
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'First name must contain four letters',

        })

      }
      else if (lastName.length < 4) {

        resolve({
          lastName: false,
          firstname: true,
          email: true,
          password: true,
          rePassword: true
        })
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Lastname name must contain four letters',
        })
      }
      else if (!EMAIL_REGEX.test(email)) {
        resolve({
          lastName: true,
          firstname: true,
          email: false,
          password: true,
          rePassword: true
        })
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Enter a valid email ',
        })
      }
      else if (!PWD_REGEX.test(password)) {
        resolve({
          firstname: false,
          lastName: true,
          email: true,
          password: false,
          rePassword: true
        })

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Password must contain atlest 8 charactors, a letter(capital & small), a number and a symbol ',
        })

      } 
      else if(password !== rePassword){

        resolve({
          firstname: true,
          lastName: true,
          email: true,
          password: true,
          rePassword: false
        })

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'OOPS.. re-entered password is not matching ',
        })

      }else{
        resolve(
          {
            firstname: true,
            lastName: true,
            email: true,
            password: true,
            rePassword: true
          }
        )
      }
    })
  }





  const details = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    otp:otp

  }


  const sentOtp = () => {
    console.log("llllllllllll");
    axios.post(`${UURL}otp`, { email: email }).then((response) => {
      console.log(response.data);
    })
  }

  const signup = (e) => {

    e.preventDefault();
    console.log(UURL);
    axios.post(`${UURL}signup`, details).then(result => {
      if (!result.data.is && result.data.serverOtp) {
        navigate("/")      
        document.cookie = `${result.data.token}`
      
      } else {
        navigate('/signup');
        if(result.data.is){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'warning',
            title: 'This email already registered',
          })
        }
        else if(result.data.serverOtp==false){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'warning',
            title: 'Please enter the valid OTP',
          })
        }


      }
    }).catch(err => {
      consol.log(err)
    })
  }



  return (
    <div>
      <div className='img mb-5 h-fit bg-darkGreen'>


        <div className='flex justify-center mt-20 '>


          <form action="" className="mt-5 mb-8" onSubmit={signup}  >
            <div className='static'>
              <input type="text" name='firstName' className=' m-3 email w-max border-green  border-4 rounded-lg bg-black ' placeholder=' First Name' value={firstName} required onChange={(e) => {
                setFirstName(e.target.value)

              }} />

              <br />
              <input type="text" name='lastName' className=' m-3 email w-max border-green  border-4 rounded-lg bg-black ' placeholder=' Second Name' value={lastName} required onChange={(e) => {
                setLastName(e.target.value)

              }} />
              <br />
              <input type="email" name='email' className=' m-3 email w-max border-green  border-4 rounded-lg bg-black ' placeholder=' E-mail' value={email} required onChange={(e) => {
                setEmail(e.target.value)
              }} />
              <br />

              <input type={seePassword} name='password' className='m-3 email w-max border-green  border-green  border-4 rounded-lg bg-black ' placeholder=' Password' value={password} required onChange={(e) => {
                setPassword(e.target.value);
              
              }} />

              {
                seePassword == 'password' ?

                  <span className="material-symbols-outlined relative top-1.5 right-11 cursor-pointer" onClick={() => { setSeeRePassword('text') }}>
                    visibility
                  </span> :

                  <span className="material-symbols-outlined relative top-1.5 right-11 cursor-pointer" onClick={() => { setSeeRePassword('password') }}>
                    visibility_off
                  </span>
              }
              <br />

              <input type={seeRePassword} name='rePassword' className='m-3 email w-max border-green  border-4 rounded-lg  bg-black' placeholder='  Re-enter Password' value={rePassword} required onChange={(e) => {
                setRePassword(e.target.value)
              }} />
              {
                seeRePassword == 'password' ?

                  <span className="material-symbols-outlined relative top-1.5 right-11 cursor-pointer " onClick={() => { setSeeReRePassword('text') }}>
                    visibility
                  </span> :

                  <span className="material-symbols-outlined relative top-1.5 right-11 cursor-pointer" onClick={() => { setSeeReRePassword('password') }}>
                    visibility_off
                  </span>
              }
              <br />
              {
                check_here ? <a  data-bs-target="#exampleModal" data-bs-toggle="modal" className=" cursor buttons bg-green hover:bg-red text-white font-bold py-2 px-4 mb-5 rounded-lg " onClick={() => {
                  validation().then((result)=>{
                    if(result.lastName,result.firstName,result.email,result.password,result.rePassword){
                      sentOtp()
                    }else{
                      console.log('nothing');
                    }
                  })
                }} >
                  Signup
                </a> : <a  className=" cursor buttons bg-green hover:bg-red text-white font-bold py-2 px-4 mb-5 rounded-lg " onClick={() => {
                  validation()  
                }} >
                  Signup
                </a>

              }


            </div>


            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}

            <div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog ">
                <div className="modal-content bg-darkGreen">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5 " id="exampleModalLabel">Enter otp</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <p className=''>An otp has sent to your email</p>
                    <input type="number" className=' border-green border-4 rounded-lg  bg-black' placeholder='enter otp' value={otp} onChange={(e)=>{
                      setOtp(e.target.value)
                    }}  />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn bg-green hover:bg-red text-white" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-green hover:bg-red text-white"   >Submit</button>
                    <button type="button" className="btn bg-green hover:bg-red text-white">Resent otp</button>
                  </div>
                </div>
              </div>
            </div>

          </form>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm