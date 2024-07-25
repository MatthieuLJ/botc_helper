import React, { useContext, useState } from 'react';
import { PlayersSetup } from './PlayersSetup.tsx';
import { ScriptSetup } from './ScriptSetup.tsx';
import { ScriptContext, ScriptContextType } from './game/ScriptContext.tsx';
import Characters from './components/Characters.tsx';
import { useNavigate } from 'react-router-dom';

function TownsquareSetup() {
    const { roles }: ScriptContextType = useContext(ScriptContext);
    const [showCharacters, setShowCharacters] = useState(false);
    const navigate = useNavigate();

    return <>
        <PlayersSetup />
        <ScriptSetup />
        <button onClick={() => { setShowCharacters(true); }}
            disabled={roles.length === 0}>Show script</button>
        <dialog open={showCharacters}
            onClose={() => { setShowCharacters(false); }}>
            <Characters highlights={null} closeDialog={() => {setShowCharacters(false);}}/>
        </dialog>
        <p>
            <button onClick={() => { return navigate('/play', { replace: true}); }}>Done</button>
        </p>
    </>;
}

export default TownsquareSetup;