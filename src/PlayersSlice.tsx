import { createSlice } from '@reduxjs/toolkit';

export const PlayerNumberSlice = createSlice({
    name: 'playerNumber',
    initialState: {
        num_players: 3,
        players: []
    },
    reducers: {
        incrementCount: state => {
            state.num_players += 1
        },
        decrementCount: state => {
            state.num_players -= 1
        }
    }
})

export const { incrementCount, decrementCount } = PlayerNumberSlice.actions;

export default PlayerNumberSlice.reducer;