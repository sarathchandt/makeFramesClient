import React, {useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './landingHome.css'
import {Bar} from 'react-chartjs-2'
import {Line} from 'react-chartjs-2'

import {Chart as ChartJS} from 'chart.js/auto'


import { BsFillBookmarkFill } from '@react-icons/all-files/bs/BsFillBookmarkFill'
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser"
import { BsBrush } from '@react-icons/all-files/bs/BsBrush'
import { FaMoneyBillAlt } from '@react-icons/all-files/fa/FaMoneyBillAlt'
import {graphFetchForUser} from '../../../slices/graphGrowthSlice.mjs'
import {fetchBookingGraph} from '../../../slices/bookingGraph.mjs'
import {fetchDetails} from '../../../slices/takeTotalDetails.mjs'
import axios from 'axios'
import { UARL } from '../../../API/apiCall'





function adminLanding() {


    // const [details,setDetails] =useState
    const useGraph = useSelector(state=>state.graph)
    const bookingGraph = useSelector(state=>state.bookingGraph)
    const details = useSelector(state=>state.details)
    const navigate =  useNavigate()
    const [graphBooking, setGraphBooking] = useState({ 
         labels:bookingGraph?.bookingGraph?.data?.map(element=>element?.month),
        datasets:[{
            label:'Booking Growth', 
            data: bookingGraph?.bookingGraph?.data?.map(element=>element?.count),
            backgroundColor:['darkgreen'],
            color:['white'],
            borderColor:'white',
            borderWidth:1,
            width:7

        }]})
    const [graphUser, setGraphUser]=useState({
        labels:useGraph?.graphDetails?.data?.map(element=>element?.month),
        datasets:[{
            label:'User Growth',
            data: useGraph?.graphDetails?.data?.map(element=>element?.count),
            backgroundColor:['darkgreen'],  
            color:['white'],
            borderColor:'white',
            borderWidth:1,
            width:7

        }]
    })
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(fetchDetails())
        dispatch(graphFetchForUser())
        dispatch(fetchBookingGraph())


    },[])
    console.log(details);
   

    useEffect(()=>{
        setGraphBooking({
            labels:bookingGraph?.bookingGraph?.data?.map(element=>element?.month),
            datasets:[{
                label:'Booking Growth', 
                data: bookingGraph?.bookingGraph?.data?.map(element=>element?.count),
                backgroundColor:['darkgreen'],
                color:['white'],
                borderColor:'white',
                borderWidth:1,
                width:7
    
            }]
        })
        setGraphUser({
            labels:useGraph?.graphDetails?.data?.map(element=>element?.month),
            datasets:[{
                label:'User Growth',
                data: useGraph?.graphDetails?.data?.map(element=>element?.count),
                backgroundColor:['darkgreen'],  
                color:['white'],
                borderColor:'white',
                borderWidth:1,
                width:7
    
            }]
        })
    },[graphUser?.graphDetails, bookingGraph?.bookingGraph])

    return (
        <div>

            {/*  */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">


                        <div id="dash-content" class="bg-lightGreen py-6 lg:py-0 w-full lg:max-w-sm flex flex-wrap content-start m-5 p-5" style={{height:'100%'}}>

                            <div class="w-1/2 lg:w-full">
                                <div class="border-2 border-gray-400 border-dashed border-transparent bg-white shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                    <div class="flex flex-col items-center">
                                        <div class="flex-shrink ">
                                            <div class="rounded-full p-3 bg-gray-300 "><BsFillBookmarkFill className='text-white text-2xl' /></div>
                                        </div>
                                        <div class="flex-1 text-center">
                                            <h3 class="font-bold text-gray-500 text-1xl mt-2"> <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                                            <h5 class="font-bold text-gray-500 mt-2">Total Booking</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w-1/2 lg:w-full">
                                <div class="border-2 border-gray-400 border-dashed border-transparent bg-white shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                    <div class="flex flex-col items-center">
                                        <div class="flex-shrink ">
                                            <div class="rounded-full p-3 bg-gray-300 "><AiOutlineUser className='text-white text-2xl' /></div>
                                        </div>
                                        <div class="flex-1 text-center">
                                            <h3 class="font-bold text-gray-500 text-1xl mt-2"> <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                                            <h5 class="font-bold text-gray-500 mt-2">Total Users</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w-1/2 lg:w-full">
                                <div class="border-2 border-gray-400 border-dashed border-transparent bg-white shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                    <div class="flex flex-col items-center">
                                        <div class="flex-shrink ">
                                            <div class="rounded-full p-3 bg-gray-300 "><BsBrush className='text-white text-2xl' /></div>
                                        </div>
                                        <div class="flex-1 text-center">
                                            <h3 class="font-bold text-gray-500 text-1xl mt-2"> <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                                            <h5 class="font-bold text-gray-500 mt-2">Total Artists</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w-1/2 lg:w-full">
                                <div class="border-2 border-gray-400 border-dashed border-transparent bg-white shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                    <div class="flex flex-col items-center">
                                        <div class="flex-shrink ">
                                            <div class="rounded-full p-3 bg-gray-300 "><FaMoneyBillAlt className='text-white text-2xl' /></div>
                                        </div>
                                        <div class="flex-1 text-center">
                                            <h3 class="font-bold text-gray-500 text-1xl mt-2"> <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                                            <h5 class="font-bold text-gray-500 mt-2">Total Producers</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ...............graph................ */}
                    <div className="col-md-8 pt-5 ">
                        <div className='mt-5 pt-5  bg-dark rounded w-11/12'>
                      { useGraph?.loading ==false && useGraph?.graphDetails?.data?.length > 0 ?  <Line data={graphUser} /> :<></> }
                      </div>
                      <div className='mt-5 pt-5  bg-dark rounded w-11/12'> 
                      { useGraph?.loading   ? <></> : <Bar data={graphBooking} /> }
                      </div>
                      <div>
                        
                      </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default adminLanding