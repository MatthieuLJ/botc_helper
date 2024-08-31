import React, { useState } from 'react';
import Townsquare from './Townsquare.tsx';
import NoteList from './components/NoteList.tsx';

import { Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { advanceTime } from './state/TimeSlice.tsx';
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { addNote, ChipType, NoteSegments } from './state/NotesSlice.tsx';
import { mdiCheckBold } from '@mdi/js';
import Icon from "@mdi/react";
import { PlayerInfo, setAlive } from './state/PlayersSlice.tsx';

type PlayviewProps = {};

function Playview(props: PlayviewProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const current_time = useAppSelector(
        state => state.time.time);

    const players: PlayerInfo[] = useAppSelector(state => state.players.players);

    enum PlayStates {
        Default,
        Nominator,
        Nominee,
        Vote,
        Life_and_Death
    }

    const [currentState, setCurrentState] = useState<PlayStates>(PlayStates.Default);
    const [playerListCache, setPlayerListCache] = useState<number[]>([]);

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
                setCurrentState(PlayStates.Default);
                break;
            case PlayStates.Vote:
                const current_voters = playerListCache;
                if (current_voters.includes(index)) {
                    current_voters.splice(current_voters.indexOf(index), 1);
                } else {
                    current_voters.push(index);
                }
                setPlayerListCache(current_voters);
                break;
            case PlayStates.Life_and_Death:
                setPlayerListCache([index]);
                break;
        }
    }

    const [currentDeathReason, setCurrentDeathReason] = useState<string>("");

    function handleDeathReason(event) {
        if (event.target.value === currentDeathReason) {
            setCurrentDeathReason("");
        } else {
            setCurrentDeathReason(event.target.value);
        }
    }

    return <div className="flex flex-row">
        <div className="basis-2/3 h-screen">
            <div className="relative aspect-square max-h-full">

                <Townsquare tapAction={(index) => { tapPlayer(index); }} />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className={currentState === PlayStates.Default ? "" : "hidden"}>
                        <ButtonGroup variant="text" orientation="vertical">
                            <Button onClick={() => { dispatch(advanceTime()); }}>Move time forward</Button>
                            <Button onClick={() => { setCurrentState(PlayStates.Nominator); }}>Nomination</Button>
                            <Button onClick={() => { setCurrentState(PlayStates.Vote); }}>Vote</Button>
                            <Button onClick={() => { setCurrentState(PlayStates.Life_and_Death);}}>Life & Death</Button>
                        </ButtonGroup>
                    </div>
                    <div className={currentState === PlayStates.Nominator ? "" : "hidden"}>
                        <p>Who nominated?</p>
                    </div>
                    <div className={currentState === PlayStates.Nominee ? "" : "hidden"}>
                        <p>Who is nominated?</p>
                    </div>
                    <div className={currentState === PlayStates.Vote ? "" : "hidden"}>
                        <p>Who is voting?</p>
                        <Button onClick={() => {
                            const e: NoteSegments = [];
                            if (playerListCache.length === 0) {
                                e.push("Nobody voted");
                            } else {
                                for (const [index, p_index] of playerListCache.entries()) {
                                    e.push([ChipType.Player, p_index]);
                                    if (index != playerListCache.length - 1) {
                                        e.push(", ");
                                    } else {
                                        e.push(" voted.");
                                    }
                                }
                            }
                            dispatch(addNote({ note: e }));
                            setPlayerListCache([]);
                            setCurrentState(PlayStates.Default);
                        }}>
                            <Icon path={mdiCheckBold} size={1} />
                        </Button>
                    </div>
                    <div className={currentState === PlayStates.Life_and_Death ? "" : "hidden"}>
                        <p>Who died (or resuscitated)?</p>
                        <FormControl disabled={playerListCache.length == 0 || !players[playerListCache[0]].alive}>
                            <FormLabel>Death reason:</FormLabel>
                            <RadioGroup value={currentDeathReason} >
                                <FormControlLabel value="execution" control={<Radio onClick={handleDeathReason}/>} label="Execution" />
                            </RadioGroup>
                            <Button onClick={() => {
                                if (playerListCache.length !== 0) {
                                    const e: NoteSegments = [
                                        "On",
                                        [ChipType.Time, current_time],
                                        ", ",
                                        [ChipType.Player, playerListCache[0]],
                                    ];
                                    if (players[playerListCache[0]].alive) {
                                        var death = "died";
                                        if (currentDeathReason === "execution") {
                                            death += " by execution.";
                                        }
                                        e.push(death);
                                    } else {
                                        e.push("came back to life");
                                    }

                                    dispatch(addNote({ note: e }));
                                    dispatch(setAlive({index: playerListCache[0], alive:!players[playerListCache[0]].alive}))
                                    setPlayerListCache([]);
                                }
                                setCurrentState(PlayStates.Default);
                            }}>
                                <Icon path={mdiCheckBold} size={1} />
                            </Button>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
        <div className="basis-1/3 max-h-screen"><NoteList /></div>

    </div>;
}

export default Playview;