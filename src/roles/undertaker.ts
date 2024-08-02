import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_undertaker.png';

const undertaker: roleType = {
    name: "Undertaker",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn which character died by execution today.",

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

export default undertaker;