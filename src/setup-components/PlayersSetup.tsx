import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Counter from "../components/Counter.tsx";
import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import { setName } from '../state/PlayersSlice.tsx';
import { Button, Dialog, TextField } from "@mui/material";
import Townsquare from "../components/Townsquare.tsx";

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
        setRedrawTownsquare(!redrawTownsquare);
    };
    const [redrawTownsquare, setRedrawTownsquare] = useState(false);
    const input = useRef(null);

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
                <Townsquare tapAction={function (index: number): void {
                    setChangingName(true);
                    setCurrentIndex(index);
                    setNameField(players[index].name);
                }} redraw={redrawTownsquare} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Counter />
                </div>
            </div>
        </div>
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
    </div>;
}

export { PlayersSetup };