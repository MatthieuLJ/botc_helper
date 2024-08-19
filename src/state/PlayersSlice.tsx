import { createSlice } from '@reduxjs/toolkit';

type PlayersState = {
    players: { name: string, alive: boolean, claims: string[] }[]
}

const initialState: PlayersState = {
    players: [
        { name: "New Player", alive: true, claims: [] },
        { name: "New Player", alive: true, claims: [] },
        { name: "New Player", alive: true, claims: [] },
    ]
}

export const PlayersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setCount: (state, action) => {
            const new_count = action.payload.count;
            while (new_count > state.players.length) {
                state.players.push({
                    name: "New Player",
                    alive: true,
                    claims: []
                });
            } 
            if (new_count < state.players.length) {
                state.players = state.players.slice(0, new_count);
            }
        },
        setName: (state, action) => {
            state.players[action.payload.index].name = action.payload.name;
        },
        setClaims: (state, action) => {
            state.players[action.payload.index].claims = action.payload.claims;
        },
        resetPlayers: (state) => {
            state.players.forEach((p) => { 
                p.alive=true;
                p.claims=[];})
        }
    }
})

export const { setCount, setName, setClaims, resetPlayers } = PlayersSlice.actions;

export default PlayersSlice.reducer;