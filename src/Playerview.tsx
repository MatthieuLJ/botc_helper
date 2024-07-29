import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from './state/hooks.ts';
import { useNavigate, useParams } from "react-router-dom";
import Characters from "./components/Characters.tsx";
import { setClaims } from "./state/PlayersSlice.tsx";
import { ScriptContext, ScriptContextType } from "./state/ScriptContext.tsx";

function Playerview() {
    const params = useParams();
    const player_info = useAppSelector(
        state => state.players.players[Number(params.playerIndex)]);
    const navigate = useNavigate();
    const num_players = useAppSelector(
        state => state.players.players.length);
    const next_index = (Number(params.playerIndex) + 1) % num_players;
    const prev_index = (Number(params.playerIndex) - 1) < 0 ? num_players - 1 :
        (Number(params.playerIndex) - 1);

    const [openClaimsDialog, setOpenClaimsDialog] = useState(false);
    const [playerClaims, setPlayerClaims] = useState<String[]>(player_info.claims);
    const dispatch = useAppDispatch();
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    useEffect(() => {
        dispatch(setClaims({ id: player_info.id, claims: playerClaims }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, playerClaims]);

    return <><table>
        <tbody>
            <tr>
                <td rowSpan={2} onClick={() => {
                    navigate(`/play/player/${prev_index}`);
                }}>
                    Previous
                </td>
                <td onClick={() => { setOpenClaimsDialog(true); }}>
                    {player_info.claims.length === 0 ? "No Claims" :
                        player_info.claims.map((r) => {
                            const role = getRole(r);
                            return <img src={role?.icon} alt={role?.name} height="50" width="50" key={role?.name} />;
                        })}</td>
                <td rowSpan={2} onClick={() => {
                    navigate(`/play/player/${next_index}`);
                }}>
                    Next
                </td>
            </tr>
            <tr><td>{player_info.name}</td></tr>
        </tbody>
    </table>
        <dialog open={openClaimsDialog} onClose={() => { setOpenClaimsDialog(false); }}>
            <Characters highlights={player_info.claims} closeDialog={(highlights) => {

                if (highlights != null) {
                    setPlayerClaims(highlights);
                }
                setOpenClaimsDialog(false);
            }} />
        </dialog>
        <button id="home" name="townsquare" onClick={() => { return navigate('/play'); }}>Back to townsquare</button>
    </>;
}

export default Playerview;