import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UARL } from '../../../API/apiCall'



function adminDescription() {

    const [descriptionList, setDescriptionList] = useState([])
    const [descri, setDecri] = useState('')
    function upload() {
        axios.post(`${UARL}uploadDecri`, { desc: descri }).then(() => {
            axios.get(`${UARL}takeDesc`).then((res) => {
                setDescriptionList(res?.data)
            })
        })
    }
    function changeDec(e){
        axios.post(`${UARL}change`,{id:e}).then(res=>{
            axios.get(`${UARL}takeDesc`).then((res) => {
                setDescriptionList(res?.data)
            })
        })
    }

    useEffect(() => {
        axios.get(`${UARL}takeDesc`).then((res) => {
            setDescriptionList(res?.data)
        })
    }, [])
    console.log(descriptionList);


    return (<>
        <div className='text-center mt-5 pt-5'>
            <p className='mb-4 text-lightGreen'>Add  rules & regulations for Add Programs</p>
            <textarea className='w-10/12 border-darkGreen  border-4 rounded-lg bg-dark text-white' placeholder='' cols="100" rows="10" value={descri} onChange={(e) => { setDecri(e.target.value) }}></textarea>
        </div>
        <div className="text-end">
            <p className='btn bg-green text-white hover:bg-green me-4' onClick={() => { upload(); setDecri('') }}>Upload</p>
        </div>
       
                    <div className=" text-center p-5 m-5">
                       <p className=' bg-dark rounded p-2'> {descriptionList[0]?.desc}</p>
                    </div>
              

      
    </>)
}

export default adminDescription