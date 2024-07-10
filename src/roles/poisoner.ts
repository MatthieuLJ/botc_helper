import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_poisoner.png';

const poisoner: roleType = {
    name: "Poisoner",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: they are poisoned tonight and " +
        "tomorrow day.",

    actions: {
        "Poison": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default poisoner;