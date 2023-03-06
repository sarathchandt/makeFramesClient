import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UARL } from "../API/apiCall";

let initialState={
    loading:true,
    detail:[]
}

export const fetchDetails=createAsyncThunk('details/fetchDetails',async()=>{
    return await axios.get(`${UARL}detailsFetch`)
})

const detailsSlice=createSlice({
    name:'details',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(fetchDetails.fulfilled,(state, action)=>{
            state.loading=false;
            state.detail=action.payload
        })
        builders.addCase(fetchDetails.pending,(state)=>{
            state.loading=false;
        })
        builders.addCase(fetchDetails.rejected,(state)=>{
            state.loading=false;
        })
    }
})

export default detailsSlice.reducer