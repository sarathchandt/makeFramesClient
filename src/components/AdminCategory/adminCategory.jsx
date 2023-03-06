import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UARL } from '../../../API/apiCall'
import './adminCate.css'

function adminCategory() {

    const [cate, setCate] = useState([])
    const [category, setCategory] = useState('')
    const [category1,setCategory1] = useState('')
    function addCategory(user, cate){
        axios.post(`${UARL}addCategory`,{cate:cate, user:user}).then((res)=>{
            if(res?.data?.cate==false){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    customClass: {
                      popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
          
                  Toast.fire({
                    icon: 'warning',
                    title: 'Category already exist',
          
                  })
            }
            if(res?.data?.length==false){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    customClass: {
                      popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
          
                  Toast.fire({
                    icon: 'warning',
                    title: 'Please add a valid category',
          
                  })
            }
            axios.get(`${UARL}takeCategory`).then(res => {
                setCate(res?.data)
            })
        })
    }
    function remove(id,indicator){
        axios.post(`${UARL}removeCate`,{id:id,indecator:indicator}).then(res=>{
            axios.get(`${UARL}takeCategory`).then(res => {
                setCate(res?.data)
            })
        })
    }

    useEffect(() => {
        axios.get(`${UARL}takeCategory`).then(res => {
            setCate(res?.data)
        })
    }, [])

    return (
        <div className='mt-5 pt-5'>
            <div className="container-fluid text-center  ">
                <div className="row ">
                    <div className="col-md-2"></div>
                    <div className="col-md-4 col-12 ">
                        <div className='w-11/12 rounded bg-dark p-2'>
                            <input type="text" className=' email w-10/12 border-darkGreen  border-4 rounded-lg bg-white text-black' placeholder="Add User's category" value={category} onChange={(e)=>{setCategory(e.target.value)}} />
                            <button className='1/12 p-2 rounded  ml-3 bg-darkGreen' onClick={()=>{addCategory(true,category); setCategory('')}}>Add</button>
                            
                                {cate.length > 0 && <table className="w-full mt-3 border-collapse border border-slate-500  text-gray-700  ">
                                    <thead>
                                        <tr>
                                            <th className='text-center text-xl text-green border border-slate-600'>Category</th>
                                            <th className='text-center text-xl text-green border border-slate-600'>Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cate?.map(e => {
                                            return <>
                                               {e.user==true && <tr className=''>
                                                    <td className='p-2 text-center text-md text-green border border-slate-600'>{e?.name}</td>
                                                    <td className='text-center text-md text-green border border-slate-600'><button className='bg-red btn' onClick={()=>{remove(e?._id,true)}}>Remove</button></td>
                                                </tr>}
                                            </>
                                        })}
                                    </tbody>
                                </table>}
                            

                        </div>
                    </div>
                    <div className="col-md-4 mt-4 mt-md-0">
                        <div className='w-11/12 rounded bg-dark p-2'>
                            <input type="text" value={category1} className=' email w-10/12 border-darkGreen  border-4 rounded-lg bg-white text-black' placeholder="Add Program's category" onChange={(e)=>{setCategory1(e.target.value)}}  />
                            <button className='1/12 p-2 rounded  ml-3 bg-darkGreen' onClick={()=>{addCategory(false,category1); setCategory1('')}}>Add</button>
                            {cate.length > 0 && <table className="w-full mt-3 border-collapse border border-slate-500  text-gray-700  ">
                                    <thead>
                                        <tr>
                                            <th className='text-center text-xl text-green border border-slate-600'>Category</th>
                                            <th className='text-center text-xl text-green border border-slate-600'>Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {  cate?.map(e => {
                                            return <>
                                                {e.user==false && <tr className=''>
                                                    <td className='p-2 text-center text-md text-green border border-slate-600'>{ e?.name}</td>
                                                    <td className='text-center text-md text-green border border-slate-600'><button className='bg-red btn' onClick={()=>{remove(e?._id,false)}}>Remove</button></td>
                                                </tr>}
                                            </>
                                        })}
                                    </tbody>
                                </table>}
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default adminCategory