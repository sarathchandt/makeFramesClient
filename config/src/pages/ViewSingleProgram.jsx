import React from 'react'
import ProfetionalHeader from '../components/Home/ProfetionalHeader'
import SingleProgram from '../components/ViewProgram/singleProgram'
import Footer from '../components/Footer/Footer'

function viewSingleProgram() {
  return (
    <div>
        <ProfetionalHeader />
        <SingleProgram/>
       <Footer/>
    </div>
  )
}

export default viewSingleProgram