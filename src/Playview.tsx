import React from 'react';
import Townsquare from './Townsquare.tsx';
import EventList from './components/EventList.tsx';

import { Button } from '@mui/material';
import { advanceTime } from './state/TimeSlice.tsx';
import { useAppDispatch } from './state/hooks.ts';

type PlayviewProps = {};

function Playview(props: PlayviewProps) {
    const dispatch = useAppDispatch();

    return <>
        <div><Townsquare /></div>
        <div><EventList /></div>
        <div>
            <Button onClick={() => { dispatch(advanceTime()); }}>Move time forward</Button>
        </div>
    </>;
}

export default Playview;