import React, { useContext, useState } from 'react';
import { PlayersSetup } from './PlayersSetup.tsx';
import { ScriptSetup } from './ScriptSetup.tsx';
import { ScriptContext, ScriptContextType } from './game/ScriptContext.tsx';
import Characters from './Characters.tsx';

function TownsquareSetup() {
    const { roles }: ScriptContextType = useContext(ScriptContext);
    const [showCharacters, setShowCharacters] = useState(false);
    return <>
        <PlayersSetup />
        <ScriptSetup />
        <button onClick={() => { setShowCharacters(true); }}
            disabled={roles.length === 0}>Show script</button>
        <dialog open={showCharacters}
            onClose={() => { setShowCharacters(false); }}>
            <Characters highlights={[]} />
        </dialog>
        <p>
            <button>Done</button>
        </p>
    </>;
}

export default TownsquareSetup;