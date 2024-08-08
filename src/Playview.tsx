import React, { useState } from 'react';
import Townsquare from './Townsquare.tsx';
import EventList from './EventList.tsx';

import { Button } from '@mui/material';
import AddEventDialog from './components/AddEventDialog.tsx';
import { EventType } from './state/EventsSlice.tsx';

type PlayviewProps = {};

function Playview(props: PlayviewProps) {
    const [newEventOpen, setNewEventOpen] = useState<boolean>(false);

    function onNewEvent(e: EventType) {
        setNewEventOpen(false);
    }

    return <>
        <div><Townsquare /></div>
        <div><EventList /></div>
        <div>
            <Button onClick={() => {setNewEventOpen(true)}}>Add event</Button>
            <AddEventDialog open={newEventOpen} onClose={onNewEvent} />
        </div>
    </>;
}

export default Playview;