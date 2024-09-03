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
            if (state.script !== action.payload.script) {
                state.roles = [];
                state.script = action.payload.script;
            }
        },
        addRoles: (state, action) => {
            if (Array.isArray(action.payload.roles)) {
                const new_roles = action.payload.roles.filter(
                    (x) => !state.roles.includes(x)
                );
                if (new_roles.length > 0) {
                    state.roles.push(...new_roles);
                }
            } else {
                if (state.roles.indexOf(action.payload.roles) !== -1) {
                    state.roles.push(action.payload.roles);
                }
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