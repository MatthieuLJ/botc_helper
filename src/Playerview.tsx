import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { useNavigate, useParams } from "react-router-dom";
import Characters from "./components/Characters.tsx";
import { setClaims } from "./state/PlayersSlice.tsx";
import NoteList from "./components/NoteList.tsx";
import { ChipSegment, ChipType } from "./state/NotesSlice.tsx";
import { Button, Dialog } from "@mui/material";
import PlayerToken from "./components/PlayerToken.tsx";

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

    useEffect(() => {
        dispatch(setClaims({ index: playerIndex, claims: playerClaims }));
    }, [dispatch, playerClaims]);

    return <><div className="h-screen">
        <div className="flex h-2/3 w-full">
            <div className="basis-1/5 h-full content-center">
                <Button onClick={() => {
                    navigate(`/play/player/${prev_index}`);
                }}>
                    Counter-clockwise
                </Button>
            </div>
            <div className="basis-3/5 content-center">
                <div className="flex w-full place-content-center h-fit">
                    <PlayerToken index={playerIndex} tapPlayer={() => { setOpenClaimsDialog(true); }} />
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
        <div className="w-full h-1/3">
            <NoteList filter={notes_filter} />
        </div>
    </div >

        <Dialog open={openClaimsDialog} onClose={() => { setOpenClaimsDialog(false); }}>
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

        <Button id="home" name="townsquare" onClick={() => { return navigate('/play'); }}>Back to townsquare</Button>
    </>;
}

export default Playerview;