import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UURL } from "../API/apiCall";


const initialState = {
    loading: false,
    booked: false,
    err: ''
}

export const bookedFunction = createAsyncThunk('booked/bookedFunction', async (bookingDetails) => {
    return await axios.post(`${UURL}bookProgram`, bookingDetails )
})

const bookingSlice = createSlice({
    name: 'booked',
    initialState: initialState,
    reducers:{
        unBook:(state)=>{
            state.booked=false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(bookedFunction.fulfilled, (state) => {
            state.loading = false;
            state.booked = true;
        })
        builder.addCase(bookedFunction.pending, (state) => {
            state.loading = true;
            state.booked = false;
        })
        builder.addCase(bookedFunction.rejected, (state) => {
            state.loading = false
                state.booked = false
    })
    }

})

export default bookingSlice.reducer

export const {unBook} = bookingSlice.actions