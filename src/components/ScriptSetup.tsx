import React, { useEffect, useState } from "react";
import scripts from '../game_scripts/scripts.ts';
import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import { addRoles, clearScript, setScript } from "../state/RolesSlice.tsx";
import { resetPlayers } from "../state/PlayersSlice.tsx";
import { clearNotes } from "../state/NotesSlice.tsx";
import { resetTime } from "../state/TimeSlice.tsx";

function ScriptSetup(props) {
    // To choose a script
    const [scriptName, setScriptName] = useState("");
    const [showWarning, setshowWarning] = useState(false);
    const [scriptSelectValue, setScriptSelectValue] = useState("");
    const script = useAppSelector(state => state.roles.script);
    const dispatch = useAppDispatch();

    // For initializing the select element
    useEffect(() => {
        if (script !== "") {
            setScriptSelectValue(script);
            setScriptName(script);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Load the new script when it changes
    useEffect(() => {
        if (scriptName === "") {
            return;
        }
        dispatch(clearScript());
        dispatch(setScript({ script: scriptName }));
        import(`../game_scripts/${scriptName}`)
            .then(module => {
                const script = module.default;
                dispatch(addRoles({ roles: script.slice(1) }));
            })
            .catch(error => console.log('Error loading script!'));
    }, [dispatch, scriptName]);

    // Check if we need to show the warning when the selection changes
    const selectScript = (e) => {
        setScriptSelectValue(e.target.value);
        if ((scriptName !== "") && (scriptName !== e.target.value)) {
            setshowWarning(true);
        } else {
            setScriptName(e.target.value);
        }
    };

    return <><label htmlFor="script_select">Choose a script</label>
        <select name="scripts" id="script_select" value={scriptSelectValue}
            onChange={selectScript}>
            {scriptName === "" ? <option value="" key="none" /> : null}
            {scripts.map((s) => <option value={s.file} key={s.name}>{s.name}</option>)}
        </select>
        <dialog open={showWarning}>
            <h1>Warning!</h1>
            <p>Changing script will wipe out everything from the current game in progress</p>
            <button onClick={() => {
                setScriptName(scriptSelectValue);
                setshowWarning(false);
                dispatch(resetPlayers());
                dispatch(clearNotes());
                dispatch(resetTime())
            }}>OK</button>
            <button onClick={() => {
                setScriptSelectValue(scriptName);
                setshowWarning(false);
            }}>Cancel</button>
        </dialog>
    </>;
}

export { ScriptSetup };