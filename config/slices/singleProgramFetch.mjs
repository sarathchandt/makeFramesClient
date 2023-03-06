import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UURL } from "../API/apiCall";


const initialState={
    loading:true,
    program:[],
    err:''
}


export const fetchSingleProgram = createAsyncThunk('singleProgram/fetchSingleProgram',async(id)=>{
    return await axios.post(`${UURL}takeSingleProgram`,{id:id})//.then(e=>console.log(e))
})

const singleProgramSlice=createSlice({
    name:'singleProgram',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchSingleProgram.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchSingleProgram.fulfilled,(state,action)=>{
            state.loading=false
            state.program= action.payload
            
        })
        builder.addCase(fetchSingleProgram.rejected,(state,action)=>{
            state.loading=false
            state.program=[]
            state.err=action.error.message
        })
    }
})


export default singleProgramSlice.reducer;