import React, { ReactNode, useEffect, useRef, useState } from 'react';
import PlayerToken from './PlayerToken.tsx';
import { useAppDispatch, useAppSelector } from '../state/hooks.ts';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, rectIntersection, TouchSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core';
import { movePlayer, rotate_array } from '../state/PlayersSlice.tsx';
import { SortableContext, SortingStrategy } from '@dnd-kit/sortable';

type TownsquareProps = {
    tapAction: (index: number) => void;
    canDrag?: boolean;
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
        console.log("Start drag !", active.data.current?.index);
        setDragId(active.data.current?.index);
    }

    function onTokenDragEnd({ active, over }: DragEndEvent) {
        console.log("On DragEnd,", active.id, over?.data.current?.index);
        if (over)
            dispatch(movePlayer({ from: active.data.current?.index, to: over.data.current?.index }));
        setDragId(-1);
    }

    const empty_circle_style = {
        borderRadius: "50%",
        border: "2px dashed black",
        height: tokenWidth,
        width: tokenWidth
    };
    //<div style={empty_circle_style}></div>

    // touch-action https://docs.dndkit.com/api-documentation/draggable#recommendations

    console.log("redrawing?");

    return <DndContext
        sensors={sensors}
        onDragStart={onTokenDragStart}
        onDragEnd={onTokenDragEnd}
    >
        <SortableContext items={players.map((_, i) => i + 1)}
            strategy={arrayRotateSortingStrategy}>
            <div className="h-full w-full" ref={circle}>
                {players.map((_, p_index) =>
                    <div key={p_index} className="absolute top-1/2 left-1/2">
                        <PlayerToken index={p_index}
                            tapPlayer={() => { props.tapAction(p_index); }}
                            token_width={tokenWidth}
                            canDrag={props?.canDrag} />
                    </div>)}
            </div>
            {props.children}
        </SortableContext>
    </DndContext>;
}

export default Townsquare;