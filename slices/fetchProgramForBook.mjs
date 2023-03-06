import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UURL } from "../API/apiCall";
import axios from 'axios'

const initialState={
    loading : true,
    program:[],
    err:''
}


export const fetchOneProgram = createAsyncThunk('singleProgram/fetchOneProgram',async(id)=>{
    return  await axios.post(`${UURL}fetchOneProgramBook`,{id:id,token:document.cookie})
})

const fetchOnePgSlice = createSlice({
    name:'singleProgram',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(fetchOneProgram.fulfilled,(state, action)=>{
            state.loading= false;
            state.program = action.payload;
        })
        builders.addCase(fetchOneProgram.rejected,(state, action)=>{
            state.loading= false,
            state.err= action.error.message;
        })
         builders.addCase(fetchOneProgram.pending,(state)=>{
            state.loading=true;
         })
    }
})

 export default fetchOnePgSlice.reducer