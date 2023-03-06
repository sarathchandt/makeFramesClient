import React, { useEffect, useState } from 'react'
import './landingHome.css'
import axios from 'axios'
import { UURL } from '../../../API/apiCall'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../../slices/fetchUserAccoutHome.mjs'
function LandingHome() {

  const [category, setCategory] = useState(['DIRECTOR','ACTOR','ACTRESS','MUSICIAN'])
  const dispatch = useDispatch()
  const usersAcc = useSelector(state => state.userFetch)
  let is_loggedIn = useSelector(state => state.loggedInUser.loggedIn);
  const [cate,setCate]=useState([])

  const navigate = useNavigate()


  useEffect(() => {
    axios.get(`${UURL}getDomain`, { withCredentials: true }).then(res => {
      setCate( res.data)

    })
    document.cookie ?
      dispatch(fetchUserDetails()) : null
  }, [])
  console.log(category);
  function goToProfile(id) {
    navigate({
      pathname: '/UserPageForProfile',
      search: createSearchParams({
        profile_id: id
      }).toString()
    })
  }



  return (
    <div  >
      {is_loggedIn ? <>
        {usersAcc.loading ? <div className='loading  '>
          <div class="loader">
            <div class="loader-wheel"></div>
            <div class="loader-text"></div>
          </div>
        </div> :
          <div>
            <div className={usersAcc.loading ? 'blur' : ''}>
              <img src="../../../public/images/heightstour123rnational-tour-company.jpg" className=' mt-5 object-fit w-full h-6/12 object-cover' alt="" />
            </div>
            <div className='d-flex justify-content-end'>
              <button className=' p-1 m-2 bg-green rounded hover:bg-red' onClick={() => { navigate('/viewStageProgramUser') }}>Book Stage Shows</button>
            </div>
            {category?.map(cate => {
              return <>
                <h1 className='m-2'>Top {cate}</h1>
                <div className=" flex scrollEffect" style={{ width: '100%' }}>
                  {
                    usersAcc?.users?.data.map(obj => {
                      return <>
                        {obj?.domain == `${cate}` ?
                          <div>
                            <div className='bg-dark m-2  rounded  w-40  '>
                              <img src={obj?.dpimage ? obj?.dpimage : '../../public/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png'} className='p-2 w-12/12  rounded-circle object-cover' style={{ aspectRatio: '1/1' }} alt="" />
                              <div className='d-flex justify-content-center'>
                                <p className=' text-xl'>{obj?.firstName}</p>
                              </div>
                              <div className='d-flex justify-content-center'>
                                <button className='btn bg-darkGreen text-white hover:bg-green mb-3 mt-1 ' onClick={() => { goToProfile(obj._id) }}>View profile</button>
                              </div>
                            </div>
                          </div> : <>
                            <div></div>
                          </>}
                      </>
                    })
                  }
                </div>
              </>
            })}
          </div>
        }
      </> : <>

        <div >
          <img src="../../../public/images/heightstour123rnational-tour-company.jpg" className=' mt-5 object-fit w-full h-6/12 object-cover' alt="" />
        </div>
        <div className='d-flex justify-content-end'>
          {/* <button className=' p-1 m-2 bg-green rounded hover:bg-red' onClick={() => { navigate('/viewStageProgramUser') }}>Book Stage Shows</button> */}
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-12 ">
              <div className="container-fluid w-11/12 bg-dark rounded ">
                <div className="row">
                  <div className="col-md-3 p-2 d-flex justify-content-md-end justify-content-center">
                    <img src="../../../public/images/7acf1151b20e13d73bddf2a8035f8011.jpg" alt="" className='object-cover' style={{ aspectRatio: '3/2' }} />
                  </div>
                  <div className="col-md-9 p-2 d-flex justify-content-md-start justify-content-center">
                    <p>Our website is the ultimate destination for anyone looking to find the perfect stage program. With a vast selection of programs spanning across a wide range of genres, we offer something for everyone. Whether you're looking for a music concert, a comedy show, a dance performance, or a theatrical production, we've got you covered. Our easy-to-use search function helps you filter through our extensive database, so you can quickly and easily find the program that best fits your preferences. With our comprehensive information and user reviews, you can be sure that you're getting the best possible experience. Trust us to help you find your next unforgettable stage program! <a href="" className='text-blue' onClick={() => { navigate('/login') }}>Please login for more </a> </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-12 ">
              <div className="container-fluid w-11/12 bg-dark rounded ">
                <div className="row">

                  <div className="col-md-9 p-2 d-flex justify-content-md-end justify-content-center">
                    <p>Our website is the ultimate destination for anyone looking to find the perfect stage program. With a vast selection of programs spanning across a wide range of genres, we offer something for everyone. Whether you're looking for a music concert, a comedy show, a dance performance, or a theatrical production, we've got you covered. Our easy-to-use search function helps you filter through our extensive database, so you can quickly and easily find the program that best fits your preferences. With our comprehensive information and user reviews, you can be sure that you're getting the best possible experience. Trust us to help you find your next unforgettable stage program! <a href="" className='text-blue' onClick={() => { navigate('/login') }}>Please login for more </a></p>
                  </div>
                  <div className="col-md-3 p-2 d-flex justify-content-md-start justify-content-center">
                    <img src="../../../public/images/bc802ebe22166f5dee0de54e07b1a91a.jpg" alt="" className='object-cover' style={{ aspectRatio: '3/2' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


      </>}
    </div>



  )
}

export default LandingHome