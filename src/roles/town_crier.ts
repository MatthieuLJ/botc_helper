import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_towncrier.png';

const town_crier: roleType = {
    name: "Town crier",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Minion nominated today.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default town_crier;