import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_fanggu.png';

const fanggu: roleType = {
    name: "Fang gu",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. The 1st Outsider this " +
        "kills becomes an evil Fang Gu & you die instead. [+1 Outsider]",

    actions: {
        "Kill": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default fanggu;