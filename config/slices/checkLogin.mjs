import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedin : false
}

const checkLoginSlice = createSlice ({
    name:'logged',
    initialState:initialState,
    reducers:{
        changeState : (state,action)=>{
            state.isLoggedin = action.payload
        }
    }
})

export default checkLoginSlice.reducer;
export const {changeState } = checkLoginSlice.actions