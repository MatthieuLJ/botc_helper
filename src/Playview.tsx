import React, { useContext, useEffect, useMemo, useState } from 'react';
import Townsquare from './Townsquare.tsx';
import NoteList from './components/NoteList.tsx';

import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Menu, MenuItem, Select, SelectChangeEvent, Switch } from '@mui/material';
import { advanceTime } from './state/TimeSlice.tsx';
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { addNote, ChipType, NoteSegments } from './state/NotesSlice.tsx';
import { mdiCancel, mdiCheckBold, mdiMenu } from '@mdi/js';
import Icon from "@mdi/react";
import { PlayerInfo, setAlive } from './state/PlayersSlice.tsx';
import { PlayContextProvider } from './state/PlayContext.tsx';

import handBackRight from './img/hand-back-right.png';
import handPointingRight from './img/hand-pointing-right.png';
import coffin from './img/coffin.png';
import medicalBag from './img/medical-bag.png';

import { ScriptContext, ScriptContextType } from './state/ScriptContext.tsx';
import NoteChip from './components/NoteChip.tsx';

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

    // Menu of actions
    const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
    const actionMenuOpen = Boolean(actionMenuAnchor);

    function handleActionMenuClick(e: React.MouseEvent<HTMLButtonElement>) {
        setActionMenuAnchor(e.currentTarget);
    }

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

    // Current death reason
    const [currentDeathReason, setCurrentDeathReason] = useState<string>("");
    const { getRole }: ScriptContextType = useContext(ScriptContext);
    const script_name = useAppSelector(
        state => state.roles.script);
    const roles_causing_death: string[] = useAppSelector(
        state => state.roles.roles.filter(
            (role) => getRole(role)?.canCauseDeath ?? false)
    );

    function handleDeathReason(event: SelectChangeEvent) {
        setCurrentDeathReason(event.target.value);
    }

    // For the top left game menu
    const [topMenuAnchor, setTopMenuAnchor] = React.useState<null | HTMLElement>(null);
    const topMenuOpen = Boolean(topMenuAnchor);

    function handleTopMenuClick(e: React.MouseEvent<HTMLButtonElement>) {
        setTopMenuAnchor(e.currentTarget);
    }

    function handleResetGame() {
        dispatch({ type: 'reset_game' });
    }

    // hiding roles information
    const [HideInformation, setHideInformation] = useState<boolean>(false);

    return <div className="flex flex-col lg:flex-row landscape:flex-row h-dvh w-screen">
        <PlayContextProvider hideInformation={HideInformation}
            playersWithOverlay={playerListCache}
            overlayImage={overlayImage}>
            <div className="relative flex w-full h-3/5 lg:h-full landscape:h-full lg:w-3/5 landscape:w-3/5 justify-center">
                <div className="relative aspect-square max-w-full">

                    <Townsquare
                        tapAction={(index) => { tapPlayer(index); }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className={currentState === PlayStates.Default ?
                            "flex flex-col justify-center " :
                            "hidden"}>
                            <NoteChip value={[ChipType.Time, current_time]} />
                            <Button onClick={handleActionMenuClick}>Action</Button>
                            <Menu
                                open={actionMenuOpen}
                                onClose={() => setActionMenuAnchor(null)}
                                anchorEl={actionMenuAnchor}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}>
                                <MenuItem
                                    onClick={() => {
                                        dispatch(advanceTime());
                                        setActionMenuAnchor(null);
                                    }}>
                                    Move time forward
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setCurrentState(PlayStates.Nominator);
                                        setOverlayImage(handPointingRight);
                                        setActionMenuAnchor(null);
                                    }}>
                                    Nomination
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setCurrentState(PlayStates.Vote);
                                        setOverlayImage(handBackRight);
                                        setActionMenuAnchor(null);
                                    }}>
                                    Vote
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setCurrentState(PlayStates.Life_and_Death);
                                        setOverlayImage(coffin);
                                        setActionMenuAnchor(null);
                                    }}>
                                    Life & Death
                                </MenuItem>
                            </Menu>
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
                                setOverlayImage(null);
                                setCurrentState(PlayStates.Default);
                            }}>
                                <Icon path={mdiCheckBold} size={1} />
                            </Button>
                        </div>
                        <div className={currentState === PlayStates.Life_and_Death ? "" : "hidden"}>
                            <p>Who died (or resuscitated)?</p>
                            <FormControl disabled={playerListCache.length == 0 ||
                                !players[playerListCache[0]].alive}>
                                <FormLabel>Death reason:</FormLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="death_reason"
                                    value={currentDeathReason}
                                    label="Death Reason"
                                    onChange={handleDeathReason}
                                >
                                    <MenuItem value={" "}></MenuItem>
                                    <MenuItem value={"execution"}>Execution</MenuItem>
                                    {roles_causing_death.map((role) =>
                                        <MenuItem value={role}>{role}</MenuItem>
                                    )}
                                </Select>


                                <div className="flex flex-row">
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
                                                    e.push(death);
                                                } else if (currentDeathReason === "") {
                                                    e.push(death);
                                                } else {
                                                    death += " by the ";
                                                    e.push(death);
                                                    e.push([ChipType.Role, currentDeathReason]);
                                                }
                                            } else {
                                                e.push("came back to life");
                                            }

                                            dispatch(addNote({ note: e }));
                                            dispatch(setAlive({
                                                index: playerListCache[0],
                                                alive: !players[playerListCache[0]].alive
                                            }));
                                            setPlayerListCache([]);
                                            setOverlayImage(null);
                                        }
                                        setCurrentState(PlayStates.Default);
                                    }}>
                                        <Icon path={mdiCheckBold} size={1} />
                                    </Button>
                                    <Button onClick={() => {
                                        setPlayerListCache([]);
                                        setOverlayImage(null);
                                        setCurrentState(PlayStates.Default);
                                    }}>
                                        <Icon path={mdiCancel} size={1} />
                                    </Button>
                                </div>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <FormGroup className="absolute top-0 right-0">
                    <FormControlLabel
                        control={<Switch onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setHideInformation(event.target.checked); }} />}
                        label="Hide info"
                        labelPlacement="start"
                        value={HideInformation}
                    />
                </FormGroup>
            </div>
            <div className="basis-2/5 overflow-auto lg:max-h-screen landscape:max-h-screen">
                <NoteList />
            </div>
            <div className="absolute top left">
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
    </div >;
}

export default Playview;