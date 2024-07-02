import React from 'react';
import PlayerToken from './PlayerToken.tsx';
import { useAppSelector  } from './hooks.ts';

type TownsquareProps = {}

function Townsquare(props: TownsquareProps) {
    const numPlayers = useAppSelector(state => state.playerNumber.value);
    const players : number[] = [];
    for (let i=0; i<numPlayers; i++) {
        players.push(i);
    }
    return <ul>
        { players.map((number) => <PlayerToken key={number} id={number} />) }
    </ul>
}

export default Townsquare;