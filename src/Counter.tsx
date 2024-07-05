import React from 'react';
import { useAppSelector, useAppDispatch } from './hooks.ts';
import { decrementCount, incrementCount } from './game/PlayersSlice.tsx';

const MINIMUM_PLAYER_NUMBER=3;
const MAXIMUM_PLAYER_NUMBER=25;

type CounterProps = {}

function Counter(props: CounterProps) {
    const numPlayers = useAppSelector(state => state.players.players).length;
    const dispatch = useAppDispatch(); 

    return <>
        <button onClick={() => dispatch(decrementCount())} disabled={numPlayers <= MINIMUM_PLAYER_NUMBER}>-</button>
        {numPlayers}
        <button onClick={() => dispatch(incrementCount())} disabled={numPlayers >= MAXIMUM_PLAYER_NUMBER}>+</button>
    </>;
}

export default Counter;