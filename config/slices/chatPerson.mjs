import { createSlice } from "@reduxjs/toolkit";

const initialState={
    person:{}
}

const chatPersonSlice=createSlice({
    name:'chat',
    initialState:initialState,
    reducers:{
        changePerson:(state,action)=>{
            state.personn = action.payload
        }
    }
})


export default chatPersonSlice.reducer
export const {changePerson} = chatPersonSlice.actions