import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import { fetchUserData } from '../../../slices/profileViewUser.mjs'
import { fetchPostsOfUser } from '../../../slices/fetchUserPost.mjs'

import { BsImages } from '@react-icons/all-files/bs/BsImages.esm'
import { BsFillCalendarFill } from '@react-icons/all-files/bs/BsFillCalendarFill.esm'

import './userProfilePage.css'
import axios from 'axios';
import { UURL } from '../../../API/apiCall.js';

function userProfilePage() {

    const [event, setEvent] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [hype, setHype]=useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.fetchUserData)
    const post = useSelector(state => state.fetchPostsOfUser)
    useEffect(() => {
        dispatch(fetchUserData(searchParams.get('profile_id')))
        dispatch(fetchPostsOfUser(searchParams.get('profile_id')))
        const token = localStorage.getItem('usertoken');
        const headers = { Authorization: `Bearer ${token}` };

        axios.post(`${UURL}takeHypeStatus`, { userId: searchParams.get('profile_id') },{headers}).then(res=>{
                setHype(res.data.hype)
                console.log(res,"hhh");

        })
    }, [])

    function hypeHim() {
        let token = localStorage.getItem('usertoken')
        const headers = { Authorization: `Bearer ${token}` };

        axios.post(`${UURL}hypeHim`, { userId: searchParams.get('profile_id') }, { headers }).then(() => {
            dispatch(fetchUserData(searchParams.get('profile_id')))
            axios.post(`${UURL}takeHypeStatus`, { userId: searchParams.get('profile_id') },{headers}).then(res=>{
                console.log(res,"hhh");
                setHype(res.data.hype)
                
        })
        })
    }
    function unHypeHim(){
        const token = localStorage.getItem('usertoken');
        const headers = { Authorization: `Bearer ${token}` };

        axios.post(`${UURL}unHypeHim`, { userId: searchParams.get('profile_id') }, { headers }).then(() => {
            dispatch(fetchUserData(searchParams.get('profile_id')))
            axios.post(`${UURL}takeHypeStatus`, { userId: searchParams.get('profile_id') },{headers}).then(res=>{
                setHype(res.data.hype)
                
        })
        })
    }

   

    function goToChat(userId) {
        navigate({
            pathname: '/ChatUserBox',
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-md-3 ">
                        <div class="container d-flex justify-content-center align-items-center  ">
                            <div class="card bg-dark relative " style={{ width: '200px' }}>
                                <div class="upper bg-darkGreen w-full h-20 relative">
                                </div>
                                <div className=' absolute  top-4 ' style={{ right: '38px' }}>
                                    <div class="user text-center d-flex justify-content-center relative ">
                                        <div class="stats absolute bg-red rounded  p-1" style={{ right: '-12px' }}>
                                            <h6 class="mb-0 text-xs">{user?.userDetails?.data?.hype.length} Hypes</h6>
                                        </div>
                                        <img src={user?.userDetails?.data?.dpimage ? user?.userDetails?.data?.dpimage : '/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png '} className='rounded-circle object-cover' alt="" style={{ width: '120px', aspectRatio: '1/1' }} />
                                    </div>
                                </div>
                                <div class="mt-5 text-center">
                                    <h4 class="mt-3">{user?.userDetails?.data?.firstName}</h4>
                                    <button class="btn text-white btn-sm follow  mt-3 bg-darkGreen hover:bg-darkGreen w-11/12" onClick={() => { goToChat(user?.userDetails?.data?._id) }}>Message</button><br />
                                    {hype ? <button class="btn text-white btn-sm follow w-11/12 mt-1 mb-4 bg-red hover:bg-red" onClick={() => { unHypeHim() }}>Remove Hype</button> :
                                    <button class="btn text-white btn-sm follow w-11/12 mt-1 mb-4 bg-red hover:bg-red" onClick={() => { hypeHim() }}>Give Hype </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 d-flex justify-content-md-start justify-content-center  mt-md-0 mt-5">
                        <div className=' bg-dark w-11/12 rounded  pt-5 pb-5'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6  d-flex justify-content-end  p-2  bg-darkGreen"><BsImages className={event ? 'ml-2 text-green cursor-pointer' : 'ml-2 cursor-pointer text-red'} onClick={() => { setEvent(false) }} /></div>
                                    <div className="col-6  d-flex justify-content-start  p-2 bg-darkGreen "><BsFillCalendarFill className={event ? 'ml-2 cursor-pointer text-red' : 'cursor-pointer ml-2 text-green'} onClick={() => { setEvent(true) }} /></div>
                                    {event ?
                                        <div className='text-center'> <p className='text-green mt-5'> no event</p></div> :
                                        <div className="col-12 scroll-object   " style={{ minHeight: '500px' }}>
                                            <div className="container-fluid">
                                                <div className="row mt-2">
                                                    <div className="col-md-3"> </div>
                                                    <div className="col-md-6">
                                                        {post.posts?.data?.length == 0 ? <div className='text-center'> <p className='text-green mt-5'> no post</p></div> :
                                                            <> {
                                                                post.loading ? <div></div> :
                                                                    <div className='container-fluid'>
                                                                        <div className='row '>
                                                                            {post.posts?.data?.map(obj => {
                                                                                return <>
                                                                                    <div className=' col-12 mt-5' >
                                                                                        <img className=' object-cover  m-2  cursor ' style={{ aspectRatio: '1 / 1' }} src={obj?.images[0]} alt="" />
                                                                                    </div>
                                                                                    <h1 className='ms-2'>{user?.userDetails?.data?.firstName} : {obj?.coments}</h1>
                                                                                </>
                                                                            }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                            }
                                                            </>
                                                        }

                                                    </div>
                                                    <div className="col-md-3">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default userProfilePage