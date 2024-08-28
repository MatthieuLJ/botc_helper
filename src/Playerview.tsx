import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { useNavigate, useParams } from "react-router-dom";
import Characters from "./components/Characters.tsx";
import { setClaims } from "./state/PlayersSlice.tsx";
import { ScriptContext, ScriptContextType } from "./state/ScriptContext.tsx";
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
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    const notes_filter: ChipSegment = [ChipType.Player, playerIndex];

    useEffect(() => {
        dispatch(setClaims({ index: playerIndex, claims: playerClaims }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, playerClaims]);

    return <><div className="flex flex-row">
        <div className="basis-1/5">
            <Button onClick={() => {
                navigate(`/play/player/${prev_index}`);
            }}>
                Previous
            </Button>
        </div>
        <div className="basis-3/5">
        <div>
            <PlayerToken index={playerIndex} tapPlayer={ () => {setOpenClaimsDialog(true); }}/>
        </div>
        </div>
        <div className="basis-1/5">
            <Button onClick={() => {
                navigate(`/play/player/${next_index}`);
            }}>
                Next
            </Button>
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
        <div><NoteList filter={notes_filter} /></div>
        <Button id="home" name="townsquare" onClick={() => { return navigate('/play'); }}>Back to townsquare</Button>
    </>;
}

export default Playerview;