import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_seamstress.png';

const seamstress: roleType = {
    name: "Washerwoman",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, at night, choose 2 players (not yourself): you " +
        "learn if they are the same alignment.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default seamstress;