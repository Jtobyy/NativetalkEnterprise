import { createSlice } from "@reduxjs/toolkit";


export const usersAmountSlice = createSlice({
    name: 'usersAmount',
    initialState: {
        value: 1,
        initial_price: 3000,
        price: 3000,
        wanted: false, // Keeps track of whether extra extensions are wanted or not.
        // processed: false,
    },
    reducers: {
        increment: state => {
            state.value += 1
            state.price += state.initial_price
        },
        decrement: state => {
            if (state.value > 1) {
                state.value -= 1
                state.price -= state.initial_price
            } 
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
            state.price += action.payload * state.initial_price
        },
        setWantedTrue: state => {
            state.wanted = true
        },
        setWantedFalse: state => {
            state.wanted = false
        },
        // setProcessedTrue: state => {
        //     state.processed = true
        // },
        // setProcessedFalse: state => {
        //     state.processed = false
        // }
    }
})

export const { increment, decrement, incrementByAmount, setWantedTrue, setWantedFalse } = usersAmountSlice.actions // setProcessedFalse, setProcessedTrue
export default usersAmountSlice.reducer

export const selectAmount = state => state.usersAmount.value
export const selectPrice = state => state.usersAmount.price
export const selectWanted = state => state.usersAmount.wanted
export const selectProccessed = state => state.usersAmount.processed
export const incrementAsync = amount => dispatch => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount))
    }, 1000)
  }