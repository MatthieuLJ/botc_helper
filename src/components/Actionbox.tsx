import React, { useContext } from "react";
import { ScriptContext, ScriptContextType } from "../state/ScriptContext.tsx";
import { roleType } from "../state/role.ts";
import { useAppSelector } from "../state/hooks.ts";
import { EventType } from "../state/EventsSlice.tsx";
import { Avatar, Button } from "@mui/material";

type ActionboxProps = {
    setEvent: (event: EventType) => void;
};

type roleInformationTypeForActions = {
    [role: string]: {
        [action: string]: Event;
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
        {Object.keys(role_infos).map((role) =>
            Object.keys(role_infos[role]).map((action) =>
                <li key={role + action}>
                    <Button 
                    startIcon={<Avatar src={getRole(role)?.icon} />}
                    onClick={()=> {props.setEvent(role_infos[role][action])}}
                    >
                        {role_infos[role].name}: {action}
                    </Button>
                </li>)
        )}
    </ul>;
}

export default Actionbox;