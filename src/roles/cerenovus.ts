import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_cerenovus.png';

const cerenovus: roleType = {
    name: "Cerenovus",
    icon: img,
    type: CharacterType.Minion,
    ability: 'Each night, choose a player & a good character: they are "mad"' +
        ' they are this character tomorrow, or might be executed.',

    actions: {
        "MakeMad": {
            start: () => {}, // start
            tapPlayer: (index: number) => {}, // tapPlayer
            tapCharacter: (role: string) => {}, // tapCharacter
            tapTime: (time: number) => {}, // tapTime
            stop: (bool) => {} // stop
        }
    }
};

export default cerenovus;