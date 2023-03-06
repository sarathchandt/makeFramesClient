import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    isArtist:false
}

const checkArstistSlice = createSlice ({
    name:'artist',
    initialState:initialState,
    reducers:{
        changeState:(state,action)=>{
            state.isArtist = action.payload
        }
    }
})

export default checkArstistSlice.reducer
export const {changeState} = checkArstistSlice.actions