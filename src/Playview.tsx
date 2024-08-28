import React, { useState } from 'react';
import Townsquare from './Townsquare.tsx';
import NoteList from './components/NoteList.tsx';

import { Button, ButtonGroup } from '@mui/material';
import { advanceTime } from './state/TimeSlice.tsx';
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { addNote, ChipType, NoteSegments } from './state/NotesSlice.tsx';
import { mdiCheckBold } from '@mdi/js';
import Icon from "@mdi/react";

type PlayviewProps = {};

function Playview(props: PlayviewProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const current_time = useAppSelector(
        state => state.time.time);

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
                console.log(current_voters);
                setPlayerListCache(current_voters);
                break;
        }
    }

    return <div className="flex flex-row">
        <div className="basis-2/3">
            <div className="relative aspect-square">
                <Townsquare tapAction={(index) => { tapPlayer(index); }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className={currentState === PlayStates.Default ? "" : "hidden"}>
                        <ButtonGroup variant="text" orientation="vertical">
                            <Button onClick={() => { dispatch(advanceTime()); }}>Move time forward</Button>
                            <Button onClick={() => { setCurrentState(PlayStates.Nominator); }}>Nomination</Button>
                            <Button onClick={() => { setCurrentState(PlayStates.Vote); }}>Vote</Button>
                            <Button onClick={() => { }}>Life & Death</Button>
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
                </div>
            </div>
        </div>
        <div className="basis-1/3"><NoteList /></div>

    </div>;
}

export default Playview;