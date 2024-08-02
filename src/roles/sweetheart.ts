import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_sweetheart.png';

const sweetheart: roleType = {
    name: "Sweetheart",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you die, 1 player is drunk from now on.",

    actions: {
        "Die": {
            start: () => {}, // start
            tapPlayer: (index: number) => {}, // tapPlayer
            tapCharacter: (role: string) => {}, // tapCharacter
            tapTime: (time: number) => {}, // tapTime
            stop: (bool) => {} // stop
        }
    }
};

export default sweetheart;