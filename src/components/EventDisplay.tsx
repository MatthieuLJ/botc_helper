import React from "react";
import Box from "@mui/material/Box";

import EventTag from "./EventTag.tsx";
import { EventType } from "../state/EventsSlice.tsx";

type EventDisplayProps = {
    content: EventType;
};

export default function EventDisplay(props: EventDisplayProps) {
    return (
        <Box>
            {props.content.map((item, index) => {
                if (Array.isArray(item)) {
                    return (
                        <EventTag
                            key={index}
                            value={item}
                        />
                    );
                } else {
                    return (
                        <> {item} </>
                    );
                }
            })}
        </Box>
    );
}
