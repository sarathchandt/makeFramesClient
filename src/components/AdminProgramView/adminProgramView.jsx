import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UARL } from '../../../API/apiCall'
import {BsSearch} from '@react-icons/all-files/bs/BsSearch'

function adminProgramView() {

    const [tableDetails, setTableDetails] = useState([])
    const [search, setSearch] = useState('')


    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `admin ${token}` };


    
    function takeUser() {
        axios.post(`${UARL}takeProgramByRegex`, { name: search ,from:'producer' }).then(res => {
            setTableDetails(res.data)
        })

    }

    useEffect(() => {
        axios.get(`${UARL}fetchDetailsOfProgram`, { headers }).then(res => {
            setTableDetails(res.data)
        })
    }, [])

    
    function unBlockIt(id){
        axios.post(`${UARL}unBlockIt`,{userId:id}).then(res=>{
            if(res.data.unBlocked) takeUser()
        })
    }

    function blockIt(id){
        axios.post(`${UARL}blockIt`,{userId:id}).then(res=>{
            if(res.data.blocked) takeUser()
        })
    }


  return (
    <div className='p-5  container-fluid'>
    <div className="row">
        <div className="col-12 d-flex justify-content-end mt-4  ">
            <input type="text" className='m-3 email w-max border-darkGreen  border-4 rounded-lg bg-white text-black ' value={search} placeholder='Search Programs' onChange={(e)=>{setSearch(e.target.value)}}  />
            <div className='   mt-3  ' onClick={() => { takeUser() }} > <div className='text-xl cursor-pointer bg-darkGreen p-3 rounded'> <BsSearch className=''/></div></div>
        </div>
        <div className="col-12 p-5">


            <table class="w-full border-collapse border border-slate-500  text-gray-700">
                <thead>
                    <tr>
                        <th className="text-start text-2xl text-green border border-slate-600">Name</th>
                        <th className="text-start text-2xl text-green border border-slate-600">Hosted By</th>
                        <th className="text-start text-2xl text-green border border-slate-600">Hoster E-mail</th>
                        <th className="text-start text-2xl text-green border border-slate-600">Amount</th>
                        <th className="text-center text-2xl text-green border border-slate-600">Handle</th>
                    </tr>
                </thead>

                <tbody>
                    {tableDetails.map(element => {
                        return <>
                            <tr >
                                <td className="text-start text-white ml-3 border border-slate-600" >{element?.name}</td>
                                <td className="text-start  text-white ml-3 border border-slate-600" >{element?.user?.firstName}</td>
                                <td className="text-start  text-white ml-3 border border-slate-600" >{element?.user?.email}</td>
                                <td className="text-start  text-white ml-3 border border-slate-600" >{element?.amount} /-</td>
                                <td className="text-center text-white ml-3 border border-slate-600 cursor-pointer" onClick={()=>{element?.isBlocked ? unBlockIt(element._id) :blockIt(element._id)}} >  { element?.isBlocked ?<p className=' p-1 bg-green text-white'>Unblock</p> :<p className=' p-1 bg-red text-white'>Block</p>} </td>
                            </tr>
                        </>
                    })
                    }
                </tbody>
            </table>
        </div>
    </div>

</div>
  )
}

export default adminProgramView