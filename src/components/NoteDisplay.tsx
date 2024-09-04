import React, { useContext } from "react";
import Box from "@mui/material/Box";

import NoteChip from "./NoteChip.tsx";
import { NoteSegments } from "../state/NotesSlice.tsx";
import { PlayContext, PlayContextType } from "../state/PlayContext.tsx";

type NoteDisplayProps = {
    content: NoteSegments;
};

export default function NoteDisplay(props: NoteDisplayProps) {
    const { hideInformation }: PlayContextType = useContext(PlayContext);
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
                            key={index}
                            {...(hideInformation ?
                                {
                                    style: {
                                        color: "transparent",
                                        textShadow: "0 0 5px rgba(0,0,0,0.5)"
                                    }
                                }
                                : {})}
                        >
                            {item}
                        </span>
                    );
                }
            })}
        </Box>
    );
}
