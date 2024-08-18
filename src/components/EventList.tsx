import React, { useState } from "react";

import { Box, List, ListItemButton, ButtonGroup, Button } from '@mui/material';
import { mdiNotePlusOutline } from '@mdi/js';
import Icon from '@mdi/react';

import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import EventDisplay from "./EventDisplay.tsx";
import { getFilteredEvents, ChipSegment, EventSegments, addEvent } from "../state/EventsSlice.tsx";
import AddEventDialog from "./AddEventDialog.tsx";

type EventListProps = {
    filter?: ChipSegment;
};

const EventList: React.FC<EventListProps> = ({ filter = null }) => {
    const [newEventOpen, setNewEventOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function onNewEvent(e: EventSegments) {
        setNewEventOpen(false);
        dispatch(addEvent({ event: e }));
    }

    const events = useAppSelector(state => state.events);
    const filtered_events = filter === null ?
        events :
        getFilteredEvents(events, filter);
    const [selected, setSelected] = useState(-1);

    function handleListItemClick(event, index) {
        if (selected === index) {
            setSelected(-1);
        } else {
            setSelected(index);
        }
    }

    return <><Box>
        <ButtonGroup>
            <Button onClick={() => { setNewEventOpen(true); }}><Icon path={mdiNotePlusOutline} size={1} /></Button>
        </ButtonGroup>
        <List>
            {filtered_events.map((e, index) =>
                <ListItemButton key={e.id}
                    selected={index === selected}
                    onClick={(event) => handleListItemClick(event, index)}>
                    <EventDisplay content={e.event} />
                </ListItemButton>)}
        </List>
    </Box>
        <AddEventDialog open={newEventOpen} onClose={onNewEvent} />
    </>;
};

export default EventList;