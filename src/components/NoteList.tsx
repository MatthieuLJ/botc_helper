import React, { useState } from "react";

import { List, ListItemButton, ButtonGroup, Button } from '@mui/material';
import { mdiNotePlusOutline, mdiNoteEditOutline, mdiNoteRemoveOutline } from '@mdi/js';
import Icon from '@mdi/react';

import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import NoteDisplay from "./NoteDisplay.tsx";
import { getFilteredNotes, ChipSegment, NoteSegments, addNote, editNote, deleteNote } from "../state/NotesSlice.tsx";
import AddNoteDialog from "./EditNoteDialog.tsx";

type NoteListProps = {
    filter?: ChipSegment;
};

const NoteList: React.FC<NoteListProps> = ({ filter = null }) => {
    const [noteDialogOpen, setNoteDialogOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function onCloseNoteDialog(e: NoteSegments) {
        setNoteDialogOpen(false);
        if ((e.length === 0) ||
            ((e.length === 1) && (e[0] === ""))) {
            return;
        }
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

    return <>
        <div className="flex flex-col max-h-full">
            <div className="flex-none h-fit">
                <ButtonGroup>
                    <Button onClick={() => { setSelected(-1); setNoteDialogOpen(true); }}><Icon path={mdiNotePlusOutline} size={1} /></Button>
                    <Button onClick={() => { setNoteDialogOpen(true); }} disabled={selected === -1}><Icon path={mdiNoteEditOutline} size={1} /></Button>
                    <Button onClick={() => { dispatch(deleteNote({ id: filtered_notes[selected].id })); setSelected(-1); }} disabled={selected === -1}><Icon path={mdiNoteRemoveOutline} size={1} /></Button>
                </ButtonGroup>
            </div>
            <div className="flex-1 overflow-auto">
                <List sx={{ maxHeight: "100%" }} >
                {
                    filtered_notes.map((e, index) =>
                        <ListItemButton key={e.id}
                            selected={index === selected}
                            onClick={() => handleListItemClick(index)}>
                            <NoteDisplay content={e.note} />
                        </ListItemButton>)
                }
                </List>
        </div>
    </div >
        <AddNoteDialog open={noteDialogOpen} onClose={onCloseNoteDialog}
            initialContent={selected === -1 ? [""] : filtered_notes[selected].note} />
    </>;
};

export default NoteList;