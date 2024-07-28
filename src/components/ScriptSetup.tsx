import React, { useEffect, useState } from "react";
import scripts from '../game_scripts/scripts.ts';
import { useAppDispatch } from "../state/hooks.ts";
import { addRoles, clearScript, setScript } from "../state/RolesSlice.tsx";

function ScriptSetup(props) {
    // To choose a script
    const [scriptName, setScriptName] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (scriptName === "") {
            return;
        }
        dispatch(clearScript());
        dispatch(setScript({ script: scriptName }));
        import(`../game_scripts/${scriptName}`)
            .then(module => {
                const script = module.default;
                dispatch(addRoles({roles: script.slice(1)}))
            })
            .catch(error => console.log('Error loading script!'));
    }, [dispatch, scriptName]);

    const selectScript = (e) => {
        setScriptName(e.target.value);
    };

    return <><label htmlFor="script_select">Choose a script</label>
        <select name="scripts" id="script_select" onChange={selectScript}>
            {scriptName === "" ? <option value="" key="none" /> : null}
            {scripts.map((s) => <option value={s.file} key={s.name}>{s.name}</option>)}
        </select></>;
}

export { ScriptSetup };