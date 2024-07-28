import React, { useContext, useState } from "react";
import { ScriptContext, ScriptContextType } from '../state/ScriptContext.tsx';
import { CharacterType, roleType } from "../state/role.ts";
import { useAppSelector } from "../state/hooks.ts";

type CharactersPropType = {
    highlights: string[] | null,
    closeDialog: (highlights: string[] | null) => void;
};

// name of the role, all the information, whether it is highlighted
type roleInformationTypeForCharacters = [string, roleType, boolean];

type CharactersRowPropType = {
    roles: roleInformationTypeForCharacters[];
};

function CharactersRow(props: CharactersRowPropType) {
    return <tr>
        {props.roles.map((r) => {
            return <td key={r[0]}>
                <img src={r[1].icon} alt={r[1].name} height="50" width="50" />
            </td>;
        })
        }
    </tr>;
}

type CharactersRowHighlightsPropType = {
    roles: roleInformationTypeForCharacters[];
    highlights: string[];
    setHighlights: (highlights: string[]) => void;
};

function CharactersRowHighlights(props: CharactersRowHighlightsPropType) {
    return <tr>
        {props.roles.map((r) => {
            return <td key={r[0]}
                onClick={() => {
                    if (r[2]) {
                        props.setHighlights(props.highlights.filter((ro) => ro !== r[0]));
                    } else {
                        props.setHighlights([...props.highlights, r[0]]);
                    }
                }}
            >
                <img src={r[1].icon} alt={r[1].name} height="50" width="50" />
                <p>{r[2] ? "----" : null}</p>
            </td>;
        })}
    </tr>;
}

function Characters(props: CharactersPropType) {
    const roles = useAppSelector(state => state.roles.roles);
    const { getRole }: ScriptContextType = useContext(ScriptContext);
    // Only going to be used if we enable highlights, but it needs to be on top
    const [highlights, setHighlights] = useState<string[]>(props?.highlights ?? []);

    // Get all the roles information
    const role_infos: roleInformationTypeForCharacters[] = [];
    roles.forEach((role) => {
        const role_info: roleType | null = getRole(role);
        if (role_info != null) {
            role_infos.push([role, role_info, highlights.includes(role)]);
        }
    });

    const TownsFolkRoles = role_infos.filter((e) => e[1].type === CharacterType.Townsfolk);
    const count_townsfolk = TownsFolkRoles.length;
    const first_row_count = Math.ceil(count_townsfolk / 2);
    const TownsFolkRoles1 = TownsFolkRoles.slice(0, first_row_count);
    const TownsFolkRoles2 = TownsFolkRoles.slice(first_row_count + 1);

    const OutsiderRoles = role_infos.filter((e) => e[1].type === CharacterType.Outsider);
    const MinionRoles = role_infos.filter((e) => e[1].type === CharacterType.Minion);
    const DemonRoles = role_infos.filter((e) => e[1].type === CharacterType.Demon);

    // Basic case where we don't care about highlights
    if (props.highlights == null) {
        return <>
            <p onClick={() => { props.closeDialog(highlights); }}>X</p>
            <table>
                <tbody>
                    <CharactersRow roles={TownsFolkRoles1} />
                    <CharactersRow roles={TownsFolkRoles2} />
                    <CharactersRow roles={OutsiderRoles} />
                    <CharactersRow roles={MinionRoles} />
                    <CharactersRow roles={DemonRoles} />
                </tbody>
            </table>
        </>;

    }

    // The same as above with the functionality of being able to add highlights
    return <>
        <p onClick={() => { props.closeDialog(highlights); }}>X</p>
        <table>
            <tbody>
                <CharactersRowHighlights roles={TownsFolkRoles1} highlights={highlights} setHighlights={setHighlights} />
                <CharactersRowHighlights roles={TownsFolkRoles2} highlights={highlights} setHighlights={setHighlights} />
                <CharactersRowHighlights roles={OutsiderRoles} highlights={highlights} setHighlights={setHighlights} />
                <CharactersRowHighlights roles={MinionRoles} highlights={highlights} setHighlights={setHighlights} />
                <CharactersRowHighlights roles={DemonRoles} highlights={highlights} setHighlights={setHighlights} />
            </tbody>
        </table>
    </>;
};

export default Characters;