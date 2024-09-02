import React, { useContext, useState } from 'react';
import { PlayersSetup } from './components/PlayersSetup.tsx';
import { ScriptSetup } from './components/ScriptSetup.tsx';
import { ScriptContext, ScriptContextType } from './state/ScriptContext.tsx';
import Characters from './components/Characters.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { advanceTime } from './state/TimeSlice.tsx';

function TownsquareSetup() {
    const { rolesLoading }: ScriptContextType = useContext(ScriptContext);
    const roles = useAppSelector(state => state.roles.roles);
    const [showCharacters, setShowCharacters] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return <>
        <div>
            <PlayersSetup />
            <ScriptSetup />
            <button onClick={() => { setShowCharacters(true); }}
                disabled={rolesLoading || roles.length === 0}>Show script</button>
            <dialog open={showCharacters}
                onClose={() => { setShowCharacters(false); }}>
                <Characters
                    highlights={null}
                    closeDialog={() => { setShowCharacters(false); }}
                    tapCharacter={() => {/* could show ability here*/ }} />
            </dialog>
            <p>
                <button onClick={() => {
                    dispatch(advanceTime());
                    return navigate('/play/townsquare', { replace: true });
                }}
                    disabled={rolesLoading || roles.length === 0}>Done</button>
            </p>
        </div>
    </>;
}

export default TownsquareSetup;