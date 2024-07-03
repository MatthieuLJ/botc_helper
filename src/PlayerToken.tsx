import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks.ts';
import { setName } from './PlayersSlice.tsx';

type PlayerTokenProps = {
    index: number
}

function PlayerToken(props: PlayerTokenProps) {
    const player_info = useAppSelector(state => state.players.players[props.index]);
    const dispatch = useAppDispatch()

    // To be able to set the player name during setup
    const [changingName, setChangingName] = useState(false);
    const [nameField, setNameField] = useState(player_info.name);
    const handleClose = () => { setChangingName(false) }
    const acceptNewName = () => { dispatch(setName({ id: player_info.id, name: nameField })); setChangingName(false); }

    return <li onClick={() => setChangingName(true)}>
        {player_info.name}
        <dialog open={changingName} onClose={handleClose}>
            <form method="dialog">
                <p>Set the player's name</p>
                <input type="text" value={nameField}
                    onChange={(e) => setNameField(e.currentTarget.value)} />
                <button onClick={acceptNewName}>OK</button>
                <button onClick={() => { setNameField(player_info.name); setChangingName(false); }}>Cancel</button>
            </form>
        </dialog>
    </li>;
}

export default PlayerToken;