import { createSlice } from '@reduxjs/toolkit';

type PlayersState = {
    players: { id: number, name: string, alive: boolean, claims: string[] }[]
}

const initialState: PlayersState = {
    players: [
        { id: 0, name: "New Player", alive: true, claims: [] },
        { id: 1, name: "New Player", alive: true, claims: [] },
        { id: 2, name: "New Player", alive: true, claims: [] },
    ]
}

const findNextId = (state: PlayersState): number => {
    const allNumbers: number[] = [];
    for (const player of state.players) {
        allNumbers.push(player.id);
    }

    let result = 0;
    while (allNumbers.includes(result)) {
        result++;
    }

    return result;
}

export const PlayersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setCount: (state, action) => {
            const new_count = action.payload.count;
            while (new_count > state.players.length) {
                state.players.push({
                    id: findNextId(state),
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
            const index = state.players.findIndex((element) => element.id === action.payload.id);
            state.players[index].name = action.payload.name;
        },
        setClaims: (state, action) => {
            const index = state.players.findIndex((element) => element.id === action.payload.id);
            state.players[index].claims = action.payload.claims;
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