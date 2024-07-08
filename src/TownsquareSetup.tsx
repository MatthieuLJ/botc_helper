import React, { useContext, useEffect, useState } from 'react';
import PlayerToken from './PlayerToken.tsx';
import { useAppDispatch, useAppSelector } from './game/hooks.ts';
import { setName } from './game/PlayersSlice.tsx';
import Counter from './Counter.tsx';
import scripts from './game_scripts/scripts.ts';
import { ScriptContext, ScriptContextType } from './game/ScriptContext.tsx';

function TownsquareSetup() {
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

    // To choose a script
    const [scriptName, setScriptName] = useState("");
    const {addRoles, clearRoles,}: ScriptContextType = useContext(ScriptContext);
    useEffect(() => {
        if (scriptName === "") {
            return;
        }
        clearRoles();
        import(`./game_scripts/${scriptName}`)
            .then(module => {
                const script = module.default;
                addRoles(script.slice(1));
            })
            .catch(error => console.log('Error loading script!'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scriptName]);

    const selectScript = (e) => {
        setScriptName(e.target.value);
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
        <label htmlFor="scripts">Choose a script</label>
        <select name="scripts" onChange={selectScript}>
            { scriptName === "" ? <option value="" key="none" /> : null }
            {scripts.map((s) => <option value={s.file} key={s.name}>{s.name}</option>)}
        </select>
        <p>
            <button>Done</button>
        </p>
    </>;
}

export default TownsquareSetup;