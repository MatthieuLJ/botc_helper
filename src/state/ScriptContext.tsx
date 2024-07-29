import React, { useCallback, useEffect } from 'react';
import { createContext, useState } from 'react';
import { roleType } from './role.ts';
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
    const [numberRolesToLoad, setNumberRolesToLoad] = useState<number>(0);
    const roles = useAppSelector(state => state.roles.roles);

    const loadRole = useCallback((role: string) => {
        if (Object.keys(roleCache).indexOf(role) === -1) {
            import(`../roles/${role}.ts`)
                .then((module) => {
                    roleCache[role] = module.default;
                })
                .catch(error => {
                    console.log(`Error loading role ${role}`);
                    console.log(error);
                }).finally( () => {
                    setNumberRolesToLoad(prevState => prevState - 1)
                });
        }
    }, []);

    const loadRoles = useCallback((roles_to_load: string[]): void => {
        const new_roles = roles_to_load.filter((x) => !Object.keys(roleCache).includes(x));
        if (new_roles.length > 0) {
            setNumberRolesToLoad(new_roles.length);
            new_roles.map((r) => loadRole(r));
        } else {
            setLoading(false);
        }
    }, [loadRole]);

    const getRole = (role: string): roleType => {
        if (Object.keys(roleCache).indexOf(role) === -1) {
            // throw an error, we should have loaded before
        }
        return roleCache[role];
    };

    useEffect(() => {
        setLoading(true);
        loadRoles(roles);
    }, [loadRoles, roles]);

    useEffect(() => {
        console.log("Got "+numberRolesToLoad+" roles to load");
        if ((numberRolesToLoad > 0) && !rolesLoading) {
            setLoading(true);
        } else if ((numberRolesToLoad === 0) && rolesLoading) {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberRolesToLoad]);

    return <ScriptContext.Provider value={{
        getRole, rolesLoading
    }}>
        {children}
    </ScriptContext.Provider>;
};

export { ScriptProvider, ScriptContext };
