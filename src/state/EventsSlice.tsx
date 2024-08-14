import { createSlice } from '@reduxjs/toolkit';

export enum TagTypes {
    Player,
    Role,
    Time
}

export type Tag = ([TagTypes.Player, number] |
[TagTypes.Role, string] |
[TagTypes.Time, number]);

export type EventType = (string | Tag)[];

export type EventState = {
    events: { id: number, event: EventType, tags: Tag[]; }[];
};

const initialState: EventState = {
    events: []
};

const findNextId = (state: EventState): number => {
    const allNumbers: number[] = [];
    for (const e of state.events) {
        allNumbers.push(e.id);
    }

    let result = 0;
    while (allNumbers.includes(result)) {
        result++;
    }

    return result;
};

/* For future use
export const getFilteredEvents = (state: EventState, filters: string[], and: boolean): EventState => {
    let result: EventState = { events: []};

    for (const e of state.events) {
        if ((!and && filters.some(x => e.tags.includes(x))) ||
            (and && filters.reduce((so_far, current) => so_far && e.tags.includes(current), true))) {
                result.events.push(e);
            }
    }

    return result;
};
*/

export function catchEventActions(state, action) {
    switch (action.type) {
        case 'time/advanceTime':
            const start_string = (state.time.time % 2 === 0) ? "The night has fallen on Ravenswoodbluff, it is now " : "It is a new day in Ravenswoodbluff, it is now ";
            const new_event = [start_string, [TagTypes.Time, state.time.time]];
            const new_state = {
                ...state,
                events:
                {
                    events:
                        [...state.events.events,
                        { id: findNextId(state.events), event: new_event }
                        ]
                }
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
            state.events.push({
                id: findNextId(state),
                event: action.payload.event,
                tags: action.payload.tags
            });
        },
        clearEvents: (state) => {
            state.events = [];
        }
    }
});

export const { addEvent, clearEvents } = EventsSlice.actions;

export default EventsSlice.reducer;