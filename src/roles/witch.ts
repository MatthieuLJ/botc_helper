import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_witch.png';

const witch: roleType = {
    name: "Witch",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: if they nominate tomorrow, they " +
        "die. If just 3 players live, you lose this ability.",

    actions: {
        "Picks": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default witch;