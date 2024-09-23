import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

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
            const num_players = state.players.length;
            let from_index = action.payload.from;
            let to_index = action.payload.to;
            if (to_index == from_index)
                return;

            // clockwise means the one token moves clockwise
            // all tokens in between move in the opposite
            // direction
            const clockwise = (num_players + from_index - to_index) % num_players
                > num_players / 2;

            if (clockwise) {
                // reverse to treat all cases as one and reverse back at the end
                state.players.reverse();
                from_index = num_players - 1 - from_index;
                to_index = num_players - 1 - to_index;
            }

            if (from_index < to_index) {
                // the end of the array needs to shift to the start
                state.players.splice(0, 0,
                    state.players.pop() as WritableDraft<PlayerInfo>);
                from_index++;
                to_index++;
            }

            const moving_player: PlayerInfo = state.players[from_index];
            state.players.splice(from_index, 1);
            if (to_index > from_index) {
                to_index = (num_players + to_index - 1) % num_players;
            }
            state.players.splice(to_index, 0, moving_player);

            if (clockwise) {
                // reverse back
                state.players.reverse();
            }

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