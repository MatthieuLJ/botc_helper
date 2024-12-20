import React, { useContext, useRef } from 'react';
import { useAppSelector } from '../state/hooks.ts';
import { Avatar, AvatarGroup } from '@mui/material';
import { ScriptContext, ScriptContextType } from '../state/ScriptContext.tsx';

import token_background from '../img/token_background.png';
import shroud from '../img/shroud.png';
import { PlayContext, PlayContextType } from '../state/PlayContext.tsx';
import { useSortable } from '@dnd-kit/sortable';

type PlayerTokenProps = {
    index: number,
    tokenWidth?: number,
    tapPlayer: (index: number) => void,
    canDrag?: boolean;
};

function PlayerToken(props: PlayerTokenProps) {
    const players = useAppSelector(state => state.players.players);
    const { getRole }: ScriptContextType = useContext(ScriptContext);
    const { hideInformation, playersWithOverlay, overlayImage }: PlayContextType
        = useContext(PlayContext);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props.canDrag ? props.index + 1 : 0,
        data: {
            index: props.index
        },
        disabled: !props?.canDrag
    });

    if (props.index >= players.length) {
        return <></>;
    }

    const player_info = players[props.index];

    const token_style = {
        background: `url(${token_background})`,
        backgroundSize: "cover",
    };

    let token_sx = { sx: {} };
    const num_claims_capped = hideInformation ? 1 : Math.min(5, Math.max(1, player_info.claims.length));
    if (props.tokenWidth) {
        token_sx = {
            sx: {
                ...token_sx['sx'],
                '& .MuiAvatar-root': {
                    width: (props.tokenWidth * (1 + num_claims_capped / 10)) /
                        num_claims_capped,
                    height: (props.tokenWidth * (1 + num_claims_capped / 10)) /
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


    const dragged_style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: '100000',
        transition
    } : undefined;

    return <div
        className="flex h-fit touch-none"
        key={props.index}
        onClick={() => props.tapPlayer(props.index)}
        ref={setNodeRef} style={dragged_style} {...listeners} {...attributes} >
        <div className="w-fit min-w-10 content-between justify-center">
            <div className="flex-1">
                <div className="token">
                    {player_info.claims.length === 0 || hideInformation || overlayImage ?
                        <div className="relative">
                            <img alt="No claim"
                                src={token_background}
                                height={props.tokenWidth}
                                width={props.tokenWidth} />
                            {((overlayImage !== null) &&
                                playersWithOverlay.includes(props.index)) ?
                                <img src={overlayImage as string}
                                    height={props.tokenWidth}
                                    width={props.tokenWidth}
                                    className="absolute top-0 left-0"
                                /> : <></>}
                            {(player_info.alive ?
                                <></>
                                : <img src={shroud}
                                    height={props.tokenWidth}
                                    width={props.tokenWidth}
                                    className="absolute top-0 left-0" />
                            )}
                        </div>
                        :
                        <AvatarGroup
                            max={5}
                            className="justify-center"
                            {...token_sx}>

                            {player_info.claims.map((c: string) => {
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
                    }
                </div>
            </div>
            <div>{player_info.name}</div>
        </div>
    </div>;
}

export default PlayerToken;