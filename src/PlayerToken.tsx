import React from 'react';

type PlayerTokenProps = {
    id: number
}

function PlayerToken(props : PlayerTokenProps) {
    return <li>Player {props.id}</li>;
}

export default PlayerToken;