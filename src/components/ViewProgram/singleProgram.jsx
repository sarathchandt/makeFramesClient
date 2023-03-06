import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom'
import axios from 'axios'
import { UURL } from '../../../API/apiCall.js'
import "mapbox-gl/dist/mapbox-gl.css";


import { MdRecentActors } from '@react-icons/all-files/md/MdRecentActors.esm'
import { BsClockHistory } from '@react-icons/all-files/bs/BsClockHistory.esm'
import { HiLocationMarker } from '@react-icons/all-files/hi/HiLocationMarker'
import { FaHandshake } from "@react-icons/all-files/fa/FaHandshake.esm"
import { SiGooglecalendar } from '@react-icons/all-files/si/SiGooglecalendar'
import { BsFillClockFill } from '@react-icons/all-files/bs/BsFillClockFill'
import { GiEmptyMetalBucketHandle } from '@react-icons/all-files/gi/GiEmptyMetalBucketHandle'
function SingleProgram() {

  const [searchParams] = useSearchParams()
  const [programName] = useState(searchParams.get('programName'))
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [indicator, setIndicator] = useState('pending')
  const [count, setCount] = useState(0)
  const [blur, setBlur] = useState(false)

  const navigate = useNavigate()

  function rejected(id) {
    setBlur(true)
    axios.post(`${UURL}rejectProgram`, { id: id }, { withCredentials: true }).then(result => {
      location.reload();

    })
  }

  function accepted(id) {
    setBlur(true)
    axios.post(`${UURL}acceptProgram`, { id: id }, { withCredentials: true }).then(result => {
      location.reload();
    })
  }


  useEffect(() => {
    setLoading(true)
    axios.post(`${UURL}checkBookingHost`, { id: searchParams.get('id') }, { withCredentials: true }).then(result => {
      setPrograms(result.data)

    })
    setLoading(false)
  }, [])







  return (
    <div>
      {loading ? <div><div className='loading  '>
          <div class="loader">
            <div class="loader-wheel"></div>
            <div class="loader-text"></div>
          </div>
        </div></div> : <>
        {blur && <div className='loading  '>
          <div class="loader">
            <div class="loader-wheel"></div>
            <div class="loader-text"></div>
          </div>
        </div>}
        <div className={blur ? "container-fluid blur" : "container-fluid "}>

          <div className="row mt-4 mb-2">
            <div className={indicator === 'pending' ? "col-4 bg-green  h-8 w-12/12 d-flex text-red justify-content-center" : "col-4 bg-green  h-8 w-12/12 d-flex justify-content-center"}>
              <MdRecentActors className='text-3xl cursor-pointer' onClick={() => { setIndicator('pending') }} /> <p className='mt-1 ms-1 cursor-pointer' onClick={() => { setIndicator('pending') }}> Pending</p>
            </div>
            <div className={indicator === 'history' ? "col-4 bg-green  h-8 w-12/12 d-flex text-red justify-content-center" : "col-4 bg-green  h-8 w-12/12 d-flex justify-content-center"}>
              <BsClockHistory className='text-2xl mt-1 cursor-pointer' onClick={() => { setIndicator('history') }} /><p className='mt-1 ms-1 cursor-pointer' onClick={() => { setIndicator('history') }}>History</p>
            </div>

            <div className={indicator === 'accept' ? "col-4 bg-green  h-8 w-12/12 d-flex text-red justify-content-center" : "col-4 bg-green  h-8 w-12/12 d-flex justify-content-center"}>
              <FaHandshake className='text-2xl mt-1  cursor-pointer' onClick={() => { setIndicator('accept') }} /><p className='mt-1 ms-1 cursor-pointer' onClick={() => { setIndicator('accept') }} >Accept</p>
            </div>
          </div>

          {indicator === 'pending' ?
            <div className="row d-flex justify-content-center mt-3" >
              <div className="col-12 w-11/12 bg-dark1 m-1 rounded ">
                <h6 className='text-3xl m-2 font-light '>{programName}</h6>

                {programs?.pend?.length == 0 ? <div className='container-fluid'>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center mt-5 mb-5">
                      <div className='text-green' >! No bookings found</div>
                    </div>
                  </div>
                </div> : <>
                  {programs?.pend?.map(obj => {
                    return <>
                      <div className="container-fluid">
                        <div className="row  d-flex justify-content-center mt-3">
                          <div className="col-12 w-11/12 bg-dark1 m-1 rounded  border-4  p-1 m-2 border-green">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="container-fluid">
                                    <div className="row m-1">
                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <HiLocationMarker className='text-3xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.address}
                                      </div>

                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <SiGooglecalendar className='text-2xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.date}
                                      </div>

                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <BsFillClockFill className='text-2xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.time}
                                      </div>

                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className='d-flex justify-content-end m-1'>
                                    <button className='btn bg-green text-white hover:bg-green  ' style={{ width: '200px' }} onClick={() => {
                                      navigate({
                                        pathname: '/viewMap',
                                        search: createSearchParams({
                                          lat: obj.mark.latitude,
                                          long: obj.mark.longitude,
                                        }).toString()
                                      })
                                    }}>View Stage Location</button>
                                  </div>
                                  <div className='d-flex justify-content-end m-1 '>
                                    <button className='btn bg-darkGreen text-white hover:bg-darkGreen  ' style={{ width: '200px' }} onClick={() => { accepted(obj._id) }} >Accept</button>
                                  </div>

                                  <div className='d-flex justify-content-end m-1 '>
                                    <button className='btn bg-red text-white hover:bg-red  ' style={{ width: '200px' }} onClick={() => { rejected(obj._id) }} >Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  })
                  }
                </>
                }

              </div>
            </div> : <></>
          }

          {indicator === 'history' ?
            <div className="row d-flex justify-content-center mt-3" >
              <div className="col-12 w-11/12 bg-dark1 m-1 rounded ">
                <h6 className='text-3xl m-2 font-light '>{programName}</h6>

                {programs?.his?.length == 0 ? <div className='container-fluid'>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center mt-5 mb-5">
                      <div className='text-green' >! No history</div>
                    </div>
                  </div>
                </div> : <>
                  {programs?.his?.map(obj => {
                    return <>
                      <div className="container-fluid">
                        <div className="row  d-flex justify-content-center mt-3">
                          <div className="col-12 w-11/12 bg-dark1 m-1 rounded  border-4  p-1 m-2 border-green">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="container-fluid">
                                    <div className="row m-1">
                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <HiLocationMarker className='text-3xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.address}
                                      </div>

                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <SiGooglecalendar className='text-2xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.date}
                                      </div>

                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <BsFillClockFill className='text-2xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.time}
                                      </div>

                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className='d-flex justify-content-end m-1'>
                                    <button className='btn bg-green text-white hover:bg-green  ' style={{ width: '200px' }} onClick={() => {
                                      navigate({
                                        pathname: '/viewMap',
                                        search: createSearchParams({
                                          lat: obj.mark.latitude,
                                          long: obj.mark.longitude,
                                        }).toString()
                                      })
                                    }}>View Stage Location</button>
                                  </div>
                            
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  })
                  }
                </>
                }

              </div>
            </div> : <></>
          }

          {indicator === 'accept' ?
            <div className="row d-flex justify-content-center mt-3" >
              <div className="col-12 w-11/12 bg-dark1 m-1 rounded ">
                <h6 className='text-3xl m-2 font-light '>{programName}</h6>

                {programs?.acc?.length == 0 ? <div className='container-fluid'>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center mt-5 mb-5">
                      <div className='text-green' >! Nothing accepted</div>
                    </div>
                  </div>
                </div> : <>
                  {programs?.acc?.map(obj => {
                    return <>
                      <div className="container-fluid">
                        <div className="row  d-flex justify-content-center mt-3">
                          <div className="col-12 w-11/12 bg-dark1 m-1 rounded  border-4  p-1 m-2 border-green">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="container-fluid">
                                    <div className="row m-1">
                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <HiLocationMarker className='text-3xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.address}
                                      </div>

                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <SiGooglecalendar className='text-2xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.date}
                                      </div>

                                      <div className="col-md-3 col-2 text-green d-flex justify-content-end mt-3 ">
                                        <BsFillClockFill className='text-2xl' />
                                      </div>
                                      <div className="col-md-9 col-10 text-break mt-3">
                                        {obj.time}
                                      </div>

                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className='d-flex justify-content-end m-1'>
                                    <button className='btn bg-green text-white hover:bg-green  ' style={{ width: '200px' }} onClick={() => {
                                      navigate({
                                        pathname: '/viewMap',
                                        search: createSearchParams({
                                          lat: obj.mark.latitude,
                                          long: obj.mark.longitude,
                                        }).toString()
                                      })
                                    }}>View Stage Location</button>
                                  </div>
                               

                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  })
                  }
                </>
                }

              </div>
            </div> : <></>
          }





        </div>
      </>}
    </div>

  )
}

export default SingleProgram