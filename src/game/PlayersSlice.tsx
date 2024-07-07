import { createSlice } from '@reduxjs/toolkit';

type PlayersState = {
    players: { id: number, name: string, alive: boolean, claims: string[] }[]
}

const initialState: PlayersState = {
    players: [
        { id: 0, name: "Player_1", alive: true, claims: [] },
        { id: 1, name: "Player_2", alive: true, claims: [] },
        { id: 2, name: "Player_3", alive: true, claims: [] },
    ]
}

const findNextPlayerName = (state: PlayersState): string => {
    const allNumbers: number[] = [];
    for (const player of state.players) {
        const numFound = /Player_(?<id>\d+)/.exec(player.name);
        if (numFound != null) {
            allNumbers.push(Number(numFound[1]));
        }
    }

    let result = 1;
    while (allNumbers.includes(result)) {
        result++;
    }

    return `Player_${result}`;
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

export const PlayerSlice = createSlice({
    name: 'playerNumber',
    initialState,
    reducers: {
        incrementCount: state => {
            state.players.push({
                id: findNextId(state),
                name: findNextPlayerName(state),
                alive: true,
                claims: []
            });
        },
        decrementCount: state => {
            state.players.pop();
        },
        setName: (state, action) => {
            const index = state.players.findIndex((element) => element.id === action.payload.id);
            state.players[index].name = action.payload.name;
        }
    }
})

export const { incrementCount, decrementCount, setName } = PlayerSlice.actions;

export default PlayerSlice.reducer;