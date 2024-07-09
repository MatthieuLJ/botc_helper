import React, { useContext } from "react";
import { ScriptContext, ScriptContextType } from './game/ScriptContext.tsx';
import { roleType } from "./game/role.ts";

type CharactersPropType = {
    highlights: string[];
} | null;

function Characters(props: CharactersPropType) {
    const { roles, getRole, }: ScriptContextType = useContext(ScriptContext);


    const highlights: string[] = props?.highlights ?? [];
    const role_infos: [string, roleType, boolean][] = [];
    roles.forEach((role) => {
        const role_info: roleType | null = getRole(role);
        if (role_info != null) {
            role_infos.push([role, role_info, highlights.includes(role)]);
        }
    });

    return <ul>
        {role_infos.map((role) => {
            return <li key={role[0]}>
                <p style={{ fontWeight: role[2] ? "bold" : "normal" }}>
                    {role[1].name}
                </p>
            </li>;
        })}
    </ul>;
};

export default Characters;