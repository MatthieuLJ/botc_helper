import React, { useContext } from "react";
import { ScriptContext, ScriptContextType } from "../state/ScriptContext.tsx";
import { roleType } from "../state/role.ts";
import { useAppSelector } from "../state/hooks.ts";

type ActionboxProps = {};

type roleInformationTypeForActions = {
    [role: string]: {
        [action: string]: {
            start: () => void, // start
            tapPlayer: (index: number) => void, // tapPlayer
            tapCharacter: (role: string) => void, // tapCharacter
            tapTime: (time: number) => void, // tapTime
            stop: (bool) => void // stop
        };
    };
};

function Actionbox(props: ActionboxProps) {
    const roles = useAppSelector(state => state.roles.roles);
    const { getRole }: ScriptContextType = useContext(ScriptContext);
    const role_infos: roleInformationTypeForActions[] = [];

    roles.forEach((role) => {
        const role_info: roleType | null = getRole(role);
        if (role_info != null) {
            role_infos[role] = role_info.actions;
        }
    });

    return <ul>
        {Object.keys(role_infos).map((role, index) =>
            Object.keys(role_infos[role]).map((action, index) => <li key={role + action}>{role}: {action}</li>)
        )}
    </ul>;
}

export default Actionbox;