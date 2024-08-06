import React, { useContext } from "react";

import { EventTypes, Tag } from "../state/EventsSlice.tsx";
import { useAppSelector } from "../state/hooks.ts";
import { ScriptContext, ScriptContextType } from "../state/ScriptContext.tsx";
import { roleType } from "../state/role.ts";

import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import { mdiScriptTextOutline, mdiFaceManOutline, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import Icon from '@mdi/react';


type PlayerTagProps = {
    id: Number;
};

function PlayerTag(props: PlayerTagProps) {
    const player = useAppSelector(
        state =>
            state.players.players.filter(p => p.id === props.id));
    if (player.length === 0) {
        return <Chip
            label="player"
            avatar={<Icon path={mdiFaceManOutline} />}
            variant="outlined" />;
    } else if (player.length > 1) {
        console.log("Something weird with getting a player by id");
        return <Chip label="Error" />;
    } else {
        return <Chip
            label={player[0].name}
            avatar={<Icon path={mdiFaceManOutline} />}
            variant="outlined" />;
    }
}

type RoleTagProps = {
    role: string;
};

function RoleTag(props: RoleTagProps) {
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    const role_info: roleType | null = getRole(props.role);
    if (role_info != null) {
        return <Chip
            label={role_info.name}
            avatar={<Avatar alt="" src={role_info.icon} />}
            variant="outlined" />;
    } else {
        return <Chip
            label="role"
            avatar={<Icon path={mdiScriptTextOutline} />}
            variant="outlined" />;
    }
}

type TimeTagProps = {
    time: number;
};

function TimeTag(props: TimeTagProps) {
    const night: boolean = (props.time % 2 === 0 ? true : false);
    if (night) {
        return <Chip label={"night " + Math.floor((props.time + 1) / 2)}
            avatar={<Icon path={mdiWeatherNight} />}
            variant="outlined" />;
    } else {
        return <Chip label={"day " + Math.floor((props.time + 1) / 2)}
            avatar={<Icon path={mdiWeatherSunny} />}
            variant="outlined" />;
    }
}

type EventTagProps = {
    value: Tag;
};

export default function EventTag(props: EventTagProps) {
    switch (props.value[0]) {
        case EventTypes.Player:
            return <PlayerTag id={props.value[1]} />;
        case EventTypes.Role:
            return <RoleTag role={props.value[1]} />;
        case EventTypes.Time:
            return <TimeTag time={props.value[1]} />;
    }
}