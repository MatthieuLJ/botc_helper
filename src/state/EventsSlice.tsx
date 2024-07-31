import { createSlice } from '@reduxjs/toolkit';
import { gameTime } from './gameTime';

type EventState = {
    events: { id: number, time: gameTime, event: string, tags: string[]; }[];
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

export const EventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events.push({
                id: findNextId(state),
                time: action.payload.time,
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