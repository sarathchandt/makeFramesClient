import React, { useEffect, useState } from 'react'
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { UURL } from '../../../API/apiCall'
import { fetchUsersBySearch } from '../../../slices/searchProfileByDomain.mjs'

function SearchPeopleByDomain() {

    const [artists, setArtists] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    const [searchParams] = useSearchParams()
    const profiles = useSelector(state => state.profileSearch)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usersPerPage = 12
    const pagesVisited = usersPerPage * pageNumber
    const displayUsers = profiles?.profiles?.data?.slice(pagesVisited, pagesVisited + usersPerPage)
        .map(obj => {
            return <div className='bg-dark m-2  rounded  w-40  '>
                <img src={obj?.dpimage ? obj?.dpimage : '/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png'} className='p-2 w-12/12  rounded-circle object-cover' style={{ aspectRatio: '1/1' }} alt="" />
                <div className='d-flex justify-content-center'>
                    <p className=' text-xl'>{obj?.firstName}</p>
                </div>
                <div className='d-flex justify-content-center'>
                    <button className='btn bg-darkGreen text-white hover:bg-green mb-3 mt-1 ' onClick={() => { goToProfile(obj._id) }}>View profile</button>
                </div>
            </div>
        })
    const pageCount = Math.ceil(profiles?.profiles?.data?.length / usersPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    useEffect(() => {
        dispatch(fetchUsersBySearch(searchParams.get('domain')))
    }, [])
    function goToProfile(id) {
        navigate({
            pathname: '/UserPageForProfile',
            search: createSearchParams({
                profile_id: id
            }).toString()
        })
    }


    return (
        <div>
            {
                profiles?.profiles?.data?.length == 0 ? <>

                    <div className="container-fluid" style={{ minHeight: '80vh' }}>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center " >
                                <div className='w-11/12  bg-dark rounded d-flex justify-content-center mt-5 '  > <p className='mt-5 mb-5 text-green' > ! No Matched Profiles</p></div>
                            </div>
                        </div>
                    </div>
                </> : <>
                    <div className="container-fluid " style={{ minHeight: '80vh' }}>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="container-fluid">
                                    <div className="row d-flex justify-content-center pt-5">
                                        {profiles?.profiles?.loading ? <></> : <> {displayUsers}  
                                         </>

                                        }
                                        <div className='d-flex justify-content-center mt-4'><ReactPaginate
                                            previousLabel={'Prev'}
                                            nextLabel={'Next'}
                                            pageCount={pageCount}
                                            onPageChange={changePage}
                                            containerClassName={"paginationBttn"}
                                            nextLinkClassName={"nxtBttn"}
                                            previousLinkClassName={"prevBttn"}
                                            disabledClassName={"paginationDisabled"}
                                            activeClassName={'acivateBttn'}
                                            
                                        /></div>
                                        {/* {profiles?.profiles?.data?.map(obj => {
                                            return <>
                                                <div className='bg-dark m-2  rounded  w-40  '>
                                                    <img src={obj?.dpimage ? obj?.dpimage : '/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png'} className='p-2 w-12/12  rounded-circle object-cover' style={{ aspectRatio: '1/1' }} alt="" />
                                                    <div className='d-flex justify-content-center'>
                                                        <p className=' text-xl'>{obj?.firstName}</p>
                                                    </div>
                                                    <div className='d-flex justify-content-center'>
                                                        <button className='btn bg-darkGreen text-white hover:bg-green mb-3 mt-1 ' onClick={() => { goToProfile(obj._id) }}>View profile</button>
                                                    </div>
                                                </div>
                                            </>
                                        })} */}

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>

                </>
            }

        </div>
    )
}

export default SearchPeopleByDomain