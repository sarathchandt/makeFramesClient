import React from 'react'
import './Footer.css'
import { useSelector } from 'react-redux'



function Footer() {

    const fetchUser = useSelector(state => state.userFetch)
    let is_loggedIn = useSelector(state => state.loggedInUser.loggedIn);


    return (
        <>
               <div className={'  bg-darkGreen flex mt-10 justify-center'}>
                <div className='container  '>
                    <div className="row">
                        <div className="col-12">
                            <div className='bg-darkGreen  w-full footer hidden md:block '>

                                <div className='flex mt-4  justify-center '>
                                    <p className='flex green  font-bold ' >Make</p>
                                    <p className='red  font-bold ' >frames</p>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <p className='text-green'>&copy;All rights holding by makeframes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer