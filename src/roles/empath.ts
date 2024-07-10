import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_empath.png';

const empath: roleType = {
    name: "Empath",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many of your 2 alive neighbors are " +
        "evil.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default empath;