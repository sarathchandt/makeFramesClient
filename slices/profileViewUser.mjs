import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UURL } from "../API/apiCall";

const initialState ={
    loading:true,
    userDetails:[]
}

export const fetchUserData=createAsyncThunk('user/fetchUserData',async(id)=>{
    return await axios.post(`${UURL}fetchUserData`,{id:id},{withCredentials:true})
})

const fetchUserDataSlice= createSlice({
    name:'user',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(fetchUserData.pending,(state)=>{
            state.loading=true
        })
        builders.addCase(fetchUserData.fulfilled,(state, action)=>{
            state.loading=false;
            state.userDetails=action.payload
        })
        builders.addCase(fetchUserData.rejected,(state)=>{
            state.loading=false
        })
    }
})

export default fetchUserDataSlice.reducer