import { createSlice } from '@reduxjs/toolkit';

export enum ChipType {
    Player,
    Role,
    Time
}

export type ChipSegment = ([ChipType.Player, number] |
[ChipType.Role, string] |
[ChipType.Time, number]);

export type NoteSegments = (string | ChipSegment)[];

export type NoteList = { id: number, note: NoteSegments; }[];

const initialState: NoteList = [];

const findNextId = (state: NoteList): number => {
    const allNumbers: number[] = [];
    for (const e of state) {
        allNumbers.push(e.id);
    }

    let result = 0;
    while (allNumbers.includes(result)) {
        result++;
    }

    return result;
};

export const getFilteredNotes = (state: NoteList, filter: ChipSegment): NoteList => {
    let result: NoteList = [];
    let found = false;

    for (const e of state) {
        found = false;
        for (const elem of e.note) {
            if (Array.isArray(elem) &&
                elem[0] === filter[0] &&
                elem[1] === filter[1]) {
                found = true;
                break;
            }
        }
        if (found) {
            result.push(e);
        }
    }

    return result;
};

export function catchNoteActions(state, action) {
    switch (action.type) {
        case 'time/advanceTime':
            const start_string = (state.time.time % 2 === 0) ?
                "The night has fallen on Ravenswoodbluff, it is now " :
                "It is a new day in Ravenswoodbluff, it is now ";
            const new_note = [start_string, [ChipType.Time, state.time.time]];
            const new_state = {
                ...state,
                notes:
                    [...state.notes,
                    { id: findNextId(state.notes), note: new_note }
                    ]
            };
            return new_state;
        default:
            break;
    }
    return state;
}

export const NotesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.push({
                id: findNextId(state),
                note: action.payload.note
            });
        },
        editNote: (state, action) => {
            for (var ev of state) {
                if (ev.id === action.payload.id) {
                    ev.note = action.payload.note;
                    break;
                }
            }

        },
        deleteNote: (state, action) => {
            for (var index in state) {
                if (state[index].id === action.payload.id) {
                    state.splice(parseInt(index), 1);
                    break;
                }
            }
        },
        clearNotes: (state) => {
            state.splice(0, state.length);
        }
    }
});

export const { addNote, editNote, deleteNote, clearNotes } = NotesSlice.actions;

export default NotesSlice.reducer;