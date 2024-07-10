import React, { useContext, useState } from "react";
import { ScriptContext, ScriptContextType } from './game/ScriptContext.tsx';
import { roleType } from "./game/role.ts";

type CharactersPropType = {
    highlights: string[] | null,
    closeDialog: (highlights: string[] | null) => void;
};

function Characters(props: CharactersPropType) {
    const { roles, getRole, }: ScriptContextType = useContext(ScriptContext);
    // Only going to be used if we enable highlights, but it needs to be on top
    const [highlights, setHighlights] = useState<string[]>(props?.highlights ?? []);

    // Get all the roles information
    const role_infos: [string, roleType, boolean][] = [];
    roles.forEach((role) => {
        const role_info: roleType | null = getRole(role);
        if (role_info != null) {
            role_infos.push([role, role_info, highlights.includes(role)]);
        }
    });

    // Basic case where we don't care about highlights
    if (props.highlights == null) {
        return <>
            <p onClick={() => { props.closeDialog(highlights); }}>X</p>
            <ul>
                {role_infos.map((role) => {
                    return <li key={role[0]}>
                        <p>
                            {role[1].name}
                        </p>
                    </li>;
                })}
            </ul>
        </>;

    }

    // The same as above with the functionality of being able to add highlights
    return <>
        <p onClick={() => { props.closeDialog(highlights); }}>X</p>
        <ul>
            {role_infos.map((role) => {
                return <li key={role[0]}>
                    <p style={{ fontWeight: role[2] ? "bold" : "normal" }}
                        onClick={() => {
                            if (highlights.includes(role[0])) {
                                setHighlights(highlights.filter((r) => r !== role[0]));
                            } else {
                                setHighlights([...highlights, role[0]]);
                            }
                        }}>
                        {role[1].name}
                    </p>
                </li>;
            })}
        </ul>
    </>;
};

export default Characters;