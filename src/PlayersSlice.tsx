import { createSlice } from '@reduxjs/toolkit';

type PlayersState = {
    players: { id: number, name: string, claims: string[] }[]
}

const initialState: PlayersState = {
    players: [
        { id: 0, name: "Player_1", claims: [] },
        { id: 1, name: "Player_2", claims: [] },
        { id: 2, name: "Player_3", claims: [] },
    ]
}

const findNextPlayerName = (state: PlayersState): string => {
    var allNumbers: number[] = [];
    for (const player of state.players) {
        const numFound = /Player_(?<id>\d+)/.exec(player.name);
        if (numFound != null) {
            allNumbers.push(Number(numFound[1]));
        }
    }

    var result = 1;
    while (allNumbers.indexOf(result) !== -1) {
        result++;
    }

    return `Player_${result}`;
}

const findNextId = (state: PlayersState): number => {
    var allNumbers: number[] = [];
    for (const player of state.players) {
        allNumbers.push(player.id);
    }

    var result = 0;
    while (allNumbers.indexOf(result) !== -1) {
        result++;
    }

    return result;
}

export const PlayerNumberSlice = createSlice({
    name: 'playerNumber',
    initialState,
    reducers: {
        incrementCount: state => {
            state.players.push({ id: findNextId(state), name: findNextPlayerName(state), claims: [] });
        },
        decrementCount: state => {
            state.players.pop();
        }
    }
})

export const { incrementCount, decrementCount } = PlayerNumberSlice.actions;

export default PlayerNumberSlice.reducer;