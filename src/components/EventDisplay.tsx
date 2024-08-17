import React from "react";
import Box from "@mui/material/Box";

import EventChip from "./EventChip.tsx";
import { EventSegments } from "../state/EventsSlice.tsx";

type EventDisplayProps = {
    content: EventSegments;
};

export default function EventDisplay(props: EventDisplayProps) {
    return (
        <Box>
            {props.content.map((item, index) => {
                if (Array.isArray(item)) {
                    return (
                        <EventChip
                            key={index}
                            value={item}
                        />
                    );
                } else {
                    return (
                        <span
                            key={index}>
                            {item}
                        </span>
                    );
                }
            })}
        </Box>
    );
}
