import React from 'react';
import { useAppSelector, useAppDispatch } from './hooks.ts';
import { decrement, increment, setPlayerNumber } from './PlayerNumberSlice.tsx';

const MINIMUM_PLAYER_NUMBER=3;
const MAXIMUM_PLAYER_NUMBER=25;

type CounterProps = {}

function Counter(props: CounterProps) {
    const numPlayers = useAppSelector(state => state.playerNumber.value);
    const dispatch = useAppDispatch(); 

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue: number = parseInt(event.target.value);
        newValue = Math.max(newValue, MINIMUM_PLAYER_NUMBER)
        newValue = Math.min(newValue, MAXIMUM_PLAYER_NUMBER);
        dispatch(setPlayerNumber(newValue));
    }

    return <>
        <button onClick={() => dispatch(decrement())} disabled={numPlayers <= MINIMUM_PLAYER_NUMBER}>-</button>
        <input value={numPlayers} type="number" onChange={onInputChange} />
        <button onClick={() => dispatch(increment())} disabled={numPlayers >= MAXIMUM_PLAYER_NUMBER}>+</button>
    </>;
}

export default Counter;