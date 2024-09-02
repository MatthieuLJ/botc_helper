import React, { useContext, useState } from 'react';
import { PlayersSetup } from './components/PlayersSetup.tsx';
import { ScriptSetup } from './components/ScriptSetup.tsx';
import { ScriptContext, ScriptContextType } from './state/ScriptContext.tsx';
import Characters from './components/Characters.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { advanceTime } from './state/TimeSlice.tsx';
import { Button, Dialog } from '@mui/material';

function TownsquareSetup() {
    const { rolesLoading }: ScriptContextType = useContext(ScriptContext);
    const roles = useAppSelector(state => state.roles.roles);
    const [showCharacters, setShowCharacters] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return <div className="h-screen">
        <div className="h-2/3">
            <PlayersSetup />
        </div>
        <div className="h-1/3">
            <ScriptSetup />
            <button onClick={() => { setShowCharacters(true); }}
                disabled={rolesLoading || roles.length === 0}>Show script</button>

            <p>
                <Button onClick={() => {
                    dispatch(advanceTime());
                    return navigate('/play/townsquare', { replace: true });
                }}
                    disabled={rolesLoading || roles.length === 0}>
                    Done
                </Button>
            </p>
        </div>
        <Dialog open={showCharacters}
            onClose={() => { setShowCharacters(false); }}>
            <Characters
                highlights={null}
                closeDialog={() => { setShowCharacters(false); }}
                tapCharacter={() => {/* could show ability here*/ }} />
        </Dialog>
    </div>;
}

export default TownsquareSetup;