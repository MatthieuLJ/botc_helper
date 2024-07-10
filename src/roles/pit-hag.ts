import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_pithag.png';

const pithag: roleType = {
    name: "Pit-Hag",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night*, choose a player & a character they become (if not" +
        " in play). If a Demon is made, deaths tonight are arbitrary.",

    actions: {
        "Kill": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default pithag;