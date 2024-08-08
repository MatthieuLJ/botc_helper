import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import EventTag from "./EventTag.tsx";
import { EventType, Tag } from "../state/EventsSlice.tsx";

import TextField from "@mui/material/TextField";

function getTextWidth(text) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context == null) {
        return 0;
    }

    context.font = getComputedStyle(document.body).font;
    console.log(
        "Computed for " + text + " is " + context.measureText(text).width
    );

    return (10 + context.measureText(text).width).toString() + "px";
}

type EventInputProps = {
    content: EventType,
    setContent: (e: EventType) => void;
    newTag: null | Tag;
};

export default function EventInput(props: EventInputProps) {
    const { content, setContent, newTag } = props;
    const [cursorPosition, setCursorPosition] = useState([-1, -1]);

    useEffect(() => {
        var changed = false;
        const newContent: EventType = [...content];

        if (newContent.length === 0) {
            newContent.push("");
            changed = true;
        } else {
            if (Array.isArray(newContent[0])) {
                newContent.splice(0, 0, "");
                changed = true;
            }
            for (var i = 0; i < newContent.length - 1; i++) {
                if (Array.isArray(newContent[i]) && Array.isArray(newContent[i + 1])) {
                    // insert an empty string to be able to insert text between tags
                    newContent.splice(i + 1, 0, "");
                    changed = true;
                }
            }
            if (Array.isArray(newContent[content.length - 1])) {
                newContent.splice(newContent.length, 0, "");
                changed = true;
            }
        }
        if (changed) {
            setContent(newContent);
        }
    }, [content, setContent]);

    useEffect(() => {
        if (newTag != null) {
            const newContent = [...content];
            const previousText = newContent[cursorPosition[0]];
            if ((cursorPosition[0] === -1) || (typeof (previousText) != "string")) {
                newContent.splice(
                    newContent.length - 1,
                    0,
                    newTag
                );
            } else {
                newContent.splice(
                    cursorPosition[0],
                    1,
                    previousText.substring(0, cursorPosition[1]),
                    newTag,
                    previousText.substring(cursorPosition[1])
                );
            }
            setContent(newContent);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTag]);

    /*
    function deleteChip(index) {
        const newContent = [...content];
        if (
            index > 0 &&
            index < content.length &&
            typeof content[index - 1] == "string" &&
            typeof content[index + 1] == "string"
        ) {
            newContent[index - 1] =
                newContent[index - 1] + " " + newContent[index + 1];
            newContent.splice(index, 2);
            console.log(newContent);
        } else {
            newContent.splice(index, 1);
        }
        setContent(newContent);
    }
        */

    function changeString(index, newString) {
        const newContent = [...content];
        newContent[index] = newString;
        setContent(newContent);
    }
    return (
        <>
            <Box>
                {props.content.map((item, index) => {
                    if (Array.isArray(item)) {
                        return (
                            <EventTag
                                key={index}
                                value={item}
                            //onDelete={() => deleteChip(index)}
                            />
                        );
                    } else {
                        return (
                            <TextField
                                key={index}
                                value={item}
                                variant="standard"
                                style={{ width: getTextWidth(item) }}
                                onChange={(e) => {
                                    changeString(index, e.currentTarget.value);
                                }}
                                onBlur={(e) => {
                                    if (e.target.selectionStart != null)
                                        setCursorPosition([index, e.target.selectionStart]);
                                }}
                            />
                        );
                    }
                })}
            </Box>
        </>
    );
}
