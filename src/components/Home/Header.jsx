import axios from 'axios'
import { UURL } from '../../../API/apiCall';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { changeState } from '../../../slices/isArtist.mjs'
import {changeLoginState} from '../../../slices/loginUser.mjs'


import './Header.css'



import { FiLogIn } from "@react-icons/all-files/fi/FiLogIn.esm";
import { MdAccountCircle } from '@react-icons/all-files/md/MdAccountCircle.esm'
import { MdCancel } from '@react-icons/all-files/md/MdCancel.esm'
import { BiMovie } from '@react-icons/all-files/bi/BiMovie.esm'
import { FaMoneyBillAlt } from '@react-icons/all-files/fa/FaMoneyBillAlt.esm'
import { AiFillMessage } from '@react-icons/all-files/ai/AiFillMessage.esm'
import { AiOutlineBars } from '@react-icons/all-files/ai/AiOutlineBars.esm'
import { AiTwotoneHome } from '@react-icons/all-files/ai/AiTwotoneHome.esm'
import { BsFillInfoCircleFill } from '@react-icons/all-files/bs/BsFillInfoCircleFill.esm'




function Header() {



  const [login, setLogin] = useState(false)
  const [profilebar, setProfilebar] = useState(false)
  const [navbar, setNavbar] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [proprofile, setProprofile] = useState(false)
  const [domain, setDomain] = useState('')
  const [about, setAbout] = useState('')
  const [category, setCategory]=useState([])
  


  const dispatch = useDispatch();


  let is_artist = useSelector(state => state.checkArtist.isArtist);

  function RegistrationArtist(e) {
    e.preventDefault();
    const token = document.cookie
    let data = {
      domain: domain,
      about: about,
      token:token
    }
    axios.post(`${UURL}registerArtist`, data).then((result) => {
      if(result.data.artistDone==true){
        navigate('/profetionalProfile')
        
      }
    })
  }
  console.log(is_artist,"kkk");
  useEffect(() => {
    const token = document.cookie
    axios.post(`${UURL}loginCheck`, { token: token }).then(response => {
      setLogin(response.data.user)
      dispatch(changeLoginState(response.data.user))
      setFirstname(response.data?.firstName)
      setLastname(response.data?.lastName)
    })

    axios.get(`${UURL}getDomain`,{withCredentials:true}).then(res=>{
      console.log(res);
      setCategory(res.data)
    })
    axios.post(`${UURL}checkArtist`, { token: token }).then((response) => {
      dispatch(changeState(response.data.isArtist))
      console.log(response);
      
    })
  },[])
  
  console.log(category);

  const navigate = useNavigate();
  return (
    <>

      <div className='flex flex-nowrap p-2'>
        <p className='green  font-bold' onClick={()=>{navigate('/')}}>Make</p>
        <p className='red  font-bold' onClick={()=>{navigate('/')}} >frames</p>


        <div className='flex  details  ' style={{ color: "#3C6255" }} id="navitems" >
          <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
            navigate("/")
          }}>Home</p>
          <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
            navigate("/")
          }}>About</p>
          {/* <p className='pl-8 text-sm cursor hover:text-red'>Approach Producers</p> */}

          {
            login ? <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
              // navigate("/profile")
              setProfilebar(true)
            }}>Profile</p> : <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
              navigate("/login")
            }}>Login</p>
          }
        </div>
        <div className={profilebar ? 'profile active p bg-green' : 'profile bg-green'}>

          <div className='container '>
            <div className="row">
              <div className='d-flex  justify-content-start col-6 mt-2 text-darkGreen' ><AiFillMessage style={{ fontSize: '25px' }} /></div>
              <div className='d-flex  justify-content-end col-6 mt-2 text-darkGreen' onClick={() => { setProfilebar(false) }} ><MdCancel style={{ fontSize: '25px' }} /></div>
              <div className='d-flex  justify-content-center  col-12 mt-4 text-darkGreen '><MdAccountCircle style={{ fontSize: '35px' }} /></div>
              <div className='d-flex  justify-content-center  col-12 mb-5 text-black '><h6>{firstname} {lastname}</h6></div>
            </div>
          </div>
          <div className='container   '>
            <div className='row   cursor  text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3  mt-1  '> <BiMovie style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9   ' onClick={() => {
                setProfilebar(false)
                is_artist ? navigate('/profetionalProfile') : setProprofile(true);
              }} >{is_artist ? 'Artist Profile':'Be An Artist' } </div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3 mt-1'> <FaMoneyBillAlt style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9 ' onClick={()=>{navigate('/viewBookedProgram')}}>Bookings</div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3 mt-1'> <FiLogIn style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9 '>Logout </div>
            </div>
          </div>
        </div>

        <div className={proprofile ? 'profile active p bg-green' : 'profile p bg-green'} >
          <form onSubmit={RegistrationArtist} >
            <div className="container">
              <div className="row">
                <div className='d-flex  justify-content-start col-6 mt-2 text-darkGreen'  ><AiFillMessage style={{ fontSize: '25px' }} /></div>
                <div className='d-flex  justify-content-end col-6 mt-2 text-darkGreen cursor' onClick={() => { setProprofile(false) }} ><MdCancel style={{ fontSize: '25px' }} /></div>
                <div className='d-flex  justify-content-center col-12 text-darkGreen mt-4' > <BiMovie style={{ fontSize: '25px' }} /></div>
                <div className='d-flex  justify-content-center col-12 text-darkGreen '><h5>Be An Artist</h5></div>
                <div className='d-flex  justify-content-start col-12 text-darkGreen  mt-3'>About</div>
                <div className='d-flex  justify-content-center col-12 text-darkGreen  ' >
                  <input type="text" value={about} className='bg-green border border-3 rounded w-full m-2 border-darkGreen' onChange={(e) => {
                    setAbout(e.target.value)
                  }} />
                </div>

                <div className='d-flex  justify-content-start col-12 text-darkGreen  mt-3'>Choose Domain</div>
                <div className='d-flex  justify-content-center col-12 text-darkGreen  ' >
                  <select className='bg-green border border-3 rounded w-full m-2 border-darkGreen mb-4' onClick={(e) => { setDomain(e.target.value) }}   >
                  <option value="" style={{ display: 'none' }} >Choose </option>
                    {category?.map(e=>{
                      return <>
                      <option value={e?.name } className='bg-darkGreen text-white'  >{e?.name}</option>
                    </>})
                    } 
                   

                  </select>
                </div>
                <div className='d-flex  justify-content-end col-12'><button type='submit' className='btn bg-darkGreen text-white hover:bg-red m-2' onClick={()=>{setProprofile(false)}}>Make Profile</button></div>
              </div>
            </div>
          </form>
        </div>
{/* above code to change form.................................................. */}


        <div className='details toggle p-1 text-green cursor' onClick={() => {
          setNavbar(true)
        }}>
          <AiOutlineBars style={{ fontSize: '30px' }} />
        </div>
        <div className={navbar ? 'profile active  bg-green' : 'profile bg-green'}>

          <div className='container '>
            <div className="row">
              <div className='d-flex  justify-content-end col-12 mt-2 text-darkGreen' onClick={() => { setNavbar(false) }} ><MdCancel style={{ fontSize: '25px' }} /></div>
            </div>
          </div>
          <div className='container  mt-5 '>
            <div className='row   cursor  text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3  mt-1  '> <AiTwotoneHome style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9   ' onClick={() => {
                navigate('/')
                setNavbar(false)
              }} >Home  </div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3 mt-1'> <FaMoneyBillAlt style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9 '>To Producer</div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3 mt-1'> <BsFillInfoCircleFill style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9 '>About</div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              {login ? <div className='d-flex  justify-content-end col-3 mt-1'> <FiLogIn style={{ fontSize: '20px' }} />  </div> : <div className='d-flex  justify-content-end col-3 mt-1'> <FiLogIn style={{ fontSize: '20px' }} />  </div>}
              {login ? <div className='d-flex  justify-content-start col-9 ' onClick={() => {
                setProfilebar(true)
                setNavbar(false)

              }} >Profile </div> : <div className='d-flex  justify-content-start col-9 ' onClick={() => {
                navigate('/login')
                setNavbar(false)
              }}>Login </div>}

            </div>

          </div>

        </div>



      </div>





    </>
  )
}

export default Header