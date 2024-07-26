import React, { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from '../state/hooks.ts';
import { useNavigate, useParams } from "react-router-dom";
import Characters from "./Characters.tsx";
import { setClaims } from "../state/PlayersSlice.tsx";
import { ScriptContext, ScriptContextType } from "../state/ScriptContext.tsx";

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
    const [pickClaims, setPickClaims] = useState(false);
    const dispatch = useAppDispatch();
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    return <><table>
        <tbody>
            <tr>
                <td rowSpan={2} onClick={() => {
                    navigate(`/player/${prev_index}`);
                }}>
                    Previous
                </td>
                <td onClick={() => { setPickClaims(true); }}>
                    {player_info.claims.length === 0 ? "No Claims" :
                        player_info.claims.map((r) => {
                            const role = getRole(r);
                            return <img src={role?.icon} alt={role?.name}  height="50" width="50" key={role?.name}/>})}</td>
                <td rowSpan={2} onClick={() => {
                    navigate(`/player/${next_index}`);
                }}>
                    Next
                </td>
            </tr>
            <tr><td>{player_info.name}</td></tr>
        </tbody>
    </table>
        <dialog open={pickClaims} onClose={() => { setPickClaims(false); }}>
            <Characters highlights={player_info.claims} closeDialog={(highlights) => {
                dispatch(setClaims({ id: player_info.id, claims: highlights }));
                setPickClaims(false);
            }} />
        </dialog>
    </>;
}

export default Playerview;