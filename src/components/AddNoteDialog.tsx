
import React, { useEffect, useState } from "react";
import { NoteSegments, ChipSegment, ChipType } from "../state/NotesSlice.tsx";
import NoteInput from "./NoteInput.tsx";

import { Button, Dialog } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Actionbox from "./Actionbox.tsx";

type AddNoteDialogProps = {
    open: boolean,
    onClose: (note: NoteSegments) => void,
    initialContent?: NoteSegments,
};

export default function AddNoteDialog(props: AddNoteDialogProps) {
    const { open, onClose, initialContent = [""] } = props;
    const [note, setNote] = useState<NoteSegments>([]);
    const [newChip, setNewChip] = useState<ChipSegment | null>(null);

    function handleClose() {
        onClose(note);
    }

    useEffect(() => {
        setNote(initialContent);
    }, [initialContent]);

    return <Dialog open={open} onClose={handleClose}>
        <NoteInput content={note} setContent={setNote} newChip={newChip} />
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
                Add a note based on a role
            </AccordionSummary>
            <AccordionDetails>
                <Actionbox
                    setNote={setNote} />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                Add a standard note
            </AccordionSummary>
            <AccordionDetails>
                <Button>
                    Move time forward
                </Button>
            </AccordionDetails>
        </Accordion>

    </Dialog>;
}