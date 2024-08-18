
import React, { useEffect, useState } from "react";
import { EventSegments, ChipSegment, ChipType } from "../state/EventsSlice.tsx";
import EventInput from "./EventInput.tsx";

import { Button, Dialog } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Actionbox from "./Actionbox.tsx";

type AddEventDialogProps = {
    open: boolean,
    onClose: (event: EventSegments) => void,
    initialContent?: EventSegments,
};

export default function AddEventDialog(props: AddEventDialogProps) {
    const { open, onClose, initialContent = [""] } = props;
    const [event, setEvent] = useState<EventSegments>([]);
    const [newChip, setNewChip] = useState<ChipSegment | null>(null);

    function handleClose() {
        onClose(event);
    }

    useEffect(() => {
        setEvent(initialContent);
    }, [initialContent]);

    return <Dialog open={open} onClose={handleClose}>
        <EventInput content={event} setContent={setEvent} newChip={newChip} />
        <Accordion>
            <AccordionSummary>
                Add a chip
            </AccordionSummary>
            <AccordionDetails>
                <Button onClick={() => {
                    setNewChip([ChipType.Time, 0]);
                }}>
                    Add a time
                </Button>
                <Button onClick={() => {
                    setNewChip([ChipType.Player, -1]);
                }}>
                    Add a player
                </Button>
                <Button onClick={() => {
                    setNewChip([ChipType.Role, ""]);
                }}>
                    Add a role
                </Button>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                Add an event based on a role
            </AccordionSummary>
            <AccordionDetails>
                <Actionbox
                    setEvent={setEvent} />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                Add a standard event
            </AccordionSummary>
            <AccordionDetails>
                <Button>
                    Move time forward
                </Button>
            </AccordionDetails>
        </Accordion>

    </Dialog>;
}