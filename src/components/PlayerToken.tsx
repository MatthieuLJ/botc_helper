import React, { useContext } from 'react';
import { useAppSelector } from '../state/hooks.ts';
import { Avatar, AvatarGroup, Box } from '@mui/material';
import { ScriptContext, ScriptContextType } from '../state/ScriptContext.tsx';

import token_background from '../img/token_background.png';

type PlayerTokenProps = {
    index: number,
    token_width?: number,
    tapPlayer: (index: number) => void;
};

function PlayerToken(props: PlayerTokenProps) {
    const player_info = useAppSelector(state => state.players.players[props.index]);
    const { getRole }: ScriptContextType = useContext(ScriptContext);

    const token_style = {
        background: `url(${token_background})`,
        backgroundSize: "cover",
    };
    
    var token_sx = {};
    const num_claims_capped = Math.min(5, Math.max(1, player_info.claims.length));
    if (props.token_width) {
        token_sx = {
            sx: {
                '& .MuiAvatar-root': {
                    width: (props.token_width * (1 + num_claims_capped / 10)) / num_claims_capped,
                    height: (props.token_width * (1 + num_claims_capped / 10)) / num_claims_capped,
                }
            }
        };
    }

    return <div className="flex h-fit" key={props.index} onClick={() => props.tapPlayer(props.index)}>
        <div className="w-fit min-w-10 content-between justify-center">
            <div className="flex-1">
                <AvatarGroup
                    max={5}
                    className="justify-center"
                    {...token_sx}>

                    {player_info.claims.length === 0 ?
                        <Avatar alt="No claim"
                            key={props.index * 100}
                            src={token_background}/>
                        :
                        player_info.claims.map((c) => {
                            const role_info = getRole(c);
                            return <Avatar
                                alt={c}
                                key={props.index + c}
                                src={role_info?.icon}
                                slotProps={{
                                    img: {
                                        style: { ...token_style }
                                    },
                                }}
                            />;
                        })}
                </AvatarGroup>
            </div>
            <div>{player_info.name}</div>
        </div>
    </div>;
}

export default PlayerToken;