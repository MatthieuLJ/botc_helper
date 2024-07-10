import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_dreamer.png';

const dreamer: roleType = {
    name: "Dreamer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose a player (not yourself or Travellers): you " +
        "learn 1 good & 1 evil character, 1 of which is correct.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default dreamer;