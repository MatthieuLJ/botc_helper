import { createSlice } from '@reduxjs/toolkit';

type RolesState = {
    script: string;
    roles: string[];
};

const initialState: RolesState = {
    script: "",
    roles: []
};

export const RolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setScript: (state, action) => {
            state.script = "";
        },
        addRole: (state, action) => {
            state.roles.push(action.payload.role);
        },
        clear: state => {
            state.script = "";
            state.roles = [];
        }

    }
}
);

export const { setScript, addRole, clear } = RolesSlice.actions;

export default RolesSlice.reducer;