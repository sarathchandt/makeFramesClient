import React from 'react'
import {useNavigate} from 'react-router-dom'


import { AiFillHome } from '@react-icons/all-files/ai/AiFillHome'
import { BsBrush } from '@react-icons/all-files/bs/BsBrush'
import { FaMoneyBillAlt } from '@react-icons/all-files/fa/FaMoneyBillAlt'
import { MdEventNote } from '@react-icons/all-files/md/MdEventNote'
import { BiIntersect } from '@react-icons/all-files/bi/BiIntersect'
import { MdDescription } from '@react-icons/all-files/md/MdDescription'
import { GiTatteredBanner } from '@react-icons/all-files/gi/GiTatteredBanner'



function adminSideBar() {

    const navigate = useNavigate()
    return (
        <div>
            <div id="sidebar" class="d-md-block d-none h-screen w-16 menu bg-darkGreen text-white px-4 flex items-center  static fixed shadow">

                <ul class="list-reset ">
                    <li class="my-2 md:my-0 flex mb-4">
                        <a class="block cursor-pointer py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400 mb-2" onClick={() => { navigate('/admin') }}>
                            <i className=""><AiFillHome className='text-white text-2xl' /></i><span class="w-full inline-block pb-1 md:pb-0 text-sm text-white">Home</span>
                        </a>
                    </li>
                    <li class="my-2 md:my-0 flex mb-4">
                        <a  class="block cursor-pointer py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400 mb-2" onClick={() => { navigate('/adminArtistList') }}>
                            <i className=""><BsBrush className='text-white text-2xl' /></i><span class="w-full inline-block pb-1 md:pb-0 text-sm text-white" >Artist</span>
                        </a>
                    </li>
                    <li class="my-2 md:my-0 flex mb-4">
                        <a  class="block  cursor-pointer py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400 mb-2" onClick={() => { navigate('/adminProducerList') }}>
                            <i className=""><FaMoneyBillAlt className='text-white text-2xl' /></i><span class="w-full inline-block pb-1 md:pb-0 text-sm text-white" >Producers</span>
                        </a>
                    </li>
                    <li class="my-2 md:my-0 flex mb-4">
                        <a  class="block cursor-pointer py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400 mb-2"  onClick={() => { navigate('/adminBookingList') }}>
                            <i className=""><MdEventNote className='text-white text-2xl' /></i><span class="w-full inline-block pb-1 md:pb-0 text-sm text-white" >Programs</span>
                        </a>
                    </li>
                    <li class="my-2 md:my-0 flex mb-4">
                        <a  class="block cursor-pointer py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400 mb-2" onClick={() => { navigate('/adminCategory') }}>
                            <i className=""><BiIntersect className='text-white text-2xl' /></i><span class="w-full inline-block pb-1 md:pb-0 text-sm text-white">Categories</span>
                        </a>
                    </li>
                    <li class="my-2 md:my-0 flex mb-4">
                        <a  class="block cursor-pointer py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400 mb-2" onClick={() => { navigate('/adminDescription') }}>
                            <i className=""><MdDescription className='text-white text-2xl' /></i><span class="w-full inline-block pb-1 md:pb-0 text-sm text-white" >Description</span>
                        </a>
                    </li>
                    <li class="my-2 md:my-0 flex mb-4">
                        <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400 mb-2">
                            <GiTatteredBanner className='text-white text-2xl' /><span class="w-full inline-block pb-1 md:pb-0 text-sm text-white">Banner</span>
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default adminSideBar