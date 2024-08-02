import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_clockmaker.png';

const clockmaker: roleType = {
    name: "Clockmaker",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing how many steps from the Demon to its nearest" +
        " Minion.",

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

export default clockmaker;