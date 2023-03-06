import React from 'react'

import ProfetionalHeader from '../components/Home/ProfetionalHeader'
import Footer from '../components/Footer/Footer'
import ViewBookingHost from '../components/ViewBookingHost/viewBookingHost'

function ViewHostBooking() {
  return (
    <div>
        <ProfetionalHeader/>
        <ViewBookingHost/>
        <Footer/>
    </div>
  )
}

export default ViewHostBooking