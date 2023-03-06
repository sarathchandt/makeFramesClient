import React from 'react'
import './Footer.css'
import {useSelector} from 'react-redux'



function Footer() {

const fetchUser = useSelector(state=>state.userFetch)
let is_loggedIn = useSelector(state => state.loggedInUser.loggedIn);


    return (
        <>
            <div className={ '  bg-darkGreen flex mt-10 justify-center'}>
                <div className='container  grid  md:grid-cols-2 '>

                    <div className='bg-darkGreen  w-full footer hidden md:block '>

                        <div className='flex flex-nowrap p-2  justify-center item-center foot'>
                            <p className='flex green  font-bold ' >Make</p>
                            <p className='red  font-bold ' >frames</p>
                        </div>
                    </div>

                    <div className='bg-darkGreen   '>
                        <div className='flex '>
                            <div className='line hidden md:block '></div>

                            <div className='bg-darkGreen  w-full footer block md:hidden '>

                                <div className='flex flex-nowrap p-2  justify-center item-center foot'>
                                    <p className='flex green  font-bold ' >Make</p>
                                    <p className='red  font-bold ' >frames</p>
                                </div>
                            </div>
                            <div className='flex flex-nowrap p-2 mt-20'>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quaerat ab, eligendi accusamus illum esse dicta nemo vitae fuga nulla, libero porro natus harum perspiciatis, amet voluptatum vero nobis Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis accusamus eligendi inventore vero, reiciendis enim ad quis! Magnam, ut in asperiores, commodi provident dolor a minima corporis, velit eius quibusdam. </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer