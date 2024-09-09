import React, { useContext } from "react";
import { ScriptContext, ScriptContextType } from '../state/ScriptContext.tsx';
import { CharacterType, roleType } from "../state/role.ts";
import { useAppSelector } from "../state/hooks.ts";
import { Button } from "@mui/material";

import halo from '../img/halo.gif';

type CharactersPropType = {
    tapCharacter: (character: string) => void,
    highlights?: string[] | null,
    closeDialog?: () => void;
};

type CharactersRowPropType = {
    roles: string[];
    highlights?: string[] | null;
    tapCharacter: (character: string) => void,
};

function CharactersRow(props: CharactersRowPropType) {
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    const good_style = { filter: "hue-rotate(65deg)", contrast: "200%" };
    const evil_style = { filter: "hue-rotate(175deg)", contrast: "200%" };

    return <div className="flex flex-row justify-around">
        {props.roles.map((r) => {
            const role_info = getRole(r);
            if (role_info === null) {
                return <></>;
            }
            return <div className="grow-0 h-[50px] w-[50px] relative"
                onClick={() => {
                    props.tapCharacter(r);
                }}>
                {props.highlights?.includes(r) ?
                    <img style={role_info.type==CharacterType.Townsfolk || role_info.type==CharacterType.Outsider ? good_style : evil_style}
                     className="absolute top-0 left-0 h-full w-full" src={halo} />
                    :
                    <></>}
                <img className="absolute top-0 left-0 h-full w-full" src={role_info.icon} alt={role_info.name} />

            </div>;
        })}
    </div>;
}

function Characters(props: CharactersPropType) {
    const roles_in_play: string[] = useAppSelector(state => state.roles.roles);
    const { getRole }: ScriptContextType = useContext(ScriptContext);
    const { tapCharacter, highlights = [], closeDialog = null } = props;

    // Get all the roles information
    const role_infos: { [role: string]: roleType; }[] = [];
    roles_in_play.forEach((role) => {
        const role_info: roleType | null = getRole(role);
        if (role_info != null) {
            role_infos[role] = role_info;
        }
    });

    const TownsFolkRoles = Object.keys(role_infos).filter((r) =>
        role_infos[r].type === CharacterType.Townsfolk);
    const count_townsfolk = TownsFolkRoles.length;
    const first_row_count = Math.ceil(count_townsfolk / 2);
    const TownsFolkRoles1 = TownsFolkRoles.slice(0, first_row_count - 1);
    const TownsFolkRoles2 = TownsFolkRoles.slice(first_row_count);
    const OutsiderRoles = Object.keys(role_infos).filter((r) =>
        role_infos[r].type === CharacterType.Outsider);
    const MinionRoles = Object.keys(role_infos).filter((r) =>
        role_infos[r].type === CharacterType.Minion);
    const DemonRoles = Object.keys(role_infos).filter((r) =>
        role_infos[r].type === CharacterType.Demon);

    // The same as above with the functionality of being able to add highlights
    return <>
        {closeDialog !== null ?
            <Button onClick={() => { closeDialog(); }}>Close</Button>
            : <></>}
        <div className="flex flex-col" aria-label="Characters">
            <CharactersRow
                roles={TownsFolkRoles1}
                {...(props.highlights ? { highlights: highlights } : {})}
                tapCharacter={tapCharacter} />
            <CharactersRow roles={TownsFolkRoles2}
                {...(props.highlights ? { highlights: highlights } : {})}
                tapCharacter={tapCharacter} />
            <CharactersRow roles={OutsiderRoles}
                {...(props.highlights ? { highlights: highlights } : {})}
                tapCharacter={tapCharacter} />
            <CharactersRow roles={MinionRoles}
                {...(props.highlights ? { highlights: highlights } : {})}
                tapCharacter={tapCharacter} />
            <CharactersRow roles={DemonRoles}
                {...(props.highlights ? { highlights: highlights } : {})}
                tapCharacter={tapCharacter} />
        </div>
    </>;
};

export default Characters;