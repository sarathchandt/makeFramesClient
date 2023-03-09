import React from 'react'
import Header from '../components/Home/Header'
import UserProfilePage from '../components/userProfilePage/userProfilePage'
import Footer from '../components/Footer/Footer'

function userProfilePageView() {
  return (
    <div>
        <Header/>
        <UserProfilePage/>
        <Footer/>
    </div>
  )
}

export default userProfilePageView