import React, { useContext } from "react";

import { TagTypes, Tag } from "../state/EventsSlice.tsx";
import { useAppSelector } from "../state/hooks.ts";
import { ScriptContext, ScriptContextType } from "../state/ScriptContext.tsx";
import { roleType } from "../state/role.ts";

import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import { mdiScriptTextOutline, mdiFaceManOutline, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import Icon from '@mdi/react';


type PlayerTagProps = {
    id: Number;
    onDelete?: (event: any) => void;
};

function PlayerTag(props: PlayerTagProps) {
    // TODO: the console is showing some warning about this selector:
    // Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.Selectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization [object Object] 
    const player = useAppSelector(
        state =>
            // TODO: change the type of p based on a type defined in PlayersSlice
            state.players.players.filter((p: { id: number, name: string, alive: boolean, claims: string[] }) => p.id === props.id));
    if (player.length === 0) {
        return <Chip
            label="player"
            avatar={<Icon path={mdiFaceManOutline} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
    } else if (player.length > 1) {
        console.log("Something weird with getting a player by id");
        return <Chip label="Error" />;
    } else {
        return <Chip
            label={player[0].name}
            avatar={<Icon path={mdiFaceManOutline} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
    }
}

type RoleTagProps = {
    role: string;
    onDelete?: (event: any) => void;
};

function RoleTag(props: RoleTagProps) {
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    const role_info: roleType | null = getRole(props.role);
    if (role_info != null) {
        return <Chip
            label={role_info.name}
            avatar={<Avatar alt="" src={role_info.icon} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
    } else {
        return <Chip
            label="role"
            avatar={<Icon path={mdiScriptTextOutline} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
    }
}

type TimeTagProps = {
    time: number;
    onDelete?: (event: any) => void;
};

function TimeTag(props: TimeTagProps) {
    const night: boolean = (props.time % 2 === 0);
    if (night) {
        return <Chip label={"night " + Math.floor((props.time + 1) / 2)}
            avatar={<Icon path={mdiWeatherNight} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
    } else {
        return <Chip label={"day " + Math.floor((props.time + 1) / 2)}
            avatar={<Icon path={mdiWeatherSunny} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
    }
}

type EventTagProps = {
    value: Tag;
    onDelete?: (event: any) => void;
};

export default function EventTag(props: EventTagProps) {
    switch (props.value[0]) {
        case TagTypes.Player:
            return <PlayerTag id={props.value[1]} {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
        case TagTypes.Role:
            return <RoleTag role={props.value[1]} {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
        case TagTypes.Time:
            return <TimeTag time={props.value[1]} {...(props.onDelete ? { onDelete: props.onDelete } : {})} />;
    }
}