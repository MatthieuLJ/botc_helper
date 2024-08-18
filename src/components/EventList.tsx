import React, { useState } from "react";

import { Box, List, ListItemButton, ButtonGroup, Button } from '@mui/material';
import { mdiNotePlusOutline, mdiNoteEditOutline } from '@mdi/js';
import Icon from '@mdi/react';

import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import EventDisplay from "./EventDisplay.tsx";
import { getFilteredEvents, ChipSegment, EventSegments, addEvent, editEvent } from "../state/EventsSlice.tsx";
import AddEventDialog from "./AddEventDialog.tsx";

type EventListProps = {
    filter?: ChipSegment;
};

const EventList: React.FC<EventListProps> = ({ filter = null }) => {
    const [newEventOpen, setNewEventOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function onCloseEventDialog(e: EventSegments) {
        setNewEventOpen(false);
        if (selected === -1) {
            dispatch(addEvent({ event: e }));
        } else {
            dispatch(editEvent({ id: filtered_events[selected].id, event: e }));
        }
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

    if (selected !== -1) {
        console.log("selected is id " + filtered_events[selected].id);
    }

    return <><Box>
        <ButtonGroup>
            <Button onClick={() => { setSelected(-1); setNewEventOpen(true); }}><Icon path={mdiNotePlusOutline} size={1} /></Button>
            <Button onClick={() => { setNewEventOpen(true); }} disabled={selected === -1}><Icon path={mdiNoteEditOutline} size={1} /></Button>
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
        <AddEventDialog open={newEventOpen} onClose={onCloseEventDialog}
            initialContent={selected === -1 ? undefined : filtered_events[selected].event} />
    </>;
};

export default EventList;