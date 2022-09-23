import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    dids: [],
    selected: 0,
    status: 'idle',
    error: null
}

export const fetchDids = createAsyncThunk('dids/fetchDids', async () => {
    let response = await axios.post('https://nativetalk-api-proxy.herokuapp.com/api/dids/', {
    // let response = await axios.post('http://156.0.249.118:82/api/dids/', {  
        "id":"0",
        "token":"",
        "action":"list",
        "limit":"5",
        "accountid":"0" 
      })
    return response
    // .then((res) => {
    //     return (res.data.data)
    // })
    // p.catch((err) => {
    //     alert(err)
    //     return(err)
    // })
})

export const didsSlice = createSlice({
    name: 'dids',
    initialState,
    reducers: {
        didSelected: (state, action) => {
            state.selected = action.payload    
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchDids.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchDids.fulfilled, (state, action) => {
            // Add any fetched posts to the array
            state.status = 'succeeded'
            state.dids = action.payload.data.data
          })
          .addCase(fetchDids.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})

export const selectAllDids = state => state.dids.dids
export const selectedDids = state => state.dids.selected

export const { didSelected } = didsSlice.actions
export default didsSlice.reducer