import React, { useContext } from "react";
import { ScriptContext, ScriptContextType } from "../game/ScriptContext.tsx";
import { roleType } from "../game/role";
import { gameTime } from "../game/gameTime";

type ActionboxProps = {};

type roleInformationTypeForActions = {
    [role: string]: {
        [action: string]: {
            start: (time: gameTime) => void, // start
            tapPlayer: (index: number) => void, // tapPlayer
            tapCharacter: (index: number) => void, // tapCharacter
            stop: (bool) => void; // stop
        };
    };
};

function Actionbox(props: ActionboxProps) {
    const { roles, getRole, }: ScriptContextType = useContext(ScriptContext);
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