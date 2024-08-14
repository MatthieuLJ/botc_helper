import { createSlice } from '@reduxjs/toolkit';


type TimeState = {
    time: number;
};

const initialState: TimeState = {
    time: 0
};



export const TimeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        advanceTime: (state) => {
            state.time = state.time + 1;

        }
    }
});

export const { advanceTime } = TimeSlice.actions;

export default TimeSlice.reducer;