import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UARL } from "../API/apiCall";

let initialState={
    loading:true,
    token:[]
}


export const checkTocken=createAsyncThunk('token/checkTocken',async()=>{
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `adminToken ${token}` };
    return await axios.get(`${UARL}checkAdminToken`,{ headers })
})

const tokenSlice= createSlice({
    name:'token',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(checkTocken.fulfilled,(state, action)=>{
            state.token= action.payload
            state.loading=false
        })
        builders.addCase(checkTocken.pending,(state)=>{
            state.loading=true
        })
        builders.addCase(checkTocken.rejected,(state)=>{
            state.loading=false
        })
    }
})

export default tokenSlice.reducer