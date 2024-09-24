import React, { useContext, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks.ts';
import { Avatar, AvatarGroup } from '@mui/material';
import { ScriptContext, ScriptContextType } from '../state/ScriptContext.tsx';

import token_background from '../img/token_background.png';
import shroud from '../img/shroud.png';
import { PlayContext, PlayContextType } from '../state/PlayContext.tsx';
import { draggableItemTypes } from './Townsquare.tsx';
import { useDrag, useDrop } from 'react-dnd';
import { movePlayer } from '../state/PlayersSlice.tsx';

type PlayerTokenProps = {
    index: number,
    token_width?: number,
    tapPlayer: (index: number) => void,
    canDrag?: boolean
};

function PlayerToken(props: PlayerTokenProps) {
    const player_info = useAppSelector(state => state.players.players[props.index]);
    const { getRole }: ScriptContextType = useContext(ScriptContext);
    const { hideInformation, playersWithOverlay, overlayImage }: PlayContextType = useContext(PlayContext);

    const dispatch = useAppDispatch();

    const drag_ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: draggableItemTypes.TOKEN,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        canDrag: () => { return props?.canDrag !== undefined ? props.canDrag : false; },
        item: () => { return { index: props.index }; }
    }));
    const [, drop] = useDrop({
        accept: draggableItemTypes.TOKEN,
        hover(item: {index}, monitor) {
            if (!drag_ref.current) {
                return;
            }
            const hoverIndex = props.index;
            const dragIndex = item.index;
            if (hoverIndex === dragIndex) {
                return
            }
            dispatch(movePlayer({from:dragIndex, to:hoverIndex}));
            item.index = hoverIndex;
        }

    });

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

    drag(drop(drag_ref));

    return <div
        className="flex h-fit"
        key={props.index}
        onClick={() => props.tapPlayer(props.index)}
        ref={drag_ref}>
        <div className="w-fit min-w-10 content-between justify-center">
            <div className="flex-1">
                <div className="token">
                {player_info.claims.length === 0 || hideInformation || overlayImage ?
                    <div className="relative">
                        <img alt="No claim"
                            src={token_background}
                            height={props.token_width}
                            width={props.token_width} />
                        {((overlayImage !== null) && playersWithOverlay.includes(props.index)) ?
                            <img src={overlayImage as string}
                                height={props.token_width}
                                width={props.token_width}
                                className="absolute top-0 left-0"
                            /> : <></>}
                        {(!player_info.alive ?
                            <img src={shroud}
                                height={props.token_width}
                                width={props.token_width}
                                className="absolute top-0 left-0" />
                            : <></>
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