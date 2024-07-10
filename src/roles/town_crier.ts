import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_towncrier.png';

const town_crier: roleType = {
    name: "Town crier",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Minion nominated today.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default town_crier;