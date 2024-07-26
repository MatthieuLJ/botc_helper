import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_juggler.png';

const juggler: roleType = {
    name: "Juggler",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "On your 1st day, publicly guess up to 5 players' characters. " +
        "That night, you learn how many you got correct.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default juggler;