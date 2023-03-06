import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrograms } from '../../../slices/Program.mjs'
import './viewProgram.css'
import axios from 'axios';
import { UURL } from '../../../API/apiCall.js';

function viewProgram() {

  const navigate = useNavigate()
  const programs = useSelector(state => state.fetchProgram)
  const dispatch = useDispatch()

  function gotoProgram(id,book,programName) {
        navigate({
          pathname: '/viewSingleProgram',
          search: createSearchParams({
            id: id,
            programName:programName
          }).toString()
        })
  }


  useEffect(() => {
    dispatch(fetchPrograms())
    axios.post(`${UURL}viewPrograms`, { token: document.cookie }).then(res => {
      res.data.length == 0 ? Swal.fire({
        title: 'OOPS !',
        text: 'Please add Programs',
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonText: 'Add Program',
        confirmButtonColor: '#021710'
      }).then(res => {
        res.isConfirmed == true ? navigate('/addPrograms') : navigate('/profetionalProfile');
      }) : console.log(true);
    })
  }, [])

console.log(programs.programs?.data);

  return (

    <div className='container-fluid'>
       {
           programs.loading ? <div>nothing</div> :
          <>
          <div className="row">
            <div className=' col-md-2'></div>
            <div className=' col-md-8'>
              <div className="container-fluid">
                <div className="row ">
                  {programs.loading ? <></> : programs.programs?.data.map(obj => {
                    return <div className=" col-lg-3 col-md-4  col-6 mt-3">
                      <div className=' bg-dark1 m-1 rounded relative ' style={{ width: '100%', height: "100%" }}  >
                        
                        <img src={obj.imageArray?.length==0?'../../public/images/image-asset.jpeg':obj.imageArray[0]} alt="" className='object-cover pt-3 pe-3 ps-3' style={{ aspectRatio: '1 / 1' }} />
                        <p className='d-flex justify-content-center text-light text-uppercase text-break font-extrabold m-1 p-3' style={{height:'50px',fontSize:'75%'}} >{obj.name}</p>
                        <p className='d-flex justify-content-center cursor-pointer btn bg-darkGreen text-white1 m-3 hover:bg-red 'onClick={()=>{gotoProgram (obj._id,obj?.bookingCount,obj?.name )}}  >View booking  </p>
                        <p className='d-flex justify-content-center cursor-pointer btn bg-darkGreen text-white1 m-3 hover:bg-red ' >Edit</p>
                        { obj?.bookingCount == 0? <></>:<p className='badge bg-red text-white absolute top-1 right-1 '>{obj?.bookingCount} Booking</p>}
                      </div>

                    </div>
                  })
                  }
                </div>
              </div>
            </div>
          </div>
          </>



      
}
    </div>


             

  )
}

export default viewProgram