import React from "react";
import { useState } from "react";
import Counter from "./components/Counter.tsx";
import PlayerToken from "./components/PlayerToken.tsx";
import { useAppDispatch, useAppSelector } from "./game/hooks.ts";
import { setName } from './game/PlayersSlice.tsx';

function PlayersSetup(props) {
    const players = useAppSelector(state => state.players.players);
    const dispatch = useAppDispatch();
    
    // To be able to set the player name during setup
    const [changingName, setChangingName] = useState(false);
    const [nameField, setNameField] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleClose = () => { setChangingName(false); };
    const acceptNewName = () => {
        dispatch(setName({ id: currentIndex, name: nameField }));
        setChangingName(false);
    };

    return <>
        <Counter />
        <ul>
            {players.map((p, index) => <PlayerToken key={p.id} index={index}
                tapPlayer={() => {
                    setChangingName(true);
                    setCurrentIndex(players[index].id);
                    setNameField(players[index].name);
                }} />)}
        </ul>
        <dialog open={changingName} onClose={handleClose}>
            <form method="dialog">
                <p>Set the player's name</p>
                <input type="text" value={nameField}
                    onChange={(e) => setNameField(e.currentTarget.value)} />
                <button onClick={acceptNewName}>OK</button>
                <button onClick={() => { setNameField(""); setChangingName(false); }}>Cancel</button>
            </form>
        </dialog>
    </>;
}

export { PlayersSetup };