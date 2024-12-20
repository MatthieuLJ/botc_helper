import React, { useState, useEffect, useRef } from "react";

import NoteChip from "./NoteChip.tsx";
import { NoteSegments, ChipSegment, ChipType } from "../state/NotesSlice.tsx";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import ChangePlayerChipDialog from "./ChangePlayerChipDialog.tsx";
import ChangeRoleChipDialog from "./ChangeRoleChipDialog.tsx";
import ChangeTimeChipDialog from "./ChangeTimeChipDialog.tsx";

function getTextWidth(text) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context == null) {
        return 0;
    }

    context.font = getComputedStyle(document.body).font;

    return `${(10 + context.measureText(text).width).toString()}px`;
}

type NoteInputProps = {
    content: NoteSegments,
    setContent: (e: NoteSegments) => void;
    newChip: null | ChipSegment;
};

export default function NoteInput(props: NoteInputProps) {
    const { content, setContent, newChip } = props;

    // element index and cursor position
    const [cursorPosition, setCursorPosition] = useState([-1, -1]);
    const itemsRef = useRef<Array<HTMLSpanElement | null>>([]);

    // -1 for deleted chip, +1 for inserted chip
    const [contentChanged, setContentChanged] = useState(0);
    const [editedChipIndex, setEditedChipIndex] = useState(-1);

    // When opening dialogs to change chips (TODO: combine into 1)
    const [changePlayerChipOpen, setChangePlayerChipOpen] = useState(false);
    const [changeRoleChipOpen, setChangeRoleChipOpen] = useState(false);
    const [changeTimeChipOpen, setChangeTimeChipOpen] = useState(false);

    // when the content changes
    useEffect(() => {
        let changed = false;
        const newContent: NoteSegments = [...content];

        if (newContent.length === 0) {
            newContent.push("");
            changed = true;
        } else {
            if (Array.isArray(newContent[0])) {
                newContent.splice(0, 0, "");
                changed = true;
            }
            for (let i = 0; i < newContent.length - 1; i++) {
                if (Array.isArray(newContent[i]) &&
                    Array.isArray(newContent[i + 1])) {
                    // insert an empty string to be able to insert text
                    // between chips
                    newContent.splice(i + 1, 0, "");
                    changed = true;
                } else if (!Array.isArray(newContent[i]) &&
                    !Array.isArray(newContent[i + 1])) {
                    // merge the two strings together
                    newContent[i] = newContent[i] + " " + newContent[i + 1];
                    newContent.splice(i + 1, 1);
                    changed = true;
                }
            }
            if (Array.isArray(newContent[content.length - 1])) {
                // Finish the note with a string
                newContent.splice(newContent.length, 0, "");
                changed = true;
            }
        }
        if (changed) {
            setContent(newContent);
        }
        itemsRef.current = itemsRef.current.slice(0, newContent.length);
        if ((!changed) && (contentChanged === -1) && (cursorPosition[0] !== -1)) {
            // we deleted a chip and everything should be stable now, place the
            // cursor where the chip was
            const inputRef =
                itemsRef.current[cursorPosition[0]]?.getElementsByTagName("input");
            if (inputRef !== undefined) {
                inputRef[0]?.setSelectionRange(cursorPosition[1], cursorPosition[1]);
                inputRef[0]?.focus();
            }
            setContentChanged(0);
        } else if ((!changed) && (contentChanged === 1) && (cursorPosition[0] !== -1)) {
            // we inserted a chip and everything should be stable now, place the
            // cursor right after the new chip
            const inputRef =
                itemsRef.current[cursorPosition[0] + 2]?.getElementsByTagName("input");
            if (inputRef !== undefined) {
                inputRef[0]?.setSelectionRange(0, 0);
                inputRef[0]?.focus();
            }
            setContentChanged(0);
        }
        // We only want this effect to trigger when the content is changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, setContent]);

    // inserting a new chip through the props
    useEffect(() => {
        if (newChip != null) {
            const newContent = [...content];
            const previousText = newContent[cursorPosition[0]];
            if ((cursorPosition[0] === -1) ||
                (typeof (previousText) != "string")) {
                newContent.splice(
                    newContent.length - 1,
                    0,
                    newChip
                );
            } else {
                newContent.splice(
                    cursorPosition[0],
                    1,
                    previousText.substring(0, cursorPosition[1]),
                    newChip,
                    previousText.substring(cursorPosition[1])
                );
            }
            setContentChanged(1);
            setContent(newContent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newChip]);

    function deleteChip(index) {
        const newContent = [...content];
        if (
            index > 0 &&
            index < content.length &&
            typeof content[index - 1] == "string" &&
            typeof content[index + 1] == "string"
        ) {
            const previousLength = newContent[index - 1].length;
            newContent[index - 1] =
                newContent[index - 1] + " " + newContent[index + 1];
            newContent.splice(index, 2);
            setCursorPosition([index - 1, previousLength]);
        } else {
            newContent.splice(index, 1);
        }
        setContentChanged(-1);
        setContent(newContent);
    }

    function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
        // Only need to handle if key is backspace or delete while at the start
        // or end of the field
        const field: HTMLInputElement = event.target as HTMLInputElement;
        if (!field)
            return;
        if ((event.key === 'Backspace') &&
            (field.selectionStart === 0) && (index > 0)) {
            deleteChip(index - 1);
            event.preventDefault();
        } else if ((event.key === 'Delete') &&
            (field.selectionStart === content[index].length) &&
            (index < content.length)) {
            deleteChip(index + 1);
            event.preventDefault();
        }
    }

    function changeString(index, newString) {
        const newContent = [...content];
        newContent[index] = newString;
        setContent(newContent);
    }

    return (
        <>
            <Box>
                {props.content.map((item, index) => {
                    return Array.isArray(item) ? (
                        <span key={index}
                            ref={(el) => itemsRef.current[index] = el}>
                            <NoteChip
                                value={item}
                                onDelete={() => deleteChip(index)}
                                onClick={() => {
                                    setEditedChipIndex(index);
                                    switch (item[0]) {
                                        case ChipType.Player:
                                            setChangePlayerChipOpen(true);
                                            break;
                                        case ChipType.Role:
                                            setChangeRoleChipOpen(true);
                                            break;
                                        case ChipType.Time:
                                            setChangeTimeChipOpen(true);
                                            break;
                                    }
                                }}
                            />
                        </span>
                    ) : (
                        <TextField
                            key={index}
                            value={item}
                            ref={(el) => itemsRef.current[index] = el}
                            variant="standard"
                            style={{ width: getTextWidth(item) }}
                            onChange={(e) => {
                                changeString(index, e.currentTarget.value);
                            }}
                            onBlur={(e) => {
                                if (e.target.selectionStart != null)
                                    setCursorPosition([index, e.target.selectionStart]);
                            }}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                handleKeyDown(index, event);
                            }}
                        />
                    );
                })}
            </Box >
            <ChangePlayerChipDialog
                open={changePlayerChipOpen}
                onSelected={(playerIndex: number): void => {
                    setChangePlayerChipOpen(false);
                    const newContent = [...content];
                    newContent.splice(editedChipIndex, 1,
                        [ChipType.Player, playerIndex]);
                    setContent(newContent);
                }} />
            <ChangeRoleChipDialog
                open={changeRoleChipOpen}
                onSelected={(role: string): void => {
                    setChangeRoleChipOpen(false);
                    const newContent = [...content];
                    newContent.splice(editedChipIndex, 1,
                        [ChipType.Role, role]);
                    setContent(newContent);
                }} />
            <ChangeTimeChipDialog
                open={changeTimeChipOpen}
                onSelected={(time: number): void => {
                    setChangeTimeChipOpen(false);
                    const newContent = [...content];
                    newContent.splice(editedChipIndex, 1,
                        [ChipType.Time, time]);
                    setContent(newContent);
                }}
            />
        </>
    );
}
