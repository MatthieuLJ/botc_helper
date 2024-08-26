import React, { useEffect, useRef } from 'react';
import PlayerToken from './components/PlayerToken.tsx';
import { useAppSelector } from './state/hooks.ts';

type TownsquareProps = {
    tapAction: (index: number) => void;
};

function Townsquare(props: TownsquareProps) {
    const players = useAppSelector(state => state.players.players);
    const circle = useRef<HTMLDivElement | null>(null);

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

            circle.style.transform = `translate(-50%,-50%) rotate(${angle}deg) translate(${towncircle.clientWidth /
                3}px) rotate(-${angle}deg)`;
            angle += dangle;
        }
    }

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
    }, []);

    return <div className="relative top w-full h-full" ref={circle}>
        {players.map((p, index: number) =>
            <div className="absolute top-1/2 left-1/2">
                <PlayerToken key={p.id} index={index}
                    tapPlayer={() => { props.tapAction(index); }} />
            </div>)}
    </div>;
}

export default Townsquare;