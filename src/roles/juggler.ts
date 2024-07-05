import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";

const juggler: roleType = {
    name: "Juggler",
    icon: "icon_juggler.png",
    type: CharacterType.Townsfolk,
    ability: "On your 1st day, publicly guess up to 5 players' characters. " +
        "That night, you learn how many you got correct.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default juggler;