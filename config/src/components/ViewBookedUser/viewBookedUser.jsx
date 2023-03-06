import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookedPG } from '../../../slices/bookedDetailsFetch.mjs'

import {MdDateRange} from '@react-icons/all-files/md/MdDateRange.esm'
import {FcApproval} from '@react-icons/all-files/fc/FcApproval.esm'
import {HiLocationMarker} from '@react-icons/all-files/hi/HiLocationMarker.esm'



function viewBookedUser() {

    const [bookedPg,setBookedPg] = useState([])
    const fetchedPg = useSelector(state => state.fetchBooked)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBookedPG())
    }, [])

  

    useEffect(()=>{
        console.log(new Date());
    },[new Date()])
    


    return (
        <div >
            {fetchedPg.loading ? <div>loading</div> :

                <>
                    {fetchedPg.bookings?.data?.map(obj => {
                        return <>
                        <div className='d-flex justify-content-center'>
                            <div className="col-12 bg-dark1 m-1 rounded  border-b-4 border-green" style={{ width: '90%', minHeight: '50px' }}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-10 mb-3">
                                            <h6 className='text-breaknn text-uppercase text-white mt-3 font-extralight ' style={{ fontSize: '140%' }}>{obj?.program_id?.name}</h6>
                                        </div>
                                        <div className="col-2 d-flex justify-content-end">
                                            <h6 className='text-breaknn text-uppercase text-red mt-3 font-bold ' >{obj?.program_id?.category}</h6>

                                        </div>
                                        <div className="col-1 d-flex justify-content-end mb-3">
                                        < MdDateRange className='text-green text-2xl'/>
                                        </div>
                                        <div className="col-11 mb-3" >
                                            <p>{obj?.date}</p>
                                        </div>
                                        <div className="col-1 d-flex justify-content-end ">
                                            <FcApproval className='text-green text-2xl' />
                                        </div>
                                        <div className="  col-11 " >
                                        {obj?.isAccepted?<p>Accepted</p>: obj?.rejected ?<p className='text-red'> Rejected</p>:<p className='text-red'> Pending</p> }
                                        </div>
                                        
                                        <div className="col-1 mt-2 d-flex justify-content-end">
                                            <HiLocationMarker className='text-green text-2xl'/>
                                        </div>
                                        <div className="col-5 mt-2 text-break">{obj?.address}</div>
                                        
                                        <div className="d-flex justify-content-end col-6 mt-3 text-red mb-4 ">
                                            <b className='flex'>{obj?.program_id?.amount?.toLocaleString()}</b>/- Per program
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </>
                    })}
                </>

            }

        </div>
    )
}

export default viewBookedUser