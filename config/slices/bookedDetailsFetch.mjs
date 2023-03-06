import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UURL } from "../API/apiCall";

const initialState={
    loading:false,
    bookings:[],
    err:''
}

export const fetchBookedPG=createAsyncThunk('bookedPg/fetchBookedPG',async()=>{
    return await axios.post(`${UURL}fetchBookedPg`,{token:document.cookie})
})


const  fetchBookedPGSlice=createSlice({
    name:'bookedPg',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchBookedPG.fulfilled,(state, action)=>{
            state.loading=false;
            state.bookings=action.payload;
            state.err=''
        })
        builder.addCase(fetchBookedPG.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(fetchBookedPG.rejected,(state,action)=>{
            state.err=action.error.message
        })
    }
})

export default fetchBookedPGSlice.reducer