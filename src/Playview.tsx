import React, { useState } from 'react';
import Townsquare from './components/Townsquare.tsx';
import NoteList from './components/NoteList.tsx';

import { Button, FormControlLabel, FormGroup, Menu, MenuItem, Switch } from '@mui/material';
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { addNote, ChipType, clearNotes, NoteSegments } from './state/NotesSlice.tsx';
import { mdiMenu } from '@mdi/js';
import Icon from "@mdi/react";
import { PlayerInfo, resetPlayers } from './state/PlayersSlice.tsx';
import { PlayContextProvider } from './state/PlayContext.tsx';

import coffin from './img/coffin.png';
import medicalBag from './img/medical-bag.png';

import Joyride, { ACTIONS, CallBackProps, Placement, STATUS } from 'react-joyride';
import { setTutorialStage } from './state/SettingsSlice.tsx';
import TownCenter from './components/TownCenter.tsx';
import { clearScript } from './state/RolesSlice.tsx';
import { resetTime } from './state/TimeSlice.tsx';

export enum PlayStates {
    Default,
    Nominator,
    Nominee,
    Vote,
    Life_and_Death
}

function Playview() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const current_time = useAppSelector(
        state => state.time.time);

    const players: PlayerInfo[] = useAppSelector(state => state.players.players);

    const tutorialStage = useAppSelector(state => state.settings.tutorialStage);
    const joyride_steps = [
        {
            target: 'body',
            content: "This is the main game screen",
            placement: 'center' as Placement
        },
        {
            target: '#note_list',
            content: "Here you can write notes of events",
            placement: 'left' as Placement
        },
        {
            target: '#note_buttons',
            content: "Tap on those buttons to add, edit, or delete a note",
            placement: 'bottom' as Placement
        },
        {
            target: '#townsquare_center',
            content: "Here you can see the current time as well as initiating" +
                " actions such as moving to the next phase, nominations," +
                " voting, or marking people dead (or alive)"
        },
        {
            target: '#hide_button',
            content: "This button will let you hide information to fend off" +
                " nosy players"
        },
        {
            target: '#top_menu',
            content: "This menu will let you reset the game and go back to setup" +
                " (WARNING: it will reset EVERYTHING)"
        },
        {
            target: '.token',
            content: "Those represent players, you can tap on them to see more details"
        }
    ];

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, status } = data;

        if ([ACTIONS.CLOSE as string, ACTIONS.STOP, ACTIONS.SKIP].includes(action) ||
            [STATUS.FINISHED as string, STATUS.SKIPPED].includes(status)) {
            dispatch(setTutorialStage({ stage: 2 }));
        }
    };

    // State and handle when tapping players depending on the state
    const [currentState, setCurrentState] = useState<PlayStates>(PlayStates.Default);
    const [playerListCache, setPlayerListCache] = useState<number[]>([]);
    const [overlayImage, setOverlayImage] = useState<null | string>(null);

    function tapPlayer(index) {
        switch (currentState) {
            case PlayStates.Default:
                return navigate(`/play/player/${index}`);
            case PlayStates.Nominator:
                setPlayerListCache([index]);
                setCurrentState(PlayStates.Nominee);
                break;
            case PlayStates.Nominee:
                const e: NoteSegments = [
                    "On",
                    [ChipType.Time, current_time],
                    ", ",
                    [ChipType.Player, playerListCache[0]],
                    " nominated ",
                    [ChipType.Player, index],
                    ""
                ];
                dispatch(addNote({ note: e }));
                setPlayerListCache([]);
                setOverlayImage(null);
                setCurrentState(PlayStates.Default);
                break;
            case PlayStates.Vote:
                // We have to construct a new array to make sure the right
                // components will update when they use it through the context
                // API
                const current_voters = [...playerListCache];
                if (current_voters.includes(index)) {
                    current_voters.splice(current_voters.indexOf(index), 1);
                } else {
                    current_voters.push(index);
                }
                setPlayerListCache(current_voters);
                break;
            case PlayStates.Life_and_Death:
                setPlayerListCache([index]);
                setOverlayImage(players[index].alive ? coffin : medicalBag);
                break;
        }
    }

    // For the top left game menu
    const [topMenuAnchor, setTopMenuAnchor] = React.useState<null | HTMLElement>(null);
    const topMenuOpen = Boolean(topMenuAnchor);

    function handleTopMenuClick(e: React.MouseEvent<HTMLButtonElement>) {
        setTopMenuAnchor(e.currentTarget);
    }

    function handleResetGame() {
        dispatch(resetPlayers());
        dispatch(clearNotes());
        dispatch(clearScript());
        dispatch(resetTime());
    }

    // hiding roles information
    const [HideInformation, setHideInformation] = useState<boolean>(false);

    return <div className="h-dvh">
        <Joyride steps={joyride_steps}
            showSkipButton
            continuous
            callback={handleJoyrideCallback}
            run={tutorialStage < 2} />
        <div className="flex flex-col lg:flex-row landscape:flex-row h-dvh w-screen">
            <PlayContextProvider hideInformation={HideInformation}
                playersWithOverlay={playerListCache}
                overlayImage={overlayImage}>
                <div className="relative flex w-full h-3/5 lg:h-full landscape:h-full lg:w-3/5 landscape:w-3/5 justify-center">
                    <div className="relative aspect-square max-w-full">

                        <Townsquare
                            tapAction={(index) => { tapPlayer(index); }}>
                            <TownCenter
                                state={currentState}
                                setCurrentState={setCurrentState}
                                setOverlayImage={setOverlayImage}
                                playerListCache={playerListCache}
                                setPlayerListCache={setPlayerListCache} />
                        </Townsquare>
                    </div>
                    <FormGroup id="hide_button" className="absolute top-0 right-0">
                        <FormControlLabel
                            control={<Switch onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setHideInformation(event.target.checked); }} />}
                            label="Hide info"
                            labelPlacement="start"
                            value={HideInformation}
                        />
                    </FormGroup>
                </div>
                <div id="note_list" className="basis-2/5 overflow-auto lg:max-h-screen landscape:max-h-screen">
                    <NoteList />
                </div>
                <div id="top_menu" className="absolute top left">
                    <Button
                        onClick={handleTopMenuClick}>
                        <Icon path={mdiMenu} size={1} />
                    </Button>
                    <Menu
                        anchorEl={topMenuAnchor}
                        open={topMenuOpen}
                        onClose={() => { setTopMenuAnchor(null); }}
                    >
                        <MenuItem onClick={handleResetGame}>Reset game</MenuItem>
                    </Menu>
                </div>
            </PlayContextProvider >
        </div >
    </div>;
}

export default Playview;