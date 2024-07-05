import React from 'react';
import { useAppSelector } from './hooks.ts';

type PlayerTokenProps = {
    index: number,
    tapPlayer: (index: number) => void
}

function PlayerToken(props: PlayerTokenProps) {
    const player_info = useAppSelector(state => state.players.players[props.index]);

    return <li onClick={() => props.tapPlayer(props.index)}>
        {player_info.name}
        
    </li>;
}

export default PlayerToken;