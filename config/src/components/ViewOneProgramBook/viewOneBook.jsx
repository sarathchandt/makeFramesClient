import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { fetchOneProgram } from '../../../slices/fetchProgramForBook.mjs'
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import toast,{ Toaster } from 'react-hot-toast'

import {bookedFunction} from '../../../slices/bookProgram.mjs'
import {unBook} from '../../../slices/bookProgram.mjs'

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MdDescription } from '@react-icons/all-files/md/MdDescription.esm'
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt.esm'
import { MdVideoLabel } from '@react-icons/all-files/Md/MdVideoLabel.esm'
import { HiCurrencyRupee } from '@react-icons/all-files/hi/HiCurrencyRupee.esm'
import './viewOneBook.css'
import axios from 'axios';
import { UURL } from '../../../API/apiCall.js';

function viewOneBook() {

    const [events, setEvent] = useState([])
    const [viewport, setViewport] = useState({});
    const [mark, setMark] = useState({})
    const [name, setName] = useState([])
    const [unequeCall, setUnequeCall] = useState(true)
    const [minDate, setMinDate] = useState("");
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');
    const [mob, setMob] = useState()


    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const fetchedPg = useSelector(state => state.fetchOnePg)
    const localizer = momentLocalizer(moment);

    const navigate = useNavigate()
    const book = useSelector(state=>state.booked)

    useEffect(()=>{
        book.booked?navigate('/viewBookedProgram'):null;
        dispatch(unBook())
    },[book.booked])

    function checkValid(date){
        let flag=true;
        console.log(events[1].start);
        

        for(let i=0; i< events.length;i++){
            let year= events[i].start.getFullYear()
            let month = events[i].start.getMonth()+1
            let day = events[i].start.getDate()
            console.log( Date.now(`${year}-${month}-${day}`)==Date.now(date));


          if(new Date(date)== new Date(`${year}-${month}-${day}`)){
              flag = true 

              break;
          }else{

              flag = false
          }
        }
        if(flag){
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
                title: "can't choose that date",
              })
        }
    }

    function repeatDate(date){
        let flag;
      for(let i=0; i< events.length;i++){
        if(new Date(date)==new Date(events[i])){
            flag = false 
            break;
        }else{
            flag = true
        }
      }
      return flag
    }

    function bookProgram(){
        if(!date){
            toast.error('Please select a name',{
                duration: 4000,
                position: 'top-center'
               })
        }else if(new Date(date) < new Date() ){
            toast.error("Can't choose that date",{
                duration: 4000,
                position: 'top-center'
               })
        }
        
        else if(!time){
            
            toast.error('Please Provide a time',{
                duration: 4000,
                position: 'top-center'
               })
        }else if(address.length < 20 ){
            
            toast.error('Please Provide a valid address',{
                duration: 4000,
                position: 'top-center'
               })
        }else if(10 !==  Number(Math.log(mob) * Math.LOG10E + 1 | 0)){
           toast.error('Please Provide a valid number',{
            duration: 4000,
            position: 'top-center'
           })
        }else{
            if(unequeCall){
                setUnequeCall(false)
                const  bookingDetails={
                    program_id:fetchedPg.program.data._id,
                    date:date,
                    time:time,
                    address:address,
                    mob:mob,
                    mark:mark,
                    currentLocation:viewport,
                    token:document.cookie,
                    hostedUser:name?.data?._id
    
                }
                dispatch(bookedFunction(bookingDetails))
                setTimeout(()=>{
                setUnequeCall(true)
                },1000)
            }
         
        }
    }

    

    useEffect(() => {

        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
        
        navigator.geolocation.getCurrentPosition((pos) => {

            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 3.5,
            })

        })
    }, [])

    function putSetMark(e) {

        setMark({
            ...mark,
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng,
            zoom: 3.5,
        })
    }

    useEffect(() => {
        fetchedPg.program.data?.selectedDaates.forEach(item => {
            events.push({
                title: 'Event ',
                start: new Date(item),
                end: new Date(item),
                allDay: true,
            })
            fetchedPg.loading ? setEvent([]) : null;
        })
    }, [fetchedPg.loading])
    console.log(fetchedPg,"pg");
    
    useEffect(() => {
        dispatch(fetchOneProgram(searchParams.get('id')))
        axios.post(`${UURL}loginCheck`, { token: document.cookie }).then(result => {
            setName(result)
        })

    }, [])
    return (
        <div>
            <Toaster/>
            {book.loading? <div>
                <video src="../../../public/videos/loading-dot.mp4" />
            </div>: <>
            {
                fetchedPg.loading && viewport.latitude && viewport.longitude ? <><video src="../../../public/videos/loading-dot.mp4" autoPlay loop /></> : viewport.latitude && viewport.longitude && (
                    <>

                        <div className="container-fluid mt-5">
                            <div className=" d-flex justify-content-center row">
                                <div className="col-12 bg-dark1 m-1 rounded  border-b-4 border-green" style={{ width: '90%', minHeight: '150px' }}>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-10 mb-3">
                                                <h6 className='text-breaknn text-uppercase text-white mt-3 font-extralight ' style={{ fontSize: '140%' }}>{fetchedPg.program.data.name}</h6>
                                            </div>
                                            <div className="col-2 d-flex justify-content-end">
                                                <h6 className='text-breaknn text-uppercase text-red mt-3 font-bold ' >{fetchedPg.program.data.category}</h6>

                                            </div>
                                            <div className="col-1 d-flex justify-content-end mb-3">
                                                <MdDescription className='mt-1 text-green' />
                                            </div>
                                            <div className=" scroll-object col-11 mb-3" style={{ height: '90px' }}>
                                                <p>{fetchedPg.program.data.description}</p>
                                                </div>
                                            <div className="col-1 d-flex justify-content-end ">
                                                <FaUserAlt className='mt-1 text-green' />
                                            </div>
                                            <div className="  col-5 " >
                                                <p>{fetchedPg?.program?.data?.user?.firstName} {fetchedPg?.program?.data?.user?.lastName}</p>
                                            </div>
                                            <div className='col-6 d-flex justify-content-end' >
                                                <button className= 'd-md-block d-none btn bg-green text-white hover:bg-green'>Visit {fetchedPg?.program?.data?.user?.firstName}'s profile</button>
                                                <button className='d-md-none d-block btn bg-green text-white hover:bg-green text-xs'>Visit {fetchedPg?.program?.data?.user?.firstName}'s profile</button>

                                            </div>
                                            <div className="col-1 d-flex justify-content-end">
                                                <MdVideoLabel className='mt-1 text-green' />
                                            </div>
                                            <div className="col-11">
                                                Files
                                                <div className="  p-3 m-1 cursor-pointer rounded flex scrollEffect">
                                                    <video src={fetchedPg.program.data.vdoFile} className='rounded-lg object-cover' style={{ width: '100%',height:'100px'}} ></video>
                                                    {fetchedPg.loading ? <><video src="../../../public/videos/loading-dot.mp4" loop autoPlay /></> : fetchedPg.program.data?.imageArray.map(obj => {
                                                        return <>
                                                            <img src={obj} alt="img" className='rounded-lg  object-cover m-1' style={{ width:'100%' ,height:'100px'}} />
                                                        </>
                                                    })
                                                    }
                                                </div>
                                               
                                            </div>
                                            <div className="col-12 mt-3 text-red mb-4 flex justify-content-end">
                                            <b className='flex'><HiCurrencyRupee className='text-green text-lg mt-1 me-2'  />{fetchedPg.program.data.amount.toLocaleString()}</b>/- Per program
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-6 d-flex justify-content-center mt-5 ">
                                    <Calendar
                                        onSelectEvent={event => alert(event.title)}
                                        localizer={localizer}
                                        defaultDate={new Date()}
                                        events={events}
                                        defaultView="month"
                                        style={{ height: "400px", width: '100%' }}
                                    />

                                </div>
                                <div className="col-md-3"></div>
                                <div className='col-12 d-flex justify-content-center mt-2' ><div className='text-red  me-1 bg-red rounded' style={{ width: '25px', height: '25px' }}></div>The artist is busy at marked dates</div>
                                <div className="col-md-3"></div>
                                <div className="col-md-6 bg-darkGreen gb-opacity-1 mt-5 rounded">
                                    <div className='d-flex justify-content-center'>
                                        <h1 className='mt-2 text-bold' style={{ fontSize: '20px' }}>Fill the form to book</h1><br />
                                    </div>
                                    <div className='d-flex justify-content-center mt-4'>
                                        <label htmlFor="date">Select Date</label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <input type="date" min={minDate} className='ms-3 me-3 mb-3 email w-fill text-black  border-4 rounded-lg bg-lightGreen ' value={date} onChange={(e)=>{setDate(e.target.value);checkValid(date)}} />
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <label htmlFor="date">Select Time</label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <input type="time" className='ms-3 me-3 mb-3 email w-fill text-black   border-4 rounded-lg bg-lightGreen  'value={time} onChange={(e)=>{setTime(e.target.value)}}  />
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <label htmlFor="date">Full address of the stage</label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <input type="text" className='ms-3 me-3 mb-3 email w-fill text-black  border-4 rounded-lg bg-lightGreen  ' value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <label htmlFor="date">Share the stage location</label>
                                    </div>
                                    <div className='d-flex justify-content-center ' >
                                        <div className='ps-4 pe-4 pb-4 rounded' style={{ width: '100%', height: '300px' }}>
                                            <Map

                                                mapboxAccessToken= {import.meta.env.VITE_mapApi}
                                                initialViewState={viewport}
                                                mapStyle="mapbox://styles/mapbox/streets-v11"
                                                onClick={(e) => { putSetMark(e) }}
                                            >
                                               
                                                <Marker
                                                    latitude={mark.latitude ? mark.latitude : viewport.latitude}
                                                    longitude={mark.longitude ? mark.longitude : viewport.longitude} />

                                                <GeolocateControl
                                                    positionOptions={{ enableHighAccuracy: true }}
                                                    trackUserLocation={true}
                                                />
                                            </Map>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <label htmlFor="date">Mobile number</label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <input type="number" className='ms-3 me-3 mb-3 email w-fill text-black  border-4 rounded-lg bg-lightGreen  ' value={mob} onChange={(e)=>{setMob(e.target.value)}} />
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <button className='btn bg-green hover:bg-red text-white mb-5' onClick={()=>{bookProgram()}}>Book now</button>
                                    </div>

                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
        }


        </div>
    )
}

export default viewOneBook