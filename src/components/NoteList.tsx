import React, { useState } from "react";

import { Box, List, ListItemButton, ButtonGroup, Button } from '@mui/material';
import { mdiNotePlusOutline, mdiNoteEditOutline } from '@mdi/js';
import Icon from '@mdi/react';

import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import NoteDisplay from "./NoteDisplay.tsx";
import { getFilteredNotes, ChipSegment, NoteSegments, addNote, editNote } from "../state/NotesSlice.tsx";
import AddNoteDialog from "./AddNoteDialog.tsx";

type NoteListProps = {
    filter?: ChipSegment;
};

const NoteList: React.FC<NoteListProps> = ({ filter = null }) => {
    const [noteDialogOpen, setNoteDialogOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function onCloseNoteDialog(e: NoteSegments) {
        setNoteDialogOpen(false);
        if (selected === -1) {
            dispatch(addNote({ note: e }));
        } else {
            dispatch(editNote({ id: filtered_notes[selected].id, note: e }));
        }
    }

    const notes = useAppSelector(state => state.notes);
    const filtered_notes = filter === null ?
        notes :
        getFilteredNotes(notes, filter);

    const [selected, setSelected] = useState(-1);

    function handleListItemClick(index) {
        if (selected === index) {
            setSelected(-1);
        } else {
            setSelected(index);
        }
    }

    if (selected !== -1) {
        console.log("selected is id " + filtered_notes[selected].id);
    }

    return <><Box>
        <ButtonGroup>
            <Button onClick={() => { setSelected(-1); setNoteDialogOpen(true); }}><Icon path={mdiNotePlusOutline} size={1} /></Button>
            <Button onClick={() => { setNoteDialogOpen(true); }} disabled={selected === -1}><Icon path={mdiNoteEditOutline} size={1} /></Button>
        </ButtonGroup>
        <List>
            {filtered_notes.map((e, index) =>
                <ListItemButton key={e.id}
                    selected={index === selected}
                    onClick={() => handleListItemClick(index)}>
                    <NoteDisplay content={e.note} />
                </ListItemButton>)}
        </List>
    </Box>
        <AddNoteDialog open={noteDialogOpen} onClose={onCloseNoteDialog}
            initialContent={selected === -1 ? undefined : filtered_notes[selected].note} />
    </>;
};

export default NoteList;