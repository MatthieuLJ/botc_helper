import React from 'react';
import PlayerToken from './components/PlayerToken.tsx';
import { useAppSelector } from './game/hooks.ts';
import { useNavigate } from 'react-router-dom';

type TownsquareProps = {}

function Townsquare(props: TownsquareProps) {
    const navigate = useNavigate();
    const players = useAppSelector(state => state.players.players)
    return <ul>
        {players.map((p, index) => <PlayerToken key={p.id} index={index}
            tapPlayer={() => { return navigate(`/player/${index}`)}} />)}
    </ul>
}

export default Townsquare;