import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loggedIn:false
}


const logedInSlice = createSlice({
    name:'loggedIn',
    initialState:initialState,
    reducers:{
        changeLoginState:(state,action)=>{
            state.loggedIn=action.payload
        }
    }
})


export default logedInSlice.reducer
export const {changeLoginState} = logedInSlice.actions