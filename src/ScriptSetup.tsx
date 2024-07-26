import React, { useContext, useEffect, useState } from "react";
import { ScriptContext, ScriptContextType } from "./state/ScriptContext.tsx";
import scripts from './game_scripts/scripts.ts';

function ScriptSetup(props) {
    // To choose a script
    const [scriptName, setScriptName] = useState("");
    const { addRoles, clearRoles }: ScriptContextType = useContext(ScriptContext);
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

    return <><label htmlFor="scripts">Choose a script</label>
        <select name="scripts" onChange={selectScript}>
            {scriptName === "" ? <option value="" key="none" /> : null}
            {scripts.map((s) => <option value={s.file} key={s.name}>{s.name}</option>)}
        </select></>;
}

export { ScriptSetup };