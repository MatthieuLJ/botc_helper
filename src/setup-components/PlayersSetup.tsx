import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import { addPlayer, setName } from '../state/PlayersSlice.tsx';
import { Button, Dialog, TextField } from "@mui/material";
import Townsquare from "../components/Townsquare.tsx";
import Icon from '@mdi/react';
import { mdiPlusCircleOutline } from "@mdi/js";

function PlayersSetup() {
    const players = useAppSelector(state => state.players.players);
    const dispatch = useAppDispatch();

    // To be able to set the player name during setup
    const [changingName, setChangingName] = useState(false);
    const [nameField, setNameField] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleClose = () => { setChangingName(false); };
    const acceptNewName = () => {
        dispatch(setName({ index: currentIndex, name: nameField }));
        setChangingName(false);
    };
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (changingName && input.current) {
                input.current.focus();
                input.current.select();
            }
        }, 100);

    }, [changingName]);

    return <div className="flex flex-col h-full">
        <div className="relative flex w-full flex-grow place-content-center max-h-full">
            <div className="aspect-square max-h-full max-w-full">
                <Townsquare tapAction={(index: number) => {
                    setChangingName(true);
                    setCurrentIndex(index);
                    setNameField(players[index].name);
                }}
                    canDrag={true}
                    canRemove={true}>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Button id="add_player" onClick={() => { dispatch(addPlayer({})); }} >
                            <Icon path={mdiPlusCircleOutline} size={2} />
                        </Button>
                    </div>
                </Townsquare>
            </div>
        </div >
        <Dialog open={changingName} onClose={handleClose} disableRestoreFocus>
            <form method="dialog">
                <p>Set the player's name</p>
                <TextField
                    type="text"
                    value={nameField}
                    autoFocus
                    inputRef={input}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') { acceptNewName(); }
                    }}
                    onChange={(e) => setNameField(e.currentTarget.value)} />
                <Button onClick={acceptNewName}>
                    OK
                </Button>
                <Button onClick={() => {
                    setNameField("");
                    setChangingName(false);
                }}>
                    Cancel
                </Button>
            </form>
        </Dialog>
    </div >;
}

export { PlayersSetup };