import React, { useContext } from 'react';
import { useAppSelector } from '../state/hooks.ts';
import { Avatar, AvatarGroup, Box } from '@mui/material';
import { ScriptContext, ScriptContextType } from '../state/ScriptContext.tsx';

import token_background from '../img/token_background.png';

type PlayerTokenProps = {
    index: number,
    tapPlayer: (index: number) => void;
};

function PlayerToken(props: PlayerTokenProps) {
    const player_info = useAppSelector(state => state.players.players[props.index]);
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    return <li onClick={() => props.tapPlayer(props.index)}>
        <Box>
            <div>
                <AvatarGroup max={5}>
                    { player_info.claims.length === 0 ?
                    <Avatar alt="No claim" src={token_background} />
                    :
                    player_info.claims.map((c) => {
                        const role_info = getRole(c);
                        return <Avatar alt={c} src={role_info?.icon}/>
                    })}
                </AvatarGroup>
            </div>
            <div>{player_info.name}</div>
        </Box>

    </li>;
}

export default PlayerToken;