import React, { useEffect, useState } from "react";
import available_scripts from '../game_scripts/scripts.ts';
import { useAppDispatch, useAppSelector } from "../state/hooks.ts";
import { addRoles, setScript } from "../state/RolesSlice.tsx";

function ScriptSetup() {
    // To choose a script
    const [scriptName, setScriptName] = useState("");
    const [scriptSelectValue, setScriptSelectValue] = useState("");
    const script = useAppSelector(state => state.roles.script);
    const dispatch = useAppDispatch();

    // For initializing the select element
    useEffect(() => {
        if (script !== "") {
            setScriptSelectValue(script);
            setScriptName(script);
        }
    }, [script]);

    // Load the new script when it changes
    useEffect(() => {
        if (scriptName === "") {
            return;
        }
        dispatch(setScript({ script: scriptName }));
        import(`../game_scripts/${scriptName}.ts`)
            .then(module => {
                const script = module.default;
                dispatch(addRoles({ roles: script.slice(1) }));
            })
            .catch(error => console.log('Error loading script!', error));
    }, [dispatch, scriptName]);

    // Check if we need to show the warning when the selection changes
    const selectScript = (e) => {
        setScriptSelectValue(e.target.value);
        setScriptName(e.target.value);
    };

    return <div id="script_setup">
        <label htmlFor="script_select">Choose a script</label>
        <select name="scripts" id="script_select" value={scriptSelectValue}
            onChange={selectScript}>
            {scriptName === "" ? <option value="" key="none" /> : null}
            {available_scripts.map((s) =>
                <option value={s.file} key={s.name}>{s.name}</option>)}
        </select>
    </div>;
}

export { ScriptSetup };