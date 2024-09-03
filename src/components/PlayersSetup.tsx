import React from "react";
import { useState } from "react";
import Counter from "./Counter.tsx";
import PlayerToken from "./PlayerToken.tsx";
import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import { setName } from '../state/PlayersSlice.tsx';
import { Button, Dialog, TextField } from "@mui/material";
import Townsquare from "../Townsquare.tsx";

function PlayersSetup(props) {
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

    return <div className="flex flex-col h-full">
        <div className="flex-none h-fit">
            <Counter />
        </div>
        <div className="flex w-full flex-grow place-content-center max-h-full">
            <div className="aspect-square max-h-full max-w-full">
                <Townsquare tapAction={function (index: number): void {
                    setChangingName(true);
                    setCurrentIndex(index);
                    setNameField(players[index].name);
                }} />
            </div>
        </div>
        <Dialog open={changingName} onClose={handleClose}>
            <form method="dialog">
                <p>Set the player's name</p>
                <TextField name="name_field"
                    id="player_name_field"
                    type="text"
                    value={nameField}
                    onChange={(e) => setNameField(e.currentTarget.value)} />
                <Button onClick={acceptNewName}>OK</Button>
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