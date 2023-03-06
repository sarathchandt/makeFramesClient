import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UARL } from "../API/apiCall";

let initialState={
    loading:true,
    bookingGraph:[]
}
export const fetchBookingGraph =createAsyncThunk('bookingGraph/fetchBookingGraph',async()=>{
    return await axios.get(`${UARL}bookingGraph`)
})


const bookingGraphSlice=createSlice({
    name:'bookingGraph',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(fetchBookingGraph.fulfilled,(state, action)=>{
            state.bookingGraph=action.payload;
            state.loading=false
        })
        builders.addCase(fetchBookingGraph.pending,(state)=>{
            state.loading=true
        })
        builders.addCase(fetchBookingGraph.rejected,(state)=>{
            state.loading=false
        })
    }
})

export default bookingGraphSlice.reducer