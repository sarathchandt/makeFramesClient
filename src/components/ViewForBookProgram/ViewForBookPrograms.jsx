import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProgramForBooking } from '../../../slices/bringAllProgram.mjs'
import { FaSearch } from '@react-icons/all-files/fa/FaSearch.esm'
import { useNavigate,createSearchParams } from 'react-router-dom'


function ViewForBookPrograms() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allPosts = useSelector(state => state.bringAllProgram)
  console.log(allPosts.programs.data);
  useEffect(() => {
    dispatch(fetchAllProgramForBooking())
  }, [])

 function viewProgramDetails(id){
    navigate({
      pathname:'/viewProgramDetails',
      search: createSearchParams({
        id: id
      }).toString()
    })
  }

  return (
    <div className='container-fluid'>
      {allPosts.loading ? <div>loading..</div> :
        <>
          <div className="row">
            <div className="col-12 d-flex justify-content-end">

              <select name="" id="" className='email m-1 w-max  border-darkGreen mr-1  border-4 rounded-lg bg-black ' onClick={(e) => { setCategory(e.target.value) }}>
                <option value="" style={{ display: 'none' }}>Choose Category</option>
                <option value="Drama">Drama</option>
                <option value="Skit">Skit</option>
                <option value="Song">Song</option>
                <option value="Mimicry">Mimicry</option>
              </select>
              <div className='d-flex justify-content-center bg-darkGreen rounded m-1' style={{ width: '50px', height: '50px' }}><FaSearch style={{ marginTop: '16px' }} /></div>
            </div>
           
          </div>
          <div className="row">
            <div className=' col-md-2'></div>
            <div className=' col-md-8'>
              <div className="container-fluid">
                <div className="row ">
              
                  {allPosts.loading ? <></> : allPosts.programs?.data.map(obj => {
                    return <div className=" col-lg-3 col-md-4  col-6 mt-3">
                      <div className=' bg-dark1 m-1 rounded  ' style={{ width: '100%', height: "100%" }}  >
                        
                        <img src={obj.imageArray?.length==0?'../../public/images/image-asset.jpeg':obj.imageArray[0]} alt="" className='object-cover pt-3 pe-3 ps-3' style={{ aspectRatio: '1 / 1' }} />
                        <p className='d-flex justify-content-center text-light text-uppercase text-break font-extrabold m-1 p-3' style={{height:'50px',fontSize:'75%'}} >{obj.name}</p>
                        <p className='d-flex justify-content-center cursor-pointer btn bg-darkGreen text-white1 m-3 hover:bg-red 'onClick={()=>{viewProgramDetails(obj._id)}}>View</p>
                      </div>

                    </div>
                  })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='d-md-block d-none col-2'></div>
        </>
      }

    </div >
  )
}

export default ViewForBookPrograms