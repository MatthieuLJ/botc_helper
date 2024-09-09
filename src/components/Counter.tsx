import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks.ts';
import { setCount } from '../state/PlayersSlice.tsx';
import { Button, ButtonGroup } from '@mui/material';

const MINIMUM_PLAYER_NUMBER = 3;
const MAXIMUM_PLAYER_NUMBER = 25;

type CounterProps = {};

function Counter(props: CounterProps) {
    const [numPlayers, setNumPlayers] = useState(useAppSelector(state =>
        state.players.players).length);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCount({ count: numPlayers }));
    }, [dispatch, numPlayers]);

    return <ButtonGroup>
        <Button onClick={() => setNumPlayers(numPlayers - 1)}
            disabled={numPlayers <= MINIMUM_PLAYER_NUMBER}>-</Button>
        <Button onClick={() => setNumPlayers(numPlayers + 1)}
            disabled={numPlayers >= MAXIMUM_PLAYER_NUMBER}>+</Button>
    </ButtonGroup>;
}

export default Counter;