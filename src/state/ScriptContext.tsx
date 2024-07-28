import React, { useCallback, useEffect } from 'react';
import { createContext, useState } from 'react';
import { CharacterType, roleType } from './role.ts';
import { useAppSelector } from './hooks.ts';

export type ScriptContextType = {
    getRole: (role: string) => roleType | null;
    rolesLoading: boolean;
};

const initialState: ScriptContextType = {
    getRole: function (role: string): roleType | null {
        throw new Error('Function not implemented.');
    },
    rolesLoading: true
};

const ScriptContext = createContext<ScriptContextType>(initialState);

const roleCache: { [role: string]: roleType; } = {};

const ScriptProvider = ({ children }) => {
    const [rolesLoading, setLoading] = useState<boolean>(true);
    const roles = useAppSelector(state => state.roles.roles);

    const loadRole = (role: string) => {
        if (Object.keys(roleCache).indexOf(role) === -1) {
            import(`../roles/${role}.ts`)
                .then((module) => {
                    roleCache[role] = module.default;
                })
                .catch(error => {
                    console.log(`Error loading role ${role}`);
                    console.log(error);
                });
        }
    };

    const loadRoles = useCallback((roles_to_load: string | string[]): void => {
        if (Array.isArray(roles_to_load)) {
            const new_roles = roles_to_load.filter((x) => !Object.keys(roleCache).includes(x));
            if (new_roles.length > 0) {
                new_roles.map((r) => loadRole(r));
            }
            return;
        }
        if (!(roles_to_load in roleCache)) {
            loadRole(roles_to_load);
        }

        setLoading(false);
    }, []);

    const getRole = (role: string): roleType => {
        if (rolesLoading) {
            return {
                name: "",
                icon: "",
                type: CharacterType.Townsfolk,
                ability: "",
                actions: {}
            };
        }
        if (Object.keys(roleCache).indexOf(role) === -1) {
            loadRoles(role);
        }
        return roleCache[role];
    };

    useEffect( () => {
        loadRoles(roles);
        setLoading(false);
    }, [loadRoles, roles]);
    
    return <ScriptContext.Provider value={{
        getRole, rolesLoading
    }}>
        {children}
    </ScriptContext.Provider>;
};

export { ScriptProvider, ScriptContext };
