import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_butler.png';

const butler: roleType = {
    name: "Butler",
    icon: img,
    type: CharacterType.Outsider,
    ability: "Each night, choose a player (not yourself): tomorrow, you may " +
        "only vote if they are voting too.",

    actions: {
        "ChooseMaster": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default butler;