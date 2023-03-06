import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UARL } from "../API/apiCall";

const initialState ={
    loading : true,
    graphDetails: []
}


export const graphFetchForUser = createAsyncThunk('graph/graphFetchForUser',async()=>{
    return await axios.get(`${UARL}takeGraphUserData`)
})

const graphGrowthSlice = createSlice({
    name:'graph',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(graphFetchForUser.pending,(state)=>{
            state.loading=true;
        })
        builders.addCase(graphFetchForUser.fulfilled,(state, action)=>{
            state.loading=false;
            state.graphDetails=action.payload
        })
        builders.addCase(graphFetchForUser.rejected,(state)=>{
            state.loading=false
        })
    }
})

export default graphGrowthSlice.reducer
