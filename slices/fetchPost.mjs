import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UURL } from "../API/apiCall";
let initialState={
    post:[],
    loading: false,
    err:''

}

export const fetchPost = createAsyncThunk('post/fetchPost',async(page)=>{
  return await  axios.post(`${UURL}pickPosts`,{token:document.cookie,page:page})
})

const postStatusSlice= createSlice({
    name:'post',
    initialState:initialState,
   extraReducers:(builder)=>{
    builder.addCase(fetchPost.pending,(state)=>{
        state.loading=true   
    })
    builder.addCase(fetchPost.fulfilled,(state,action)=>{
        state.post=action.payload,
        state.loading=false
    })
    builder.addCase(fetchPost.rejected,(state,action)=>{
            state.loading=false;
            state.err=action.error.message
    })
   }
})

export default postStatusSlice.reducer
