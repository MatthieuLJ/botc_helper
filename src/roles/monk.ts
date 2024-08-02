import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_monk.png';

const monk: roleType = {
    name: "Monk",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, choose a player (not yourself): they are safe from "
        + "the Demon tonight.",

    actions: {
        "Protect": {
            start: () => {}, // start
            tapPlayer: (index: number) => {}, // tapPlayer
            tapCharacter: (role: string) => {}, // tapCharacter
            tapTime: (time: number) => {}, // tapTime
            stop: (bool) => {} // stop
        }
    }
};

export default monk;