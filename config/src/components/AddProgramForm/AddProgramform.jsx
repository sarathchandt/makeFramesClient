import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
    import axios from 'axios';
import './AddProgram.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosRemoveCircle } from "@react-icons/all-files/io/IoIosRemoveCircle.esm"
import { UURL } from '../../../API/apiCall';
import Swal from 'sweetalert2'
import toast,{Toaster} from 'react-hot-toast'

import {AiFillInfoCircle} from '@react-icons/all-files/ai/AiFillInfoCircle'





function  AddProgramform() {




    const [date, setDate] = useState((new Date()))
    const [mapDates, setMapDates] = useState([])

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(null)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState([])
    const [imageArray] = useState([])
    const [vdoFile, setVdoFile] = useState()
    const [selectedDaates, setSelectedDates] = useState([])
    const [videoUrl, setVideoUrl] = useState('')
    const [throttleClick, setThrottleClick] = useState(false);
    const [loading, setLoding]=useState(false)
    const [ rules, setRules]= useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${UURL}takeDescription`,{withCredentials:true}).then(res=>{
            console.log(res);
            setRules(res.data[0])
        })
    },[])

const uploadForm = async () => {
    setLoding(true)
    if(!throttleClick){
        if(name.length==0){
            setLoding(false)
            toast.custom(<div className='bg-red p-2 rounded flex'> <AiFillInfoCircle className='mt-1 mr-1'/>Please add a name</div>,{icon:<AiFillInfoCircle/>,style: {}, duration: 2000,
            position: 'top-right', })
        }else if(category.length==0){
            setLoding(false)
            toast.custom(<div className='bg-red p-2 rounded flex'> <AiFillInfoCircle className='mt-1 mr-1'/>Please add a category</div>,{icon:<AiFillInfoCircle/>,style: {}, duration: 2000,
            position: 'top-right', }) 
        }else if(amount==null){
            setLoding(false)
            toast.custom(<div className='bg-red p-2 rounded flex'> <AiFillInfoCircle className='mt-1 mr-1'/>Please add a amount</div>,{icon:<AiFillInfoCircle/>,style: {}, duration: 2000,
            position: 'top-right', })
        }else if(image.length==0){
            setLoding(false)
            toast.custom(<div className='bg-red p-2 rounded flex'> <AiFillInfoCircle className='mt-1 mr-1'/>Please add images</div>,{icon:<AiFillInfoCircle/>,style: {}, duration: 2000,
            position: 'top-right', })
        }

        const data = new FormData()
        data.append('file', vdoFile)
        data.append("upload_preset", 'nefiqdoa')
        await axios.post(`https://api.cloudinary.com/v1_1/dyn6m4tou/video/upload`, data).then(async(res) => {
            setVideoUrl(res.data.secure_url)
           
            image.forEach( (element) => {
                const data = new FormData()
                data.append('file', element)
                data.append("upload_preset", 'nefiqdoa')
                 axios.post(`https://api.cloudinary.com/v1_1/dyn6m4tou/image/upload`, data).then((res) => {
                    imageArray.push(res.data.secure_url)

                    let details = {
                        token: document.cookie,
                        selectedDaates: selectedDaates,
                        name: name,
                        category: category,
                        amount: amount,
                        description: description,
                        imageArray: imageArray,
                        videoUrl: videoUrl
                    }
                        
                    axios.post(`${UURL}submitProgram`, details).then(result => {
                        if(result.data.Program){
                                setLoding(false)
                            navigate('/viewPrograms')
                        }else{
                            navigate('/addPrograms')
                        }
                    })
                
                })
            })             
          
        }).catch(err => console.log(err))

        setThrottleClick(true)
        setTimeout(() => {
            setThrottleClick(false);
          }, 1000);
    }
    }


    const vdoUpload = async (e) => {
        setVdoFile(e.target.files[0])
    }

    const imageUpload = async (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
        image.push( e.target.files[i])
            
        }
        

    }
    
    useEffect(()=>{
        loading ? toast.loading('Uploading program...'): null 
    },[loading])

    useEffect(() => {
        if(new Date(date) < new Date() && selectedDaates.length > 0){
           toast.custom(<div className='bg-red p-2 rounded flex'> <AiFillInfoCircle className='mt-1 mr-1'/>Can't take that date</div>,{icon:<AiFillInfoCircle/>,style: {}, duration: 2000,
           position: 'top-right', })
        }else{

            
            if (selectedDaates.length == 0) {
                setSelectedDates([...selectedDaates,  date])
                setMapDates([...mapDates, { date: date.toString().split(' '), key: Date.now() }])
            } else {
                new Promise((resolve, reject) => {
                    let set = {}
                    for (let i = 0; i < selectedDaates.length; i++) {
                        if (date.toISOString().slice(0, 10) == selectedDaates[i].toISOString().slice(0, 10)) {
                            set.set = true
                            break;
                        } else {
                            set.set = false
                        }
                        resolve(set)
                    }
                }).then((result) => {
                    if (result.set) {
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
                            title: "You have already selcted this date",
                  
                          })
                    } else {
                        setSelectedDates([...selectedDaates, date])
                        setMapDates([...mapDates, { date: date.toString().split(' '), key: Date.now() }])
                    }
                })
            }
        }
    }, [date])

    return (
        <>
            <div className='container-fluid' >
                <Toaster/>
                <div className="row bg-lightGreen p-4 text-black mb-4 mt-5">
                    <div className="col-md-3 d-flex justify-content-center mb-4  ">
                        <h6 style={{ fontSize: '20px' }} className='text-uppercase' >  Terms & Conditions</h6>
                    </div>
                    <div className="col-md-9  scroll-object ">
                        <p>{rules?.desc}</p>
             </div>
                </div>
            </div>

            <div className="container-fluid d-md-block d-none">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className='d-md-block d-none'>
                            <input type="text" className='  email w-max  border-darkGreen  border-4 rounded-lg bg-black mr-1 ' value={name} placeholder='Name Of The Program' onChange={(e) => { setName(e.target.value) }} />
                            <select name="" id="" className='email w-max  border-darkGreen mr-1  border-4 rounded-lg bg-black ' onClick={(e) => { setCategory(e.target.value) }}>
                                <option value="" style={{ display: 'none' }} >Choose Category</option>
                                <option value="Drama">Drama</option>
                                <option value="Skit">Skit</option>
                                <option value="Song">Song</option>
                                <option value="Mimicry">Mimicry</option>
                            </select>
                            <input type="number" className='  email w-max  border-darkGreen  border-4 rounded-lg bg-black mr-1 ' placeholder='Amount Per Show' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                        </div>
                    </div>


                    <div className="col-12  d-flex justify-content-center">
                        <input type="text" style={{ width: '717px' }} className=' mt-2  email   border-darkGreen  border-4 rounded-lg bg-black mr-1 ' placeholder='Description About Program' value={description} onChange={(e) => { setDescription(e.target.value) }} />

                    </div>
                    <div className="col-12   d-flex justify-content-center text-black">
                        <input type="file" style={{ width: '717px' }} className=' mt-2  email   border-darkGreen  border-4 rounded-lg bg-black mr-1 ' accept="image/*"  onChange={imageUpload} multiple/>
                        <div className='pos'>
                            <p className='upload-img text-white' >Upload Images</p>
                        </div>
                    </div>
                    <div className="col-12   d-flex justify-content-center ">
                        <input type="file" style={{ width: '717px' }} className=' mt-2  email text-black  border-darkGreen  border-4 rounded-lg bg-black mr-1 ' accept="video/*" onChange={vdoUpload} />
                        <div className='pos'>
                            <p className='upload-img text-white' >Upload Videos</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid d-md-none d-block">
                <div className="row">
                    <div className="col-12 ">
                        <input type="text" className=' m-1  email w-fill  border-darkGreen  border-4 rounded-lg bg-black  ' placeholder='Name Of The Program' onChange={(e) => { setName(e.target.value) }} /> <br />
                        <select name="" id="" className='email m-1 w-fill  border-darkGreen mr-1  border-4 rounded-lg bg-black ' onClick={(e) => { setCategory(e.target.value) }}>
                            <option value="" style={{ display: 'none' }}>Choose Category</option>
                            <option value="Drama">Drama</option>
                            <option value="Skit">Skit</option>
                            <option value="Song">Song</option>
                            <option value="Mimicry">Mimicry</option>
                        </select> <br />
                        <input type="number" className='  email w-fill  border-darkGreen  border-4 rounded-lg bg-black  m-1 ' placeholder='Amount Per Show' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                        <input type="text" className='   email   border-darkGreen  border-4 rounded-lg bg-black w-fill m-1 ' placeholder='Description About Program' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        <input type="file" className='   email   border-darkGreen  border-4 rounded-lg bg-black text-black m-1 w-fill ' accept="image/*" multiple onChange={imageUpload} />
                        <input type="file" className='   email   border-darkGreen  border-4 rounded-lg bg-black text-black m-1 w-fill ' accept="video/*" onChange={vdoUpload} />

                    </div>
                </div>
            </div>


            <div className="container mt-5 ">
                <div className="row  d-flex justify-content-center mb-3">
                    <div className='col-12 d-flex justify-content-center  '> Pick Busy Dates</div>
                    <Calendar onChange={setDate} value={date} />
                </div>
                <div className="col-12 mt-5 mb-2  d-flex justify-content-center  ">
                    <h1>Selected Dates</h1>
                </div>


                {
                    mapDates.map((dates) =>

                        <div className=' col-12  d-flex justify-content-center mb-3 p-1 rounded-md' key={dates.key}>
                            <p className=' flex  bg-darkGreen text-white hover:bg-darkGreen cursor-auto  justify-content-center col-11' style={{ width: '200px' }}> {dates.date[0]}   {dates.date[1]}  {dates.date[2]}  {dates.date[3]} <div className='flex justify-content-end col-1'> <IoIosRemoveCircle className="mt-1 ml-1 cursor-pointer " /></div></p>
                        </div>
                    )
                }
                <div className='d-flex justify-content-center mt-5 mb-3'>
                    <button className='btn bg-darkGreen text-white hover:bg-red' onClick={loading ? null : uploadForm}>Upload Program</button>
                </div>

            </div>
        </>
    )
}

export default AddProgramform