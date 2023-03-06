import React, { useRef } from 'react'
import './ProfileHeader.css'

function profileHeader() {

    return (
        <div>
            <div className='flex flex-nowrap p-2'>
                <p className='green  font-bold' >Make</p>
                <p className='red  font-bold' >frames</p>

                <div className='flex  details ' style={{ color: "#3C6255" }} id="navitems" >
                    <p className='pl-8 text-sm cursor   hover:text-red' onClick={() => {
                        navigate("/")
                    }}>Home</p>
                    <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
                        navigate("/")
                    }}>Add post</p>
                    <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
                        navigate("/")
                    }}>Settings</p>

                </div>
            </div>
            <div className='details toggle'>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
            </div>
            <div className="container mt-10"  >
                <div className="row">
                <div className='col-md-3' >
                        <img src="../../../public/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png" className='rounded-full' alt="" />
            
                </div>
                <div className='col-md-9' ></div>
            </div>
            </div>
        </div>
    )
}

export default profileHeader