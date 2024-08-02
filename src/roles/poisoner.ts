import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_poisoner.png';

const poisoner: roleType = {
    name: "Poisoner",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: they are poisoned tonight and " +
        "tomorrow day.",

    actions: {
        "Poison": {
            start: () => {}, // start
            tapPlayer: (index: number) => {}, // tapPlayer
            tapCharacter: (role: string) => {}, // tapCharacter
            tapTime: (time: number) => {}, // tapTime
            stop: (bool) => {} // stop
        }
    }
};

export default poisoner;