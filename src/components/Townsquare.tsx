import React, { ReactNode, useEffect, useRef, useState } from 'react';
import PlayerToken from './PlayerToken.tsx';
import { useAppDispatch, useAppSelector } from '../state/hooks.ts';
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { movePlayer, removePlayer, rotate_array } from '../state/PlayersSlice.tsx';
import { SortableContext, SortingStrategy, useSortable } from '@dnd-kit/sortable';
import Trash from './Trash.tsx';

type TownsquareProps = {
    tapAction: (index: number) => void;
    canDrag?: boolean;
    canRemove?: boolean;
    children: ReactNode;
};

const arrayRotateSortingStrategy: SortingStrategy = ({
    rects, activeIndex, overIndex, index
}) => {
    const indices = Array.from({ length: rects.length }, (_, index) => index);

    rotate_array(indices, activeIndex, overIndex);

    const oldRect = rects[index];
    const newRect = rects[indices.indexOf(index)];

    if (!newRect || !oldRect)
        return null;

    return {
        x: newRect.left - oldRect.left,
        y: newRect.top - oldRect.top,
        scaleX: newRect.width / oldRect.width,
        scaleY: newRect.height / oldRect.height,
    };
};

type PlayerPlaceholderProps = {
    index: number,
    tokenWidth: number;
};

function PlayerPlaceholder(props: PlayerPlaceholderProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props.index + 1,
        data: {
            index: props.index
        }
    });
    const dragged_style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: '100000',
        borderRadius: "50%",
        border: "2px dashed black",
        height: props.tokenWidth,
        width: props.tokenWidth,
        transition
    } : undefined;

    return <div
        className="flex h-fit touch-none"
        key={props.index}
        ref={setNodeRef} style={dragged_style} {...listeners} {...attributes} >
    </div>;
}

function Townsquare(props: TownsquareProps) {
    const players = useAppSelector(state => state.players.players);
    const circle = useRef<HTMLDivElement | null>(null);
    const [tokenWidth, setTokenWidth] = useState(0);
    const dispatch = useAppDispatch();

    function onResize() {
        const towncircle = circle.current;
        if (towncircle === null) {
            return;
        }
        const circleElements = towncircle.childNodes;

        var angle = 360 - 90;
        const dangle = 360 / circleElements.length;

        for (let i = 0; i < circleElements.length; i++) {
            const circle = circleElements[i] as HTMLDivElement;

            circle.style.transform = `translate(-50%,-50%) rotate(${angle}deg) 
            translate(${towncircle.clientWidth / 3}px) rotate(-${angle}deg)`;
            angle += dangle;
        }

        setTokenWidth(Math.max(40, towncircle.clientWidth / 8));
    }

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
    }, []);

    useEffect(() => {
        onResize();
    }, [players]);

    const [dragId, setDragId] = useState<UniqueIdentifier>(-1);

    const mouseSensor = useSensor(MouseSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 200,
            tolerance: 5,
        },
    });
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
    );

    
    function onTokenDragStart({ active }: DragStartEvent) {
        setDragId(active.data.current?.index);
    }

    function onTokenDragEnd({ active, over }: DragEndEvent) {
        setDragId(-1);

        if (!over)
            return;

        if (over.id === 'trash') {
            dispatch(removePlayer({index: active.data.current?.index}));
            return;
        }
        dispatch(movePlayer({ from: active.data.current?.index, to: over.data.current?.index }));
    }

    return <DndContext
        sensors={sensors}
        onDragStart={onTokenDragStart}
        onDragEnd={onTokenDragEnd}
        collisionDetection={closestCenter}
    >
        <SortableContext items={players.map((_, i: number) => i + 1)}
            strategy={arrayRotateSortingStrategy} >
            <div className="h-full w-full" ref={circle}>
                {players.map((_, p_index) =>

                    <div key={p_index} className="absolute top-1/2 left-1/2">
                        {dragId == p_index ?
                            <PlayerPlaceholder index={p_index} tokenWidth={tokenWidth} />
                            :
                            <PlayerToken index={p_index}
                                tapPlayer={() => { props.tapAction(p_index); }}
                                tokenWidth={tokenWidth}
                                canDrag={props?.canDrag} />
                        }
                    </div>)}
            </div>
        </SortableContext>

        <div className={props?.canRemove && dragId !== -1 ?
            "visible" : "invisible"}>
            <Trash />
        </div>
        <div className={props?.canRemove && dragId !== -1 ?
            "invisible" : "visible"}>
            {props.children}
        </div>

        <DragOverlay>
            {dragId == -1 ? null : <PlayerToken index={dragId as number}
                tapPlayer={() => { }}
                tokenWidth={tokenWidth}
                canDrag={false} />}
        </DragOverlay>
    </DndContext >;
}

export default Townsquare;