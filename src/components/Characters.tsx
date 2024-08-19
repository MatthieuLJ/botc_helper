import React, { useContext } from "react";
import { ScriptContext, ScriptContextType } from '../state/ScriptContext.tsx';
import { CharacterType, roleType } from "../state/role.ts";
import { useAppSelector } from "../state/hooks.ts";

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

    return <tr>
        {props.roles.map((r) => {
            const role_info = getRole(r);
            if (role_info === null) {
                return <></>;
            }
            return <td key={r}
                onClick={() => {
                    props.tapCharacter(r);
                }}>
                <img src={role_info.icon} alt={role_info.name} height="50" width="50" />
                <p>{props.highlights?.includes(r) ? "----" : ""}</p>
            </td>;
        })}
    </tr>;
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

    const TownsFolkRoles = Object.keys(role_infos).filter((r) => role_infos[r].type === CharacterType.Townsfolk);
    const count_townsfolk = TownsFolkRoles.length;
    const first_row_count = Math.ceil(count_townsfolk / 2);
    const TownsFolkRoles1 = TownsFolkRoles.slice(0, first_row_count);
    const TownsFolkRoles2 = TownsFolkRoles.slice(first_row_count + 1);

    const OutsiderRoles = Object.keys(role_infos).filter((r) => role_infos[r].type === CharacterType.Outsider);
    const MinionRoles = Object.keys(role_infos).filter((r) => role_infos[r].type === CharacterType.Minion);
    const DemonRoles = Object.keys(role_infos).filter((r) => role_infos[r].type === CharacterType.Demon);

    // The same as above with the functionality of being able to add highlights
    return <>
        {closeDialog !== null ?
            <p onClick={() => { closeDialog(); }}>Close</p>
            : <></>}
        <table>
            <tbody>
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
            </tbody>
        </table>
    </>;
};

export default Characters;