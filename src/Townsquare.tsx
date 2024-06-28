import React from 'react';
import PlayerToken from './PlayerToken.tsx';

type TownsquareProps = {
    numPlayers: number
}

function Townsquare(props: TownsquareProps) {
    const players : number[] = [];
    for (let i=0; i<props.numPlayers; i++) {
        players.push(i);
    }
    return <ul>
        { players.map((number) => <PlayerToken key={number} id={number} />) }
    </ul>
}

export default Townsquare;