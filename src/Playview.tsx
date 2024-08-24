import React from 'react';
import Townsquare from './Townsquare.tsx';
import NoteList from './components/NoteList.tsx';

import { Button } from '@mui/material';
import { advanceTime } from './state/TimeSlice.tsx';
import { useAppDispatch } from './state/hooks.ts';
import { useNavigate } from 'react-router-dom';

type PlayviewProps = {};

function Playview(props: PlayviewProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return <div className="flex flex-row">
        <div className="basis-3/4 aspect-square">
            <Townsquare tapAction={(index) => { return navigate(`/play/player/${index}`); }} />
            <div>
                <Button onClick={() => { dispatch(advanceTime()); }}>Move time forward</Button>
            </div>
        </div>
        <div className="basis-1/4"><NoteList /></div>

    </div>;
}

export default Playview;