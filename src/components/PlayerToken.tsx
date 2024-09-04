import React, { useContext } from 'react';
import { useAppSelector } from '../state/hooks.ts';
import { Avatar, AvatarGroup, Box } from '@mui/material';
import { ScriptContext, ScriptContextType } from '../state/ScriptContext.tsx';

import token_background from '../img/token_background.png';
import shroud from '../img/shroud.png';
import { PlayContext, PlayContextType } from '../state/PlayContext.tsx';

type PlayerTokenProps = {
    index: number,
    token_width?: number,
    tapPlayer: (index: number) => void,
};

function PlayerToken(props: PlayerTokenProps) {
    const player_info = useAppSelector(state => state.players.players[props.index]);
    const { getRole }: ScriptContextType = useContext(ScriptContext);
    const { hideInformation} : PlayContextType = useContext(PlayContext);

    const token_style = {
        background: `url(${token_background})`,
        backgroundSize: "cover",
    };

    var token_sx = { sx: {} };
    const num_claims_capped = hideInformation ? 1 : Math.min(5, Math.max(1, player_info.claims.length));
    if (props.token_width) {
        token_sx = {
            sx: {
                ...token_sx['sx'],
                '& .MuiAvatar-root': {
                    width: (props.token_width * (1 + num_claims_capped / 10)) /
                        num_claims_capped,
                    height: (props.token_width * (1 + num_claims_capped / 10)) /
                        num_claims_capped,
                    position: 'relative',
                }
            }
        };
    }
    if (!player_info.alive) {
        token_sx = {
            sx: {
                ...token_sx['sx'],
                '& .MuiAvatar-root:before': {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    opacity: 0.8,
                    display: "block",
                    color: "#000",
                    background: `url(${shroud})`,
                    backgroundSize: "100% 100%"
                }
            }
        };
    }

    return <div
        className="flex h-fit"
        key={props.index}
        onClick={() => props.tapPlayer(props.index)}>
        <div className="w-fit min-w-10 content-between justify-center">
            <div className="flex-1">
                <AvatarGroup
                    max={5}
                    className="justify-center"
                    {...token_sx}>

                    {player_info.claims.length === 0 || hideInformation ?
                        <Avatar alt="No claim"
                            key={props.index * 100}
                            src={token_background} />
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