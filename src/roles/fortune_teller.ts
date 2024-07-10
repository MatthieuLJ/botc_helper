import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_fortuneteller.png';

const fortune_teller: roleType = {
    name: "Fortune Teller",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose 2 players: you learn if either is a Demon. " +
        "There is a good player that registers as a Demon to you.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default fortune_teller;