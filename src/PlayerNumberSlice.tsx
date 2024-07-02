import { createSlice } from '@reduxjs/toolkit';

export const PlayerNumberSlice = createSlice({
    name: 'playerNumber',
    initialState: {
        value: 3
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        setPlayerNumber: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { increment, decrement, setPlayerNumber } = PlayerNumberSlice.actions;

export default PlayerNumberSlice.reducer;