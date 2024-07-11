import React from "react";
import { useAppSelector } from './game/hooks.ts';
import { useParams } from "react-router-dom";

function Player() {
    const params = useParams();
    const player_info = useAppSelector(
        state => state.players.players[Number(params.playerId)]);

    return <p>
        {player_info.name}
    </p>;
}

export default Player;