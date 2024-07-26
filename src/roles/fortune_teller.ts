import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_fortuneteller.png';

const fortune_teller: roleType = {
    name: "Fortune Teller",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose 2 players: you learn if either is a Demon. " +
        "There is a good player that registers as a Demon to you.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default fortune_teller;