import React from "react";
import { useAppSelector } from './game/hooks.ts';
import { useNavigate, useParams } from "react-router-dom";

function Player() {
    const params = useParams();
    const player_info = useAppSelector(
        state => state.players.players[Number(params.playerIndex)]);
    const navigate = useNavigate();
    const num_players = useAppSelector(
        state => state.players.players.length);
    const next_index = (Number(params.playerIndex) + 1) % num_players;
    const prev_index = (Number(params.playerIndex) - 1) < 0 ? num_players - 1 :
        (Number(params.playerIndex) - 1);

    return <table>
        <tbody>
            <tr>
                <td rowSpan={2} onClick={() => {
                    navigate(`/player/${prev_index}`);
                }}>
                    Previous
                </td>
                <td>{player_info.claims.length === 0 ? "No Claims" :
                    player_info.claims.join(",")}</td>
                <td rowSpan={2} onClick={() => {
                    navigate(`/player/${next_index}`);
                }}>
                    Next
                </td>
            </tr>
            <tr><td>{player_info.name}</td></tr>
        </tbody>
    </table>;
}

export default Player;