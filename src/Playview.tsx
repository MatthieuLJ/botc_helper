import React, { useState } from 'react';
import Townsquare from './Townsquare.tsx';
import EventList from './components/EventList.tsx';

import { Button } from '@mui/material';
import AddEventDialog from './components/AddEventDialog.tsx';
import { addEvent, EventSegments } from './state/EventsSlice.tsx';
import { useAppDispatch } from './state/hooks.ts';
import { advanceTime } from './state/TimeSlice.tsx';

type PlayviewProps = {};

function Playview(props: PlayviewProps) {
    const [newEventOpen, setNewEventOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function onNewEvent(e: EventSegments) {
        setNewEventOpen(false);
        dispatch(addEvent({ event: e }));
    }

    return <>
        <div><Townsquare /></div>
        <div><EventList /></div>
        <div>
            <Button onClick={() => { setNewEventOpen(true); }}>Add event</Button>
            <AddEventDialog open={newEventOpen} onClose={onNewEvent} />
        </div>
        <div>
            <Button onClick={() => { dispatch(advanceTime())}}>Move time forward</Button>
        </div>
    </>;
}

export default Playview;