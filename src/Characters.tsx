import React, { useContext } from "react";
import { ScriptContext, ScriptContextType } from './game/ScriptContext.tsx';
import { roleType } from "./game/role.ts";

type CharactersPropType = {
    roles: string[] | null;
};

function Characters (props: CharactersPropType) {
    const { roles, getRole, }: ScriptContextType = useContext(ScriptContext);

    return <ul>
        {roles.map((role) => {
            const role_info: roleType | null = getRole(role);
            if (role_info == null) return null;
            return <li>{role_info.name}</li>;
        })}
    </ul>;
};