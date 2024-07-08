import React from 'react';
import { PlayersSetup } from './PlayersSetup.tsx';
import { ScriptSetup } from './ScriptSetup.tsx';

function TownsquareSetup() {


    return <>
        <PlayersSetup />
        <ScriptSetup />
        <p>
            <button>Done</button>
        </p>
    </>;
}

export default TownsquareSetup;