import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UURL } from "../API/apiCall";

let initialState={
    loading : true,
    profiles:[]
}


export const fetchUsersBySearch = createAsyncThunk('profileSearch/fetchUsersBySearch',async(name)=>{
    const token = localStorage.getItem('usertoken');
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.post(`${UURL}fetchUsersBySearch`,{name:name},{headers})
})

const usersBySearchSlice = createSlice({
    name:'profileSearch',
    initialState:initialState,
    extraReducers:(builders)=>{
        builders.addCase(fetchUsersBySearch.fulfilled,(state, action)=>{
            state.loading=false;
            state.profiles=action.payload
        })
        builders.addCase(fetchUsersBySearch.pending,(state)=>{
            state.loading=true
        })
        builders.addCase(fetchUsersBySearch.rejected,(state)=>{
            state.loading=false
        })
    }
})

export default usersBySearchSlice.reducer