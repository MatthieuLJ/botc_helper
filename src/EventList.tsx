import React from "react";

import { List, ListItem } from '@mui/material';
import { useAppSelector } from "./state/hooks.ts";
import EventDisplay from "./components/EventDisplay.tsx";

export default function EventList(props) {
    const events = useAppSelector(
        state => state.events.events);

    return <List>
       {events.map((e) => 
       <ListItem>
        <EventDisplay content={e.event} key={e.id} />
       </ListItem>)} 
    </List>
}