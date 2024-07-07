import React from 'react';
import PlayerToken from './PlayerToken.tsx';
import { useAppSelector } from './game/hooks.ts';

type TownsquareProps = {}

function Townsquare(props: TownsquareProps) {
    const players = useAppSelector(state => state.players.players)
    return <ul>
        {players.map((p, index) => <PlayerToken key={p.id} index={index}
            tapPlayer={() => { }} />)}
    </ul>
}

export default Townsquare;