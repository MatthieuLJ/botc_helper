import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_juggler.png';

const juggler: roleType = {
    name: "Juggler",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "On your 1st day, publicly guess up to 5 players' characters. " +
        "That night, you learn how many you got correct.",

    actions: {
        "Learn": {
            start: () => {}, // start
            tapPlayer: (index: number) => {}, // tapPlayer
            tapCharacter: (role: string) => {}, // tapCharacter
            tapTime: (time: number) => {}, // tapTime
            stop: (bool) => {} // stop
        }
    }
};

export default juggler;