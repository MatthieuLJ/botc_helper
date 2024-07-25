import React from 'react';
import Townsquare from './Townsquare.tsx';
import Actionbox from './components/Actionbox.tsx';

type PlayviewProps = {}

function Playview(props: PlayviewProps) {
    return <>
    <div><Townsquare/></div>
    <div><Actionbox/></div>
    </>
}

export default Playview;