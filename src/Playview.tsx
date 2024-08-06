import React from 'react';
import Townsquare from './Townsquare.tsx';
import EventList from './EventList.tsx';

type PlayviewProps = {}

function Playview(props: PlayviewProps) {
    return <>
    <div><Townsquare/></div>
    <div><EventList/></div>
    </>
}

export default Playview;