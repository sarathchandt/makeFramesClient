import React from 'react'
import Header from '../components/Home/Header'
import UserProfile from  '../components/userProfilePage/userProfilePage'
import Footer from '../components/Footer/Footer'

function userProfilePageView() {
  return (
    <div>
        <Header/>

        <UserProfile/>
        <Footer/>
    </div>
  )
}

export default userProfilePageView