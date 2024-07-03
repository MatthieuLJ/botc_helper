import React from 'react';

type PlayerTokenProps = {
    name: string
}

function PlayerToken(props : PlayerTokenProps) {
    return <li>{props.name}</li>;
}

export default PlayerToken;