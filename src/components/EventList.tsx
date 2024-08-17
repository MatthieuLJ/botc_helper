import React, { useState } from "react";

import { List, ListItemButton } from '@mui/material';
import { useAppSelector } from "../state/hooks.ts";
import EventDisplay from "./EventDisplay.tsx";
import { getFilteredEvents, Tag } from "../state/EventsSlice.tsx";

type EventListProps = {
    filter?: Tag;
};

const EventList: React.FC<EventListProps> = ({ filter = null }) => {
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

    return <List>
        {filtered_events.map((e, index) =>
            <ListItemButton key={e.id}
                selected={index === selected}
                onClick={(event) => handleListItemClick(event, index)}>
                <EventDisplay content={e.event} />
            </ListItemButton>)}
    </List>;
};

export default EventList;