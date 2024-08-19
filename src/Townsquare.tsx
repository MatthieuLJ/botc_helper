import React from 'react';
import PlayerToken from './components/PlayerToken.tsx';
import { useAppSelector } from './state/hooks.ts';

type TownsquareProps = {
    tapAction: (index: number) => void;
};

function Townsquare(props: TownsquareProps) {
    const players = useAppSelector(state => state.players.players);
    return <ul>
        {players.map((p, index) => <PlayerToken key={p.id} index={index}
            tapPlayer={() => { props.tapAction(index); }} />)}
    </ul>;
}

export default Townsquare;