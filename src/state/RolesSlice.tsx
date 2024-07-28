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
            state.script = action.payload.script;
        },
        addRoles: (state, action) => {
            if (Array.isArray(action.payload.roles)) {
                state.roles.push(...action.payload.roles);
            } else {
                state.roles.push(action.payload.roles);
            }

        },
        clearScript: state => {
            state.script = "";
            state.roles = [];
        }

    }
}
);

export const { setScript, addRoles, clearScript } = RolesSlice.actions;

export default RolesSlice.reducer;