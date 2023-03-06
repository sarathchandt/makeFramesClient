import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UURL } from "../API/apiCall";

const initialState = {
    loading:true,
    programs:[],
    err:''
}


export const fetchPrograms = createAsyncThunk('programs/fetchPrograms',async()=>{
   return await axios.post(`${UURL}viewPrograms`,{ token: document.cookie })
})


const programSlice = createSlice({
    name:'programs',
    initialState:initialState,   
    extraReducers:(builder)=>{
        builder.addCase(fetchPrograms.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchPrograms.fulfilled,(state,action)=>{
            state.loading=false,
            state.programs=action.payload,
            state.err=''
        })
        builder.addCase(fetchPrograms.rejected,(state,action)=>{
            state.err = action.error.message
            state.loading=false    
        })
    }
})


export default programSlice.reducer;