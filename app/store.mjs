import {configureStore} from '@reduxjs/toolkit'
import checkLoginSlice from '../slices/checkLogin.mjs'
import checkArstistSlice from '../slices/isArtist.mjs'
import fetchProgramData from '../slices/Program.mjs'
import fetchSingleProgram from '../slices/singleProgramFetch.mjs'
import takePost from '../slices/fetchPost.mjs'
import bringAllProgram from '../slices/bringAllProgram.mjs'
import fetchOnePg from "../slices/fetchProgramForBook.mjs"
import booked from '../slices/bookProgram.mjs'
import fetchBooked from '../slices/bookedDetailsFetch.mjs'
import userFetch from '../slices/fetchUserAccoutHome.mjs'
import fetchUserData from '../slices/profileViewUser.mjs'
import fetchPostsOfUser from '../slices/fetchUserPost.mjs'
import loggedInUser from '../slices/loginUser.mjs'
import chatSetup from '../slices/chatPerson.mjs'
import graph from '../slices/graphGrowthSlice.mjs'
import bookingGraph from '../slices/bookingGraph.mjs'
import details from '../slices/takeTotalDetails.mjs'
import token from '../slices/adminPrivateRouteCheck.mjs'

const store = configureStore({
    reducer : {
        checkLogin : checkLoginSlice ,
        checkArtist : checkArstistSlice,
        fetchProgram:fetchProgramData,
        fetchSingleProgram:fetchSingleProgram,
        takePost : takePost,
        bringAllProgram:bringAllProgram,
        fetchOnePg:fetchOnePg,
        booked:booked,
        fetchBooked:fetchBooked,
        userFetch:userFetch,
        fetchUserData:fetchUserData,
        fetchPostsOfUser:fetchPostsOfUser,
        loggedInUser:loggedInUser,
        chatSetup:chatSetup,
        graph:graph,
        bookingGraph:bookingGraph,
        details:details,
        token:token
        
        
    },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), 
  
})

export default store

