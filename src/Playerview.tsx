import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { useNavigate, useParams } from "react-router-dom";
import Characters from "./components/Characters.tsx";
import { setClaims } from "./state/PlayersSlice.tsx";
import NoteList from "./components/NoteList.tsx";
import { ChipSegment, ChipType } from "./state/NotesSlice.tsx";
import { Button, Dialog } from "@mui/material";
import PlayerToken from "./components/PlayerToken.tsx";
import Joyride, { ACTIONS, CallBackProps, STATUS } from "react-joyride";
import { setTutorialStage } from "./state/SettingsSlice.tsx";

function Playerview() {
    const params = useParams();
    const playerIndex = parseInt(params.playerIndex ?? "0");
    const player_info = useAppSelector(
        state => state.players.players[playerIndex]);

    const navigate = useNavigate();

    const num_players = useAppSelector(
        state => state.players.players.length);
    const next_index = (playerIndex + 1) % num_players;
    const prev_index = (playerIndex - 1) < 0 ? num_players - 1 :
        (Number(playerIndex) - 1);

    const [openClaimsDialog, setOpenClaimsDialog] = useState(false);
    const [playerClaims, setPlayerClaims] = useState<String[]>(player_info.claims);

    const dispatch = useAppDispatch();

    const notes_filter: ChipSegment = [ChipType.Player, playerIndex];

    // For the tutorial
    const tutorialStage = useAppSelector(state => state.settings.tutorialStage);
    const joyride_steps = [
        {
            target: '#player_token',
            content: "This shows the current claim for that player, tap on the" +
                " token to change them"
        },
        {
            target: '#note_list',
            content: "Those are the notes related to that player"
        }
    ];

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, status } = data;

        if ([ACTIONS.CLOSE as string, ACTIONS.STOP, ACTIONS.SKIP].includes(action) ||
            [STATUS.FINISHED as string, STATUS.SKIPPED].includes(status)) {
            dispatch(setTutorialStage({ stage: 3 }));
        }
    };

    // To control the size of the player token
    const central_area = useRef<HTMLDivElement | null>(null);
    const [tokenWidth, setTokenWidth] = useState(0);

    function onResize() {
        const space = central_area.current;
        if (space === null) {
            return;
        }

        setTokenWidth(Math.max(100, space.clientWidth / 3));
    }

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
    }, []);

    useEffect(() => {
        dispatch(setClaims({ index: playerIndex, claims: playerClaims }));
    }, [dispatch, playerClaims]);

    return <div className="h-dvh">
        <Joyride steps={joyride_steps}
            showSkipButton
            continuous
            callback={handleJoyrideCallback}
            run={tutorialStage < 3} />
        <div className="flex flex-col lg:flex-row landscape:flex-row h-dvh  w-screen">
            <div className="flex flex-col w-full h-3/5 lg:h-full landscape:h-full lg:w-3/5 landscape:w-3/5">
                <div className="flex flex-grow w-full" ref={central_area}>
                    <div className="basis-1/5 h-full content-center">
                        <Button onClick={() => {
                            navigate(`/play/player/${prev_index}`);
                        }}>
                            Counter-clockwise
                        </Button>
                    </div>
                    <div className="basis-3/5 content-center">
                        <div id="player_token"
                            className="flex w-full place-content-center h-fit">
                            <PlayerToken
                                index={playerIndex}
                                tokenWidth={tokenWidth}
                                tapPlayer={() => { setOpenClaimsDialog(true); }}
                            />
                        </div>

                    </div>
                    <div className="basis-1/5 content-center">
                        <Button onClick={() => {
                            navigate(`/play/player/${next_index}`);
                        }}>
                            Clockwise
                        </Button>
                    </div>
                </div>
                <div className="h-fit">
                    <Button id="townsquare" name="townsquare"
                        onClick={() => { return navigate('/play'); }}>
                        Back to townsquare
                    </Button>
                </div>
            </div>

            <div id="note_list" className="basis-2/5 lg:max-h-screen landscape:max-h-screen">
                <NoteList filter={notes_filter} />
            </div>

        </div >

        <Dialog
            open={openClaimsDialog}
            onClose={() => { setOpenClaimsDialog(false); }}>
            <Characters
                highlights={player_info.claims}
                tapCharacter={(role) => {
                    const newPlayerClaims = [...playerClaims];
                    if (newPlayerClaims.includes(role)) {
                        newPlayerClaims.splice(newPlayerClaims.indexOf(role), 1);
                    } else {
                        newPlayerClaims.push(role);
                    }
                    setPlayerClaims(newPlayerClaims);
                }}
                closeDialog={() => {
                    setOpenClaimsDialog(false);
                }} />
        </Dialog>

    </div>;
}

export default Playerview;