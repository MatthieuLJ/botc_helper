
import React, { useEffect, useState } from "react";
import { EventSegments, Tag, TagTypes } from "../state/EventsSlice.tsx";
import EventInput from "./EventInput.tsx";

import { Button, Dialog } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Actionbox from "./Actionbox.tsx";

type AddEventDialogProps = {
    open: boolean,
    onClose: (event: EventSegments) => void,
};

export default function AddEventDialog(props: AddEventDialogProps) {
    const { open, onClose } = props;
    const [event, setEvent] = useState<EventSegments>([]);
    const [newTag, setNewTag] = useState<Tag | null>(null);

    function handleClose() {
        onClose(event);
    }
    useEffect(() => {
        if (open) {
            setEvent([""]);
        }
    }, [open]);

    return <Dialog open={open} onClose={handleClose}>
        <EventInput content={event} setContent={setEvent} newTag={newTag} />
        <Accordion>
            <AccordionSummary>
                Add a tag
            </AccordionSummary>
            <AccordionDetails>
                <Button onClick={() => {
                    setNewTag([TagTypes.Time, 0]);
                }}>
                    Add a time
                </Button>
                <Button onClick={() => {
                    setNewTag([TagTypes.Player, -1]);
                }}>
                    Add a player
                </Button>
                <Button onClick={() => {
                    setNewTag([TagTypes.Role, ""]);
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