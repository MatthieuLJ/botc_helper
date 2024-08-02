import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_fortuneteller.png';

const fortune_teller: roleType = {
    name: "Fortune Teller",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose 2 players: you learn if either is a Demon. " +
        "There is a good player that registers as a Demon to you.",

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

export default fortune_teller;