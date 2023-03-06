import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import axios from "axios";
import { UURL } from "../API/apiCall";

const initialState = {
    loading:true,
    users:[],
}


export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails',async()=>{
    return await axios.get(`${UURL}fetchUsers`,{withCredentials:true})
})

const fetchUserSlice = createSlice({
    name:'user',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(fetchUserDetails.pending,(state)=>{
            state.loading=true
        })
        builders.addCase(fetchUserDetails.fulfilled,(state, action)=>{
            state.loading=false
            state.users = action.payload
        })
        builders.addCase(fetchUserDetails.rejected,(state)=>{
            state.loading=false;
        })
    }
})

export default fetchUserSlice.reducer