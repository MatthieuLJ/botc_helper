import React, { useCallback, useEffect } from 'react';
import { createContext, useState } from 'react';
import { roleType } from './role.ts';
import { useAppSelector } from './hooks.ts';
import { CircularProgress } from '@mui/material';

export type ScriptContextType = {
    getRole: (role: string) => roleType | null;
};

const initialState: ScriptContextType = {
    getRole: function (role: string): roleType | null {
        throw new Error('Function not implemented.');
    }
};

const ScriptContext = createContext<ScriptContextType>(initialState);

const roleCache: { [role: string]: roleType; } = {};

const ScriptProvider = ({ children }) => {
    const [rolesToLoad, setRolesToLoad] = useState<string[]>([]);
    const roles = useAppSelector(state => state.roles.roles);

    function loadRole(role: string) {
        if (Object.keys(roleCache).indexOf(role) === -1) {
            import(`../roles/${role}.ts`)
                .then((module) => {
                    roleCache[role] = module.default;
                })
                .catch(error => {
                    console.log(`Error loading role ${role}`);
                    console.log(error);
                }).finally(() => {
                    const newRolesToLoad = [...rolesToLoad];
                    newRolesToLoad.splice(rolesToLoad.indexOf(role), 1);

                    setRolesToLoad(newRolesToLoad);
                });
        } else {
            const newRolesToLoad = [...rolesToLoad];
            newRolesToLoad.splice(rolesToLoad.indexOf(role), 1);
            setRolesToLoad(newRolesToLoad);
        }
    }

    useEffect(() => {
        if (rolesToLoad.length > 0) {
            loadRole(rolesToLoad[0]);
        }
    }, [rolesToLoad]);


    useEffect(() => {
        if (roles.length > 0) {
            const new_roles = roles.filter(
                (x) => !Object.keys(roleCache).includes(x)
            );
            if (new_roles.length > 0) {
                setRolesToLoad(new_roles);
            }
        }
    }, [roles]);

    const getRole = (role: string): roleType => {
        if (Object.keys(roleCache).indexOf(role) === -1) {
            // throw an error, we should have loaded before
        }
        return roleCache[role];
    };

    return <ScriptContext.Provider value={{
        getRole
    }}>
        {children}
        {rolesToLoad.length > 0 ?
            <div className="h-screen w-screen absolute top-0 left-0 flex 
            items-center justify-center bg-slate-400/50">
                <CircularProgress />
            </div>
            :
            <></>}
    </ScriptContext.Provider>;
};

export { ScriptProvider, ScriptContext };
