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

    return <>
        <div><Townsquare tapAction={(index) => { return navigate(`/play/player/${index}`); }} /></div>
        <div><NoteList /></div>
        <div>
            <Button onClick={() => { dispatch(advanceTime()); }}>Move time forward</Button>
        </div>
    </>;
}

export default Playview;