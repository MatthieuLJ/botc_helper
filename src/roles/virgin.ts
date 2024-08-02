import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_virgin.png';

const virgin: roleType = {
    name: "Virgin",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "The 1st time you are nominated, if the nominator is a Townsfolk,"
        + " they are executed immediately.",

    actions: {
        "GetNominated": {
            start: () => {}, // start
            tapPlayer: (index: number) => {}, // tapPlayer
            tapCharacter: (role: string) => {}, // tapCharacter
            tapTime: (time: number) => {}, // tapTime
            stop: (bool) => {} // stop
        }
    }
};

export default virgin;