import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";

import EventTag from "./EventTag.tsx";
import { EventType, TagTypes, Tag } from "../state/EventsSlice.tsx";

import Button from "@mui/material/Button";
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
};

export default function EventInput(props: EventInputProps) {
    const { content, setContent } = props;
    const [cursorPosition, setCursorPosition] = useState([-1, -1]);
    const newtaginputRef = useRef();

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

    function insertTag(tag: Tag) {
        const newContent = [...content];
        const previousText = newContent[cursorPosition[0]];
        if ((cursorPosition[0] === -1) || (typeof (previousText) != "string")) {
            newContent.splice(
                newContent.length - 1,
                0,
                tag
            );
        } else {
            newContent.splice(
                cursorPosition[0],
                1,
                previousText.substring(0, cursorPosition[1]),
                tag,
                previousText.substring(cursorPosition[1])
            );
        }
        setContent(newContent);
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
            <div>
                <TextField inputRef={newtaginputRef} type="text" />
                <Button
                    variant="text"
                    onClick={() => {
                        if (newtaginputRef.current !== undefined)
                            insertTag([TagTypes.Role, (newtaginputRef.current as HTMLInputElement).value]);
                    }}
                >
                    Add Role
                </Button>

                <Button
                    variant="text"
                    onClick={() => {
                        if (newtaginputRef.current !== undefined)
                            insertTag([TagTypes.Player, parseInt((newtaginputRef.current as HTMLInputElement).value)]);
                    }}
                >
                    Add Player
                </Button>

                <Button
                    variant="text"
                    onClick={() => {
                        if (newtaginputRef.current !== undefined)
                            insertTag([TagTypes.Time, parseInt((newtaginputRef.current as HTMLInputElement).value)]);
                    }}
                >
                    Add Time
                </Button>
            </div >
        </>
    );
}
