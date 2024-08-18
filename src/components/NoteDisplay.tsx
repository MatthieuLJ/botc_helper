import React from "react";
import Box from "@mui/material/Box";

import NoteChip from "./NoteChip.tsx";
import { NoteSegments } from "../state/NotesSlice.tsx";

type NoteDisplayProps = {
    content: NoteSegments;
};

export default function NoteDisplay(props: NoteDisplayProps) {
    return (
        <Box>
            {props.content.map((item, index) => {
                if (Array.isArray(item)) {
                    return (
                        <NoteChip
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
