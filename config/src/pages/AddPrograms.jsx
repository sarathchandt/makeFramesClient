import React from 'react'
import ProfetionalHeader from '../components/Home/ProfetionalHeader'
import ProgramForm from '../components/AddProgramForm/AddProgramform'
function AddPrograms() {
  return (
    <div>
        <ProfetionalHeader value={{Program : true}}/>
        <ProgramForm/>
    </div>
  )
}

export default AddPrograms