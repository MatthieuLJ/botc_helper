import React from "react";

import { List, ListItem } from '@mui/material';
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

    return <List>
        {filtered_events.map((e) =>
            <ListItem>
                <EventDisplay content={e.event} key={e.id} />
            </ListItem>)}
    </List>;
};

export default EventList;