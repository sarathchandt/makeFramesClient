import React, { useState } from 'react'
import './Header.css'
import { useNavigate } from "react-router-dom";



import { AiOutlineBars } from '@react-icons/all-files/ai/AiOutlineBars.esm'
import { MdCancel } from '@react-icons/all-files/md/MdCancel.esm'
import { MdAccountCircle } from '@react-icons/all-files/md/MdAccountCircle.esm'
import { MdEventAvailable } from '@react-icons/all-files/md/MdEventAvailable.esm'
import { AiFillSchedule } from '@react-icons/all-files/ai/AiFillSchedule.esm'
import { RiSettings4Fill } from "@react-icons/all-files/ri/RiSettings4Fill.esm"
import axios from 'axios';
import { UURL } from '../../../API/apiCall';

function ProfetionalHeader() {


    const [navBar, setNavbar] = useState(false)
    const [coment, setComent] = useState('')
    const [file] = useState([])
    const [imageArray] = useState([])


    const navigate = useNavigate()

    function loadImage(e) {
        for (let i = 0; i < e.target.files.length; i++) {
            file.push(e.target.files[i])
        }
    }

    const upload =  () => {
        
        const data = new FormData()
        file.forEach(async (image) => {
            data.append('file', image)
            data.append("upload_preset", 'nefiqdoa')
            await axios.post('https://api.cloudinary.com/v1_1/dyn6m4tou/image/upload', data).then(async(res) => {
                imageArray.push(res.data.secure_url)
                
                let details = {
                    images: imageArray,
                    coments: coment,
                    token: document.cookie
                }
                await axios.post(`${UURL}addPost`, details).then(res => {
                    if (res.data.posted) {
                        navigate('/profetionalProfile')
                        location.reload();
                    }
                })
            })
        })
        

    }
    return (
        <div className='container-fluid'>
            <div className='row' >
                <div className='flex flex-nowrap p-2 col-3'>
                    <p className='green  font-bold' onClick={()=>{navigate('/')}} >Make</p>
                    <p className='red  font-bold' onClick={()=>{navigate('/')}} >frames</p>
                </div>
                <div className='d-md-block d-none  col-md-9'>
                    <div className=' d-flex  justify-content-end text-green '>
                    <p className='ms-5   mt-3 hover:text-red  cursor' onClick={() => {
                            navigate('/profetionalProfile')
                        }} >Profile</p>
                        <p className='ms-5   mt-3 hover:text-red  cursor' onClick={() => {
                            navigate('/addPrograms')
                        }} >Add Programs</p>
                        <p className='ms-5  mt-3 hover:text-red cursor' onClick={() => { navigate('/viewPrograms') }}  >Schedules</p>
                        <p className='ms-5 mt-3 hover:text-red cursor'  >Settings</p>
                    </div>
                </div>
                <div className='d-md-none d-block  col-9  '>
                    <p className=' d-flex justify-content-end text-green mt-3 cursor' onClick={() => { setNavbar(true) }}><AiOutlineBars style={{ fontSize: '30px' }} /></p>
                </div>
            </div >
           

            <div className={navBar ? 'profile active bg-green' : 'profile bg-green'}>
                <div className='container '>
                    <div className="row">
                        <div className='d-flex  justify-content-end col-12 mt-2 text-darkGreen cursor' onClick={() => { setNavbar(false) }} ><MdCancel style={{ fontSize: '25px' }} /></div>
                        <div className='d-flex  justify-content-center  col-12 mt-4 text-darkGreen ' ><MdAccountCircle style={{ fontSize: '35px' }} /></div>
                        <div className='d-flex  justify-content-center  col-12 mb-5 text-black '><h6> </h6></div>
                        <div className="container-fluid">
                            <div className="row hover:bg-red hover:text-white p-1 cursor">
                                <div className='d-flex  justify-content-end col-4  mt-1 text-darkGreen '><MdEventAvailable style={{ fontSize: '30px' }} /></div>
                                <div className='d-flex  justify-content-start col-8  mt-1 text-darkGreen ' onClick={() => {
                                    navigate('/addPrograms')
                                }}> Add Programs</div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row hover:bg-red hover:text-white p-1 cursor ">
                                <div className='d-flex  justify-content-end col-4  mt-1 text-darkGreen '><AiFillSchedule style={{ fontSize: '30px' }} /></div>
                                <div className='d-flex  justify-content-start col-8  mt-1 text-darkGreen ' onClick={() => { navigate('/viewPrograms') }}> Schedules</div>
                            </div>
                        </div>
                    
                        <div className="container-fluid">
                            <div className="row hover:bg-red hover:text-white p-1 cursor ">
                                <div className='d-flex  justify-content-end col-4  mt-1 text-darkGreen '><    RiSettings4Fill style={{ fontSize: '30px' }} /></div>
                                <div className='d-flex  justify-content-start col-8  mt-1 text-darkGreen '> Settings</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfetionalHeader