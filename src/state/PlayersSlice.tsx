import { createSlice } from '@reduxjs/toolkit';

export type PlayerInfo = {
    name: string,
    alive: boolean,
    claims: string[];
};

type PlayersState = {
    players: PlayerInfo[];
};

const initialState: PlayersState = {
    players: [
        { name: "New Player", alive: true, claims: [] },
        { name: "New Player", alive: true, claims: [] },
        { name: "New Player", alive: true, claims: [] },
    ]
};

export function rotate_array(array: any[], from: number, to: number) {
    const len = array.length;
    if (to == from)
        return;

    // clockwise means the one token moves clockwise
    // all tokens in between move in the opposite
    // direction
    const clockwise = (len + from - to) % len > len / 2;

    if (clockwise) {
        // reverse to treat all cases as one and reverse back at the end
        array.reverse();
        from = len - 1 - from;
        to = len - 1 - to;
    }

    if (from < to) {
        // the end of the array needs to shift to the start
        array.splice(0, 0, array.pop());
        from++;
        to++;
    }

    const item = array[from];
    array.splice(from, 1);
    if (to > from) {
        to = (len + to - 1) % len;
    }
    array.splice(to, 0, item);

    if (clockwise) {
        // reverse back
        array.reverse();
    }
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
        setAlive: (state, action) => {
            state.players[action.payload.index].alive = action.payload.alive;
        },
        movePlayer: (state, action) => {
            rotate_array(state.players, action.payload.from, action.payload.to);


        },
        resetPlayers: (state) => {
            state.players.forEach((p) => {
                p.alive = true;
                p.claims = [];
            });
        }
    }
});

export const { setCount, setName, setClaims, setAlive, resetPlayers, movePlayer } = PlayersSlice.actions;

export default PlayersSlice.reducer;