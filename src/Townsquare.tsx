import React from 'react';
import PlayerToken from './PlayerToken.tsx';
import { useAppSelector  } from './hooks.ts';

type TownsquareProps = {}

function Townsquare(props: TownsquareProps) {
    const players = useAppSelector(state => state.players.players)
    return <ul>
        { players.map((p,index) => <PlayerToken key={p.id} index={index} />) }
    </ul>
}

export default Townsquare;