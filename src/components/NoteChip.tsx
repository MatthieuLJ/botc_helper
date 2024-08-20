import React, { useContext } from "react";

import { ChipType, ChipSegment } from "../state/NotesSlice.tsx";
import { useAppSelector } from "../state/hooks.ts";
import { ScriptContext, ScriptContextType } from "../state/ScriptContext.tsx";
import { roleType } from "../state/role.ts";

import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import { mdiScriptTextOutline, mdiFaceManOutline, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import Icon from '@mdi/react';


type PlayerChipProps = {
    index: number;
    onDelete?: (note: any) => void;
    onClick?: (note: any) => void;
};

function PlayerChip(props: PlayerChipProps) {
    // TODO: the console is showing some warning about this selector:
    // Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.Selectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization [object Object] 
    const players = useAppSelector(
        state => state.players.players);
    if (props.index < 0) {
        return <Chip
            label="player"
            avatar={<Icon path={mdiFaceManOutline} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})}
            {...(props.onClick ? { onClick: props.onClick } : {})} />;
    } else {
        const player = players[props.index];
        return <Chip
            label={player.name}
            avatar={<Icon path={mdiFaceManOutline} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})}
            {...(props.onClick ? { onClick: props.onClick } : {})} />;
    }
}

type RoleChipProps = {
    role: string;
    onDelete?: (note: any) => void;
    onClick?: (note: any) => void;
};

function RoleChip(props: RoleChipProps) {
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    const role_info: roleType | null = getRole(props.role);
    if (role_info != null) {
        return <Chip
            label={role_info.name}
            avatar={<Avatar alt="" src={role_info.icon} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})}
            {...(props.onClick ? { onClick: props.onClick } : {})} />;
    } else {
        return <Chip
            label="role"
            avatar={<Icon path={mdiScriptTextOutline} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})}
            {...(props.onClick ? { onClick: props.onClick } : {})} />;
    }
}

type TimeChipProps = {
    time: number;
    onDelete?: (note: any) => void;
    onClick?: (note: any) => void;
};

function TimeChip(props: TimeChipProps) {
    const night: boolean = (props.time % 2 === 0);
    if (night) {
        return <Chip label={"night " + Math.floor((props.time / 2) + 1)}
            avatar={<Icon path={mdiWeatherNight} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})}
            {...(props.onClick ? { onClick: props.onClick } : {})} />;
    } else {
        return <Chip label={"day " + Math.floor((props.time / 2) + 1)}
            avatar={<Icon path={mdiWeatherSunny} />}
            variant="outlined"
            {...(props.onDelete ? { onDelete: props.onDelete } : {})}
            {...(props.onClick ? { onClick: props.onClick } : {})} />;
    }
}

type NoteChipProps = {
    value: ChipSegment;
    onDelete?: (note: any) => void;
    onClick?: (note: any) => void;
};

export default function NoteChip(props: NoteChipProps) {
    switch (props.value[0]) {
        case ChipType.Player:
            return <PlayerChip index={props.value[1]}
                {...(props.onDelete ? { onDelete: props.onDelete } : {})}
                {...(props.onClick ? { onClick: props.onClick } : {})}
            />;
        case ChipType.Role:
            return <RoleChip role={props.value[1]}
                {...(props.onDelete ? { onDelete: props.onDelete } : {})}
                {...(props.onClick ? { onClick: props.onClick } : {})}
            />;
        case ChipType.Time:
            return <TimeChip time={props.value[1]}
                {...(props.onDelete ? { onDelete: props.onDelete } : {})}
                {...(props.onClick ? { onClick: props.onClick } : {})}
            />;
    }
}