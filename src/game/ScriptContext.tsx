import React from 'react';
import { createContext, useState } from 'react';
import { roleType } from './role.ts';

export type ScriptContextType = {
    roles: string[];
    addRoles: (new_role: string | string[]) => void;
    clearRoles: () => void;
    getRole: (role: string) => roleType | null;
};

const initialState: ScriptContextType = {
    roles: [],
    addRoles: function (new_role: string | string[]): void {
        throw new Error('Function not implemented.');
    },
    clearRoles: function (): void {
        throw new Error('Function not implemented.');
    },
    getRole: function (role: string): roleType | null {
        throw new Error('Function not implemented.');
    }
};

const ScriptContext = createContext<ScriptContextType>(initialState);

const roleCache: { [role: string]: roleType; } = {};

const ScriptProvider = ({ children }) => {
    const [roles, setRoles] = useState<string[]>([]);

    const loadRole = (role: string) => {
        import(`../roles/${role}.ts`)
            .then((module) => {
                roleCache[role] = module.default;
            })
            .catch(error => {
                console.log(`Error loading role ${role}`);
                console.log(error);
            });
    };

    const addRoles = (new_role: string | string[]): void => {
        if (Array.isArray(new_role)) {
            new_role.map((r) => addRoles(r));
            return;
        }
        if (!(new_role in roleCache)) {
            loadRole(new_role);
        }

        setRoles((roles) => [...roles, new_role]);
    };

    const clearRoles = (): void => {
        setRoles([]);
    };

    const getRole = (role: string): roleType => {
        return roleCache[role];
    };

    return <ScriptContext.Provider value={{
        roles, addRoles, clearRoles,
        getRole
    }}>
        {children}
    </ScriptContext.Provider>;
};

export { ScriptProvider, ScriptContext };
