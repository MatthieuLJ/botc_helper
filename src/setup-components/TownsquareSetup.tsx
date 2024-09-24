import React, { useState } from 'react';
import { PlayersSetup } from './PlayersSetup.tsx';
import { ScriptSetup } from './ScriptSetup.tsx';
import Characters from '../components/Characters.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks.ts';
import { advanceTime } from '../state/TimeSlice.tsx';
import { Button, Dialog } from '@mui/material';
import Joyride, { Placement } from 'react-joyride';

function TownsquareSetup() {
    const roles = useAppSelector(state => state.roles.roles);
    const [showCharacters, setShowCharacters] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const joyride_steps = [
        {
            target: 'body',
            content: "Let's go on a tour!",
            placement: 'center' as Placement,
        },
        {
            target: '.token',
            content: 'This represents a player, click on it to change their name, drag them around to place them'
        },
        {
            target: '#counter',
            content: 'You can add or remove people with those buttons'
        },
        {
            target: '#script_setup',
            content: 'Choose which script you want to play here',
            placement: 'top' as Placement
        },
        {
            target: '#go_play',
            content: 'When you are done, click  here',
            placement: 'top' as Placement
        }
    ];

    return <div className="h-dvh">
        <Joyride steps={joyride_steps} showSkipButton continuous debug={true}/>
        <div className="h-2/3">
            <PlayersSetup />
        </div>
        <div className="h-1/3">
            <ScriptSetup />
            <Button onClick={() => { setShowCharacters(true); }}
                disabled={roles.length === 0}>
                Show script
            </Button>

            <p id="go_play">
                <Button onClick={() => {
                    dispatch(advanceTime());
                    return navigate('/play/townsquare', { replace: true });
                }}
                    disabled={roles.length === 0}>
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