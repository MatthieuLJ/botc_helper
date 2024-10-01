import React, { useState } from 'react';
import { PlayersSetup } from './PlayersSetup.tsx';
import { ScriptSetup } from './ScriptSetup.tsx';
import Characters from '../components/Characters.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks.ts';
import { advanceTime } from '../state/TimeSlice.tsx';
import { Button, Dialog } from '@mui/material';
import Joyride, { ACTIONS, CallBackProps, Placement } from 'react-joyride';
import { setTutorialStage } from '../state/SettingsSlice.tsx';
import { addNote, NoteSegments } from '../state/NotesSlice.tsx';

function TownsquareSetup() {
    const roles = useAppSelector(state => state.roles.roles);
    const tutorialStage = useAppSelector(state => state.settings.tutorialStage);
    const [showCharacters, setShowCharacters] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const num_players = useAppSelector(
        state => state.players.players.length);

    const joyride_steps = [
        {
            target: 'body',
            content: "Let's go on a tour!",
            placement: 'center' as Placement,
        },
        {
            target: '.token',
            content: 'This represents a player, click on it to change their ' +
                'name, drag them around to place them'
        },
        {
            target: '#add_player',
            content: 'You can add more players on this button\n' +
                'or drag some to the trash to remove them'
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

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action } = data;

        if ([ACTIONS.CLOSE as string, ACTIONS.STOP, ACTIONS.SKIP].includes(action)) {
            dispatch(setTutorialStage({ stage: 1 }));
        }
    };

    const player_distribution = [, , , , ,
        [3, 0, 1, 1],
        [3, 1, 1, 1],
        [5, 0, 1, 1],
        [5, 1, 1, 1],
        [5, 2, 1, 1],
        [7, 0, 2, 1],
        [7, 1, 2, 1],
        [7, 2, 2, 1],
        [9, 0, 3, 1],
        [9, 1, 3, 1],
        [9, 2, 3, 1]
    ];

    function addPlayerCountNote(): string | null {

        if ((num_players < 5) || (num_players > 15))
            return null;
        const note: string = "This is a " + num_players + " game, base count is " +
            player_distribution[num_players]?.at(0) + " townsfolks, " +
            player_distribution[num_players]?.at(1) + " outsider" +
            ((player_distribution[num_players]?.at(1) ?? 0) > 1 ? "s" : "") + ", " +
            player_distribution[num_players]?.at(2) + " minion" +
            ((player_distribution[num_players]?.at(2) ?? 0) > 1 ? "s" : "") + ", and " +
            player_distribution[num_players]?.at(3) + " demon.";

        console.log(note);
        return note;
    }

    return <div className="h-dvh">
        <Joyride steps={joyride_steps}
            showSkipButton
            continuous
            callback={handleJoyrideCallback}
            run={tutorialStage < 1} />
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
                    const note = addPlayerCountNote();
                    if (note != null) {
                        const e: NoteSegments = [note];
                        dispatch(addNote({ note: e }));
                    }
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