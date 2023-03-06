import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import axios from "axios";
import { UURL } from "../API/apiCall";

const initialState={
    loading:true,
    posts:[]
}

export const  fetchPostsOfUser = createAsyncThunk('post/fetchPostsOfUser',async(id)=>{
    return await axios.post(`${UURL}fetchPostsOfUser`,{id:id},{withCredentials:true})
})


const fetchPostsOfUserSlice = createSlice({
    name:'post',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(fetchPostsOfUser.pending,(state)=>{
            state.loading=true
        })
        builders.addCase(fetchPostsOfUser.fulfilled,(state, action)=>{
            state.loading=false;
            state.posts=action.payload
        })
        builders.addCase(fetchPostsOfUser.rejected,(state)=>{
            state.loading=false;
        })
    }
})
export default fetchPostsOfUserSlice.reducer