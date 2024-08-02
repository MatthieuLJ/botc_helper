import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_sage.png';

const sage: roleType = {
    name: "Sage",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If the Demon kills you, you learn that it is 1 of 2 players.",

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

export default sage;