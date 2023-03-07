import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UURL } from "../API/apiCall";

const initialState ={
    loading:true,
    programs:[],
    err:''
}

export const fetchAllProgramForBooking = createAsyncThunk('allPost/fetchAllProgramForBooking',async()=>{
    return await axios.post(`${UURL}bringAllpost`,{token:localStorage.getItem('usertoken')})
})

export const fetchSearchedPg=createAsyncThunk('allPost/fetchSearchedPg',async(cate)=>{
 
    return await axios.post(`${UURL}bringSearchedPg`,{token:localStorage.getItem('usertoken'),category:cate})
})

const allPostSlice = createSlice({
    name:'allPost',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProgramForBooking.fulfilled,(state, action)=>{
            state.loading=false;
            state.programs = action.payload;
        })
        builder.addCase(fetchSearchedPg.pending,(state)=>{
            state.loading=true;
            state.programs=[]
        })
        builder.addCase(fetchSearchedPg.fulfilled,(state, action)=>{
            state.loading=false;
            state.programs= action.payload
        })
        builder.addCase(fetchSearchedPg.rejected,(state)=>{
            state.loading=false
        })
        builder.addCase(fetchAllProgramForBooking.rejected,(state, action)=>{
            state.loading=false;
            state.err=action.error.message;
        })
        builder.addCase(fetchAllProgramForBooking.pending,(state)=>{
            state.loading=true
        })
    }
})


export default allPostSlice.reducer