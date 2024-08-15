import { createSlice } from '@reduxjs/toolkit';

export enum TagTypes {
    Player,
    Role,
    Time
}

export type Tag = ([TagTypes.Player, number] |
[TagTypes.Role, string] |
[TagTypes.Time, number]);

export type EventSegments = (string | Tag)[];

export type EventList = { id: number, event: EventSegments; }[];

const initialState: EventList = [];

const findNextId = (state: EventList): number => {
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

export const getFilteredEvents = (state: EventList, filter: Tag): EventList => {
    let result: EventList = [];
    let found = false;

    for (const e of state) {
        found = false;
        for (const elem of e.event) {
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

export function catchEventActions(state, action) {
    switch (action.type) {
        case 'time/advanceTime':
            const start_string = (state.time.time % 2 === 0) ? "The night has fallen on Ravenswoodbluff, it is now " : "It is a new day in Ravenswoodbluff, it is now ";
            const new_event = [start_string, [TagTypes.Time, state.time.time]];
            const new_state = {
                ...state,
                events:
                    [...state.events,
                    { id: findNextId(state.events), event: new_event }
                    ]
            };
            return new_state;
        default:
            break;
    }
    return state;
}

export const EventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.push({
                id: findNextId(state),
                event: action.payload.event
            });
        },
        clearEvents: (state) => {
            state = [];
        }
    }
});

export const { addEvent, clearEvents } = EventsSlice.actions;

export default EventsSlice.reducer;